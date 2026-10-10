"""Import the supplied Air compressor / suction unit folders without inventing specs."""
from pathlib import Path
import hashlib
import json
import re
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/Air compressor suction unit')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/air-equipment'
DATA = PROJECT / 'src/data/airEquipmentModels.json'
GROUPS = [
    ('Air Compressor', 'air-compressor', 'air-compressor', SOURCE / '空压机Air compressor'),
    ('Suction Unit', 'suction-unit', 'dry-suction', SOURCE / '抽吸机suction unit/干抽'),
    ('Suction Unit', 'suction-unit', 'wet-suction', SOURCE / '抽吸机suction unit/湿抽'),
]
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
GALLERY_REMOVE = {
    'air-100-air-1000': {3},
    'fm-370x-mobile-vacuum-pump': {1},
    'ky-1ew': {1},
    'ky-2ew': {1},
    'ky-5ew': {2},
    'pro-10': {2, 5},
    'ga-81': {2},
}
GALLERY_COVER = {'ky-1ew': 5, 'ky-3ew': 4, 'tj-1500x': 3, 'ga-81': 3, 'tj-fm4l': 2}
GALLERY_LIMIT = {'ga-163': 4}
EXPECTED_GALLERY_COUNTS = {
    'air-100-air-1000': 4, 'ky-1ew': 4, 'ky-2ew': 3, 'ky-3ew': 6,
    'ky-5ew': 2, 'tj-1500x': 4, 'pro-10': 5, 'ga-163': 4, 'ga-81': 4,
    'fm-370x-mobile-vacuum-pump': 2, 'tj-fm4l': 3,
}
PRO_10_COVER = PROJECT / 'scripts/assets/air-equipment/pro-10-cover.jpg'


def slugify(value):
    value = unicodedata.normalize('NFKD', value).lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value)).strip('-')


def read_text(folder, prefix):
    files = [p for p in folder.glob(f'{prefix}_*/*.txt') if not p.name.startswith('._')]
    assert len(files) == 1, (folder, prefix, files)
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def numbered_points(lines):
    indices = [i for i, line in enumerate(lines) if re.match(r'^0[1-4]\s+', line)]
    assert len(indices) == 4, lines
    points = []
    for n, start in enumerate(indices):
        heading = re.match(r'^0[1-4]\s+(.+)', lines[start]).group(1)
        end = indices[n + 1] if n + 1 < len(indices) else len(lines)
        points.append({'title': heading, 'description': ' '.join(lines[start + 1:end])})
    return points


def model_name(raw):
    # Folder labels contain Chinese descriptors; show only the actual model code.
    if raw.startswith('吸式真空泵PRO'):
        return 'PRO(10)'
    if raw.startswith('FM-370X+'):
        return 'FM-370X+'
    match = re.search(r'(?:AIR\s*\d+\s*-\s*AIR\s*\d+|(?:TJ|KY|GA|GS|FM|AEOLUS)[- ]?[A-Za-z0-9]+(?:[-+][A-Za-z0-9]+)*(?:\(\d+\))?)', raw, re.I)
    assert match, raw
    return match.group(0).strip()


def photos(folder):
    main = [p for d in folder.glob('01_*/*') if d.is_dir() and '主图' in d.name
            for p in d.iterdir() if p.suffix.lower() in IMAGE_EXTENSIONS and not p.name.startswith('._')]
    if not main:
        # Some source folders only provide on-site photos. Keep those with their own model.
        main = [p for d in folder.glob('08_*') if d.is_dir()
                for p in d.rglob('*') if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS and not p.name.startswith('._')]
    def order(p):
        match = re.match(r'^(\d+)', p.stem)
        return (int(match.group(1)) if match else 999, p.name.casefold())
    seen = set()
    unique = []
    for p in sorted(main, key=order):
        digest = hashlib.md5(p.read_bytes()).digest()
        if digest not in seen:
            seen.add(digest)
            unique.append(p)
    if folder.name == 'AIR 100-AIR 1000':
        assert len(unique) > 1, folder
        unique = unique[1:]
    return unique


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


catalog = []
used_slugs = set()
for group, group_slug, slug_suffix, branch in GROUPS:
    folders = sorted((p for p in branch.iterdir() if p.is_dir() and not p.name.startswith('._')), key=lambda p: p.name.casefold())
    for folder in folders:
        hero, selling, installation_lines, spec_lines = (read_text(folder, prefix) for prefix in ('01', '02', '03', '04'))
        assert hero[0] == 'AIR SYSTEM' and selling[0] == 'KEY SELLING POINTS' and installation_lines[0] == 'INSTALLATION AND CONNECTION' and spec_lines[0] == 'TECHNICAL SPECIFICATIONS', folder
        raw_model = hero[1]
        model = model_name(raw_model)
        spec_model = next((line.split(':', 1)[1].strip() for line in spec_lines if line.startswith('Model:')), None)
        assert spec_model and model_name(spec_model).casefold() == model.casefold(), (folder, raw_model, spec_model)
        slug = 'fm-370x-mobile-vacuum-pump' if raw_model.startswith('FM-370X+') else slugify(model)
        if slug in used_slugs:
            slug += '-' + slug_suffix
        assert slug not in used_slugs, (folder, slug)
        used_slugs.add(slug)
        specs = []
        for line in spec_lines[2:]:
            assert ':' in line, (folder, line)
            label, value = [part.strip() for part in line.split(':', 1)]
            if label == 'Model' and slug in {'gs-20', 'tj-fm4l'}:
                value = model
            specs.append({'label': label, 'value': value})
        priority_index = installation_lines.index('Priority materials:')
        installation_description = ' '.join(installation_lines[1:priority_index])
        priority_materials = [line[2:] for line in installation_lines[priority_index + 1:] if line.startswith('- ')]
        assert installation_description and len(priority_materials) == 5, folder
        source_photos = photos(folder)
        selected_photos = [photo for n, photo in enumerate(source_photos, 1)
                           if n not in GALLERY_REMOVE.get(slug, set())]
        if slug in GALLERY_LIMIT:
            selected_photos = selected_photos[:GALLERY_LIMIT[slug]]
        if slug in GALLERY_COVER:
            cover = source_photos[GALLERY_COVER[slug] - 1]
            assert cover in selected_photos, (slug, cover)
            selected_photos.remove(cover)
            selected_photos.insert(0, cover)
        if slug == 'pro-10':
            assert PRO_10_COVER.is_file(), PRO_10_COVER
            selected_photos.insert(0, PRO_10_COVER)
        if slug in EXPECTED_GALLERY_COUNTS:
            assert len(selected_photos) == EXPECTED_GALLERY_COUNTS[slug], (slug, len(selected_photos))
        gallery = []
        for n, photo in enumerate(selected_photos, 1):
            name = f'{slug}-gallery-{n:02d}.webp'
            convert(photo, MEDIA / slug / name)
            gallery.append(f'/images/products/air-equipment/{slug}/{name}')
        installation_images = []
        seen_installation = set()
        for directory in ([] if slug == 'tj-1300ls' else folder.glob('03_*')):
            for photo in sorted(directory.rglob('*'), key=lambda p: p.name.casefold()):
                if not photo.is_file() or photo.suffix.lower() not in IMAGE_EXTENSIONS or photo.name.startswith('._'):
                    continue
                digest = hashlib.md5(photo.read_bytes()).digest()
                if digest in seen_installation:
                    continue
                seen_installation.add(digest)
                name = f'{slug}-installation-{len(installation_images) + 1:02d}.webp'
                convert(photo, MEDIA / slug / name)
                installation_images.append(f'/images/products/air-equipment/{slug}/{name}')
        catalog.append({
            'model': model, 'slug': slug, 'group': group, 'groupSlug': group_slug,
            'hidden': slug in {'ga-163x', 'ga-1610', 'ky-4ew'},
            'subtitle': hero[2], 'summary': hero[3], 'gallery': gallery,
            'thumbnail': gallery[0] if gallery else None,
            'specs': specs, 'sellingPoints': numbered_points(selling),
            'installation': {'heading': installation_lines[0], 'description': installation_description,
                             'priorityMaterials': priority_materials, 'images': installation_images},
        })

assert len(catalog) == 49 and len(used_slugs) == 49, (len(catalog), len(used_slugs))
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} air equipment products, {sum(len(p["gallery"]) for p in catalog)} images; {sum(not p["gallery"] for p in catalog)} have no source photo.')
