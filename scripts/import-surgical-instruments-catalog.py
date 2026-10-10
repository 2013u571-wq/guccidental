"""Import the supplied Surgical instruments product folders into site assets/data."""

from pathlib import Path
import json
import re
import sys
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Surgical instruments')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/surgical-instruments'
DATA = PROJECT / 'src/data/surgicalInstrumentModels.json'
TEXT_ONLY = '--text-only' in sys.argv

SLUG_OVERRIDES = {
    'OR12进口器械微创拔牙钳套装': 'or12-forceps-set',
    'TJ-S36 注射器': 'tj-s36-injector',
}
DISPLAY_OVERRIDES = {
    'OR12进口器械微创拔牙钳套装': 'OR12 Forceps Set',
    'TJ-S36 注射器': 'TJ-S36 Injector',
    'TJ-AM2000-01_TJ-AM2000-02 Dental Microscope': 'TJ-AM2000-01 / TJ-AM2000-02',
    'TJ-E10 10件套拔牙挺': 'TJ-E10',
}
TITLE_OVERRIDES = {'tj-e10-10': 'TJ-E10'}
GALLERY_EXCLUDES = {
    'dental-anesthesia-injector': {8},
    'gs182': {4, 5, 6},
    'm168': {4, 7},
    'or10': {8},
    'or12-forceps-set': {2, 3},
    'st414': {7, 8},
    't304': {5, 6, 8},
    'tj-bn07': {5},
    'tj-e10-10': {7, 8},
    'tj-e2': {4, 5},
    'tj-orkit18': {1, 3, 5},
    'tj-plate3': {3, 5},
    'tj-s36-injector': {1, 2, 6, 7},
    'tj-lku32': {5, 6},
    'fd-501g6': {5, 6},
    'hi-457': {2, 3},
    'tj-b233': {7, 8},
    'tj-wedge30-wooden-wedges': {2, 6},
    'tj-r17': {6, 7, 8},
}
COVER_INDEX = {
    'dl350-g': 6,
    'tj-bn01-tj-bn02-tj-bn04': 2,
    'tj-s36': 2,
    'tj-s36-injector': 2,
    'hi-457': 8,
    'tj-matrix36': 4,
}
EXTRA_GALLERY_SOURCES = {
    'tj-hook77': '02_关键卖点信息与素材/共享盘卖点素材/04_5.jpg',
}
TEXT_ONLY_FEATURES = {'gs182', 'tj-231-6pcs', 'tj-s186', 'tj-hook77', 'tj-r18'}
FEATURE_IMAGE_OVERRIDES = {
    'tj-am2000-01-tj-am2000-02-dental-microscope': [
        '04_详情页_08.jpg',
        '05_详情页_09.jpg',
        '06_详情页_10.jpg',
        '07_详情页_11.jpg',
    ],
    'tj-r4': [
        '02_1.1_副本.png',
        '04_1_副本.png',
        '06_3.jpg',
        '07_4.jpg',
    ],
}
GROUP_ORDER = [
    'DENTAL SURGICAL INSTRUMENTS',
    'SURGICAL EQUIPMENT',
    'SURGICAL CONSUMABLES',
    'DENTAL MAGNIFICATION',
    'DENTAL LIGHTING',
    'CLINICAL MONITORING',
    'RESTORATIVE ACCESSORIES',
    'ORTHODONTIC ACCESSORIES',
    'DENTAL ACCESSORIES',
    'MEDICAL APPAREL',
]


def slugify(value):
    value = unicodedata.normalize('NFKD', value).lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value)).strip('-')


def source_lines(folder, prefix):
    files = [path for path in folder.glob(f'{prefix}_*/*.txt') if not path.name.startswith('._')]
    assert len(files) == 1, (folder, prefix, files)
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def numbered_points(lines, kind):
    points = []
    indices = [index for index, line in enumerate(lines) if re.match(r'^0[1-4]\s+(.+)', line)]
    for position, index in enumerate(indices):
        line = lines[index]
        match = re.match(r'^0[1-4]\s+(.+)', line)
        if kind == 'selling':
            points.append({'title': match.group(1), 'description': lines[index + 1]})
        else:
            end = indices[position + 1] if position + 1 < len(indices) else len(lines)
            detail_lines = lines[index + 3:end]
            bullets = [entry[2:] for entry in detail_lines if entry.startswith('- ')]
            assert len(bullets) == 3 and len(detail_lines) == 4 and detail_lines[-1].startswith('Image:'), (line, detail_lines)
            points.append({'eyebrow': match.group(1), 'title': lines[index + 1], 'description': lines[index + 2], 'bullets': bullets})
    assert len(points) == 4, (kind, lines)
    return points


def images_in(pattern, folder):
    return sorted(path for path in folder.glob(pattern) if path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp') and not path.name.startswith('._'))


def convert(source, target):
    if TEXT_ONLY:
        assert target.exists(), f'Missing existing image: {target}'
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


catalog = []
folders = sorted(path for path in SOURCE.iterdir() if path.is_dir())
assert len(folders) == 43, f'Unexpected Surgical instruments folder count: {len(folders)}'
for folder in folders:
    slug = SLUG_OVERRIDES.get(folder.name, slugify(folder.name))
    hero_lines = source_lines(folder, '01')
    selling_lines = source_lines(folder, '02')
    feature_lines = source_lines(folder, '03')
    spec_lines = source_lines(folder, '04')
    assert len(hero_lines) >= 4, folder
    group = hero_lines[0]
    assert group in GROUP_ORDER, (folder, group)
    spec_map = {}
    specs = []
    for line in spec_lines:
        if ':' in line:
            label, value = line.split(':', 1)
            spec_map[label.strip()] = value.strip()
            if label.strip() != 'Model':
                specs.append({'label': label.strip(), 'value': value.strip()})

    photos = images_in('01_*/01_*/*', folder)
    assert photos, f'Missing main product photos: {folder}'
    assert max(GALLERY_EXCLUDES.get(slug, {0})) <= len(photos), (folder, len(photos))
    gallery = []
    for index, photo in enumerate(photos, 1):
        if index in GALLERY_EXCLUDES.get(slug, set()):
            continue
        image_name = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / image_name)
        gallery.append(f'/images/products/surgical-instruments/{slug}/{image_name}')
    cover_index = COVER_INDEX.get(slug, 1)
    assert cover_index <= len(photos), (slug, cover_index)
    thumbnail = f'/images/products/surgical-instruments/{slug}/{slug}-gallery-{cover_index:02d}.webp'
    if cover_index in GALLERY_EXCLUDES.get(slug, set()):
        # A category cover can use a source photo omitted from the detail gallery.
        convert(photos[cover_index - 1], MEDIA / slug / f'{slug}-gallery-{cover_index:02d}.webp')
    elif cover_index != 1:
        gallery = [thumbnail] + [image for image in gallery if image != thumbnail]
    if slug in EXTRA_GALLERY_SOURCES:
        extra_source = folder / EXTRA_GALLERY_SOURCES[slug]
        assert extra_source.exists(), extra_source
        extra_name = f'{slug}-gallery-{len(photos) + 1:02d}.webp'
        convert(extra_source, MEDIA / slug / extra_name)
        gallery.append(f'/images/products/surgical-instruments/{slug}/{extra_name}')

    features = numbered_points(feature_lines, 'features')
    feature_photos = images_in('03_*/共享盘*/*', folder)
    if slug in FEATURE_IMAGE_OVERRIDES:
        by_name = {photo.name: photo for photo in feature_photos}
        feature_photos = [by_name[name] for name in FEATURE_IMAGE_OVERRIDES[slug]]
    if len(feature_photos) >= 4 and slug not in TEXT_ONLY_FEATURES:
        for index, photo in enumerate(feature_photos[:4], 1):
            image_name = f'{slug}-feature-{index:02d}.webp'
            convert(photo, MEDIA / slug / image_name)
            features[index - 1]['image'] = f'/images/products/surgical-instruments/{slug}/{image_name}'

    catalog.append({
        'model': DISPLAY_OVERRIDES.get(folder.name, spec_map.get('Model', folder.name)),
        'slug': slug,
        'group': group,
        'title': TITLE_OVERRIDES.get(slug, hero_lines[1]),
        'subtitle': hero_lines[2],
        'summary': hero_lines[3],
        'specs': specs,
        'gallery': gallery,
        'thumbnail': thumbnail,
        'sellingHeading': selling_lines[1],
        'sellingPoints': numbered_points(selling_lines, 'selling'),
        'featureHeading': feature_lines[1],
        'features': features,
    })

assert len({item['slug'] for item in catalog}) == len(catalog), 'Duplicate product route'
catalog.sort(key=lambda item: (GROUP_ORDER.index(item['group']), item['model'].lower(), item['slug']))
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} Surgical instruments products and {sum(len(item["gallery"]) for item in catalog)} gallery photos to {DATA}')
