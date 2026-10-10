"""Import the supplied Disposables & Comsumables product folders."""

from pathlib import Path
import json
import re
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Disposables & Comsumables')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/disposable-consumables'
DATA = PROJECT / 'src/data/disposableConsumableModels.json'

GROUP_ORDER = ['DISPOSABLES & CONSUMABLES', 'CLINIC ORGANIZATION', 'CLINIC ACCESSORIES']
DISPLAY_OVERRIDES = {'tj-ezicrown': 'TJ-EziCrown'}
TITLE_OVERRIDES = {'tj-ezicrown': 'TJ-EziCrown Temporary Crown Material'}
COVER_INDEX = {'tj-059': 4, 'tj-r10': 2, 'tj-tray12': 5}
GALLERY_EXCLUDES = {'tj-dn2': {5}}
TEXT_ONLY_FEATURES = {'nt50-1', 'tj-dn2', 'tj-needle11'}


def slugify(value):
    value = unicodedata.normalize('NFKD', value).lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value)).strip('-')


def source_lines(folder, prefix):
    files = [path for path in folder.glob(f'{prefix}_*/*.txt') if not path.name.startswith('._')]
    assert len(files) == 1, (folder, prefix, files)
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def numbered_points(lines, kind):
    indices = [index for index, line in enumerate(lines) if re.match(r'^0[1-4]\s+', line)]
    assert len(indices) == 4, (kind, lines)
    points = []
    for number, index in enumerate(indices):
        label = re.match(r'^0[1-4]\s+(.+)', lines[index]).group(1)
        if kind == 'selling':
            points.append({'title': label, 'description': lines[index + 1]})
        else:
            end = indices[number + 1] if number + 1 < 4 else len(lines)
            detail_lines = lines[index + 3:end]
            assert len(detail_lines) == 4 and all(line.startswith('- ') for line in detail_lines[:3]) and detail_lines[3].startswith('Image:'), (lines[index], detail_lines)
            points.append({
                'eyebrow': label,
                'title': lines[index + 1],
                'description': lines[index + 2],
                'bullets': [line[2:] for line in detail_lines[:3]],
            })
    return points


def images_in(pattern, folder):
    return sorted(path for path in folder.glob(pattern) if path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp') and not path.name.startswith('._'))


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


catalog = []
folders = sorted(path for path in SOURCE.iterdir() if path.is_dir())
assert len(folders) == 18, f'Unexpected Disposables & Comsumables folder count: {len(folders)}'
for folder in folders:
    slug = slugify(folder.name)
    hero_lines = source_lines(folder, '01')
    selling_lines = source_lines(folder, '02')
    feature_lines = source_lines(folder, '03')
    spec_lines = source_lines(folder, '04')
    assert len(hero_lines) >= 4 and hero_lines[0] in GROUP_ORDER, folder
    assert selling_lines[0] == 'KEY SELLING POINTS' and feature_lines[0] == 'FEATURES', folder
    assert spec_lines[0] == 'TECHNICAL SPECIFICATIONS', folder

    specs = []
    model = None
    for line in spec_lines:
        if ':' not in line:
            continue
        label, value = [part.strip() for part in line.split(':', 1)]
        if label == 'Model':
            model = value
        else:
            specs.append({'label': label, 'value': value})
    assert model and specs, folder

    photos = images_in('01_*/01_*/*', folder)
    assert photos, f'Missing main product photos: {folder}'
    assert max(GALLERY_EXCLUDES.get(slug, {0})) <= len(photos), (slug, len(photos))
    gallery = []
    for index, photo in enumerate(photos, 1):
        if index in GALLERY_EXCLUDES.get(slug, set()):
            continue
        image_name = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / image_name)
        gallery.append(f'/images/products/disposable-consumables/{slug}/{image_name}')
    cover_index = COVER_INDEX.get(slug, 1)
    assert cover_index <= len(photos) and cover_index not in GALLERY_EXCLUDES.get(slug, set()), (slug, cover_index)
    thumbnail = f'/images/products/disposable-consumables/{slug}/{slug}-gallery-{cover_index:02d}.webp'
    if cover_index != 1:
        gallery = [thumbnail] + [image for image in gallery if image != thumbnail]

    features = numbered_points(feature_lines, 'features')
    feature_photos = images_in('03_*/共享盘*/*', folder)
    if len(feature_photos) >= 4 and slug not in TEXT_ONLY_FEATURES:
        for index, photo in enumerate(feature_photos[:4], 1):
            image_name = f'{slug}-feature-{index:02d}.webp'
            convert(photo, MEDIA / slug / image_name)
            features[index - 1]['image'] = f'/images/products/disposable-consumables/{slug}/{image_name}'

    catalog.append({
        'model': DISPLAY_OVERRIDES.get(slug, model),
        'slug': slug,
        'group': hero_lines[0],
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
catalog.sort(key=lambda item: (GROUP_ORDER.index(item['group']), item['model'].lower()))
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} disposable and clinic-accessory products and {sum(len(item["gallery"]) for item in catalog)} gallery photos to {DATA}')
