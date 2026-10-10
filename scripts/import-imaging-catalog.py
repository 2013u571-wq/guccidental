"""Import Imaging System product TXT copy and main gallery photos."""

from pathlib import Path
import hashlib
import json
import re
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Imaging System')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/imaging-system'
DATA = PROJECT / 'src/data/imagingModels.json'
GROUPS = [
    ('X-RAY system', 'X-ray', 'x-ray'),
    ('CBCT', 'CBCT', 'cbct'),
    ('scanner', 'Intraoral Scanner', 'intraoral-scanner'),
    ('Dental Intraoral Camera', 'Intraoral Camera', 'intraoral-camera'),
]
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
# These folders repeat a model already represented by a fuller primary folder.
DUPLICATE_FOLDERS = {
    'X Ray RAY68(M)-D',
    'X Ray UnitBLX-10',
    'X-rayBLX-8',
    'Dental X-Ray(TJ-RY5)',
}
ENGLISH_MODEL_NAMES = {
    '二手CBCT产品资料': 'Pre-owned CBCT System',
    '美亚全景机和CBCT': 'Meyer Panoramic & CBCT',
    'OPG全景机和CBCT': 'OPG Panoramic & CBCT',
    'panda口扫': 'Panda Intraoral Scanner',
    '岱洛': 'DYNAMIC Intraoral Scanner',
    '精美蓝野口扫3DS 2.0': '3DS 2.0',
    'Vatech Ezray X光机': 'Vatech Ezray',
}


def slugify(value):
    value = unicodedata.normalize('NFKD', value).lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value)).strip('-')


def model_name(raw):
    if raw in ENGLISH_MODEL_NAMES:
        return ENGLISH_MODEL_NAMES[raw]
    if re.search(r'[\u3400-\u9fff]', raw) and raw.startswith('TJ-'):
        match = re.match(r'^TJ-[A-Za-z0-9-]+', raw)
        assert match, raw
        return match.group(0)
    without_chinese_parentheses = re.sub(r'（[^）]*）|\([^)]*[\u3400-\u9fff][^)]*\)', '', raw)
    name = re.split(r'[\u3400-\u9fff]', without_chinese_parentheses, maxsplit=1)[0].strip(' -（）()')
    if re.match(r'^TJ-[A-Za-z0-9-]+\s+\d+[、,]', name):
        name = name.split()[0]
    name = re.sub(r'\s+', ' ', name)
    assert name and not re.search(r'[\u3400-\u9fff]', name), raw
    return name


def lines_for(folder, prefix):
    files = sorted(p for p in folder.glob(f'{prefix}_*/*.txt') if not p.name.startswith('._'))
    assert files, (folder, prefix)
    first = files[0].read_bytes()
    assert all(p.read_bytes() == first for p in files), (folder, prefix, files)
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def numbered_points(lines, feature=False):
    indices = [i for i, line in enumerate(lines) if re.match(r'^0[1-4]\s+', line)]
    assert len(indices) == 4, lines
    points = []
    for n, start in enumerate(indices):
        end = indices[n + 1] if n < 3 else len(lines)
        heading = re.match(r'^0[1-4]\s+(.+)', lines[start]).group(1)
        detail = lines[start + 1:end]
        assert len(detail) == (2 if feature else 1), (lines, heading, detail)
        if feature:
            points.append({'eyebrow': heading, 'title': detail[0], 'description': detail[1]})
        else:
            points.append({'title': heading, 'description': detail[0]})
    return points


def photo_order(path):
    match = re.match(r'^(\d+)', path.stem)
    return (int(match.group(1)) if match else 999, path.name.casefold())


def gallery_photos(folder):
    paths = [
        p for p in folder.glob('01_*/*/*')
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS and not p.name.startswith('._')
    ]
    assert paths, folder
    unique = []
    seen = set()
    for path in sorted(paths, key=photo_order):
        digest = hashlib.md5(path.read_bytes()).digest()
        if digest not in seen:
            seen.add(digest)
            unique.append(path)
    return unique


def feature_photos(folder):
    paths = [
        p for p in folder.glob('03_*/*/*')
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS and not p.name.startswith('._')
    ]
    unique = []
    seen = set()
    for path in sorted(paths, key=photo_order):
        digest = hashlib.md5(path.read_bytes()).digest()
        if digest not in seen:
            seen.add(digest)
            unique.append(path)
    return unique


def convert(source, target):
    if target.is_file() and target.stat().st_mtime >= source.stat().st_mtime:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


catalog = []
used_slugs = set()
for folder_name, group, group_slug in GROUPS:
    source_group = SOURCE / folder_name
    folders = sorted((p for p in source_group.iterdir() if p.is_dir() and not p.name.startswith('._')),
                     key=lambda p: p.name.casefold())
    for folder in folders:
        if folder.name.startswith('下架') or '通用资料' in folder.name or folder.name in DUPLICATE_FOLDERS:
            continue
        hero = lines_for(folder, '01')
        selling = lines_for(folder, '02')
        feature_lines = lines_for(folder, '03')
        specification = lines_for(folder, '04')
        assert hero[0] and len(hero) >= 4, folder
        assert selling[0] == 'KEY SELLING POINTS' and feature_lines[0] == 'FEATURES', folder
        assert specification[0] == 'TECHNICAL SPECIFICATIONS', folder
        model = model_name(hero[1])
        slug = slugify(model)
        if slug in used_slugs:
            slug = f'{slug}-{group_slug}'
        assert slug not in used_slugs, (folder, slug)
        used_slugs.add(slug)
        specs = []
        for line in specification[2:]:
            assert ':' in line, (folder, line)
            label, value = [part.strip() for part in line.split(':', 1)]
            if label == 'Model':
                value = model
            specs.append({'label': label, 'value': value})
        assert specs and specs[0]['label'] == 'Model', folder
        gallery = []
        for n, photo in enumerate(gallery_photos(folder), 1):
            filename = f'{slug}-gallery-{n:02d}.webp'
            convert(photo, MEDIA / slug / filename)
            gallery.append(f'/images/products/imaging-system/{slug}/{filename}')
        features = numbered_points(feature_lines, feature=True)
        detail_photos = feature_photos(folder)
        if len(detail_photos) >= 4:
            for n, photo in enumerate(detail_photos[:4], 1):
                filename = f'{slug}-feature-{n:02d}.webp'
                convert(photo, MEDIA / slug / filename)
                features[n - 1]['image'] = f'/images/products/imaging-system/{slug}/{filename}'
        catalog.append({
            'model': model,
            'slug': slug,
            'group': group,
            'groupSlug': group_slug,
            'subtitle': hero[2],
            'summary': hero[3],
            'gallery': gallery,
            'thumbnail': gallery[0],
            'sellingHeading': f'Why clinics choose the {model}',
            'sellingPoints': numbered_points(selling),
            'featureHeading': feature_lines[1],
            'features': features,
            'specs': specs,
        })

assert len(catalog) == 63 and len(used_slugs) == 63, (len(catalog), len(used_slugs))
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} imaging products, {sum(len(p["gallery"]) for p in catalog)} gallery images and {sum(sum("image" in f for f in p["features"]) for p in catalog)} feature images.')
