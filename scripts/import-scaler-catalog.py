"""Import the three Scaler source groups into product data and WebP media."""

from pathlib import Path
import hashlib
import json
import re
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Curing Light & Scaler/Scaler')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/scaler'
DATA = PROJECT / 'src/data/scalerModels.json'
GROUPS = [
    ('Ultrasonic Scaler_超声波洁牙机', 'Ultrasonic Scaler', 'ultrasonic-scaler'),
    ('Air Polisher_喷砂洁牙机_牙周治疗', 'Air Polisher', 'air-polisher'),
    ('Accessories & Consumables_配件耗材', 'Accessories & Consumables', 'accessories-consumables'),
]
PREFERRED_HERO_NUMBER = {'TJ-F18L': 3}
REMOVED_GALLERY_NUMBERS = {'AS-K3': {3, 4}, 'TJ-AT-3': {7, 8}, 'TJ-Holder6': {6}}
COVER_NUMBER = {'TJ-ST5': 3, 'UDS-N1': 2, 'UDS-N2 LED': 2}
TEXT_ONLY_FEATURES = {'TJ-DA20'}
EXACT_GALLERY_FILES = {'TJ-K08B': ['01_产品图3.png', '02_产品图2.png', '03_产品图4.png']}
SPEC_OVERRIDES = {
    'UDS-P LED': [
        {'label': 'Main unit weight', 'value': '0.68kg'},
        {'label': 'Adapter weight', 'value': '1.2kg'},
        {'label': 'Dimensions', 'value': '178mm*145mm*89mm'},
    ],
}


def slugify(value):
    value = unicodedata.normalize('NFKD', value).lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value)).strip('-')


def source_lines(folder, prefix):
    files = [path for path in folder.glob(f'{prefix}_*/*.txt') if not path.name.startswith('._')]
    assert len(files) == 1, (folder, prefix, files)
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def english_only(value):
    return re.sub(r'\s+', ' ', re.sub(r'[\u3400-\u9fff]+', '', value)).strip()


def numbered_points(lines, kind):
    indices = [index for index, line in enumerate(lines) if re.match(r'^0[1-4]\s+', line)]
    assert len(indices) == 4, (kind, lines)
    stop = lines.index('PRODUCT VIDEO') if kind == 'selling' and 'PRODUCT VIDEO' in lines else len(lines)
    points = []
    for number, index in enumerate(indices):
        title = re.match(r'^0[1-4]\s+(.+)', lines[index]).group(1)
        end = indices[number + 1] if number < 3 else stop
        detail = lines[index + 1:end]
        assert len(detail) == 1, (kind, lines[index], detail)
        if kind == 'selling':
            points.append({'title': title, 'description': detail[0]})
        else:
            points.append({'eyebrow': f'{number + 1:02d}', 'title': title, 'description': detail[0]})
    return points


def image_order(path):
    number = re.match(r'^(\d+)', path.stem)
    return (int(number.group(1)) if number else 999, path.name.lower())


def canonical_stem(path):
    return re.sub(r'_(?:去水印)?清晰版', '', path.stem).strip().lower()


def quality(path):
    return ('清晰版' in path.stem, path.suffix.lower() in ('.png', '.webp'), path.stat().st_size)


def images_in(folder, pattern):
    paths = [path for path in folder.glob(pattern)
             if path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp') and not path.name.startswith('._')]
    variants = {}
    for path in paths:
        variants.setdefault(canonical_stem(path), []).append(path)
    photos = sorted((max(options, key=quality) for options in variants.values()), key=image_order)
    seen = set()
    unique = []
    for photo in photos:
        digest = hashlib.md5(photo.read_bytes()).digest()
        if digest not in seen:
            seen.add(digest)
            unique.append(photo)
    return unique


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=85, method=6)


catalog = []
for folder_name, group, group_slug in GROUPS:
    group_folder = SOURCE / folder_name
    folders = sorted(path for path in group_folder.iterdir() if path.is_dir() and not path.name.startswith('._'))
    for folder in folders:
        hero = source_lines(folder, '01')
        selling = source_lines(folder, '02')
        feature = source_lines(folder, '03')
        specs_text = source_lines(folder, '04')
        assert hero[0] and selling[0] == 'KEY SELLING POINTS' and feature[0] == 'FEATURES', folder
        assert specs_text[0] == 'TECHNICAL SPECIFICATIONS', folder
        model = next(line.split(':', 1)[1].strip() for line in specs_text if line.startswith('Model:'))
        slug = slugify(model)
        assert slug, folder
        specs = []
        for line in specs_text[2:]:
            assert ':' in line, (folder, line)
            label, value = [part.strip() for part in line.split(':', 1)]
            if label != 'Model':
                specs.append({'label': label, 'value': value})
        assert specs, folder
        specs = SPEC_OVERRIDES.get(model, specs)

        photos = images_in(folder, '01_*/01_*/*')
        assert photos, f'Missing main gallery: {folder}'
        if model in EXACT_GALLERY_FILES:
            by_name = {photo.name: photo for photo in photos}
            assert all(name in by_name for name in EXACT_GALLERY_FILES[model]), model
            photos = [by_name[name] for name in EXACT_GALLERY_FILES[model]]
        if model in PREFERRED_HERO_NUMBER:
            preferred_index = PREFERRED_HERO_NUMBER[model] - 1
            assert preferred_index < len(photos), model
            photos.insert(0, photos.pop(preferred_index))
        removed = REMOVED_GALLERY_NUMBERS.get(model, set())
        assert all(1 <= number <= len(photos) for number in removed), model
        photos = [photo for index, photo in enumerate(photos, 1) if index not in removed]
        gallery = []
        for index, photo in enumerate(photos, 1):
            name = f'{slug}-gallery-{index:02d}.webp'
            convert(photo, MEDIA / slug / name)
            gallery.append(f'/images/products/scaler/{slug}/{name}')

        features = numbered_points(feature, 'features')
        feature_photos = images_in(folder, '03_*/共享盘*/*')
        if model not in TEXT_ONLY_FEATURES and len(feature_photos) >= 4:
            for index, photo in enumerate(feature_photos[:4], 1):
                name = f'{slug}-feature-{index:02d}.webp'
                convert(photo, MEDIA / slug / name)
                features[index - 1]['image'] = f'/images/products/scaler/{slug}/{name}'

        catalog.append({
            'model': model,
            'slug': slug,
            'group': group,
            'groupSlug': group_slug,
            'title': english_only(hero[1]),
            'subtitle': english_only(hero[2]),
            'summary': english_only(hero[3]),
            'specs': specs,
            'gallery': gallery,
            'thumbnail': gallery[COVER_NUMBER.get(model, 1) - 1],
            'sellingHeading': english_only(selling[1]),
            'sellingPoints': numbered_points(selling, 'selling'),
            'featureHeading': english_only(feature[1]),
            'features': features,
        })

assert len(catalog) == 25, f'Unexpected product count: {len(catalog)}'
assert len({item['slug'] for item in catalog}) == len(catalog), 'Duplicate product route'
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
used_media = {
    PROJECT / 'public' / path.lstrip('/')
    for item in catalog
    for path in [*item['gallery'], *(feature['image'] for feature in item['features'] if 'image' in feature)]
}
for path in MEDIA.rglob('*.webp'):
    if path not in used_media:
        path.unlink()
print(f'Imported {len(catalog)} Scaler products, {sum(len(item["gallery"]) for item in catalog)} gallery photos and {sum(sum("image" in feature for feature in item["features"]) for item in catalog)} feature photos to {DATA}')
