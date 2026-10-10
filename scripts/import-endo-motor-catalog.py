"""Import the two supplied Endo Motor products and their reviewed image order."""

from pathlib import Path
import json
import re

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Endo Motor')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/endo-motor'
DATA = PROJECT / 'src/data/endoMotorModels.json'

MODELS = {
    'ENDOMOTOR X': {
        'slug': 'endomotor-x',
        'hero': '01_08.jpg',
        'omit_gallery_photos': ['05_08.jpg', '06_01.jpg'],
        'feature_photos': ['01_02.jpg', '05_03.jpg', '04_01.jpg', '02_05.jpg'],
    },
    'Y-SMART': {
        'slug': 'y-smart',
        'hero': '04_01.jpg',
        'omit_gallery_photos': ['02_10.jpg'],
        'feature_photos': ['04_06.jpg', '05_02.jpg', '02_01.jpg', '07_05.jpg'],
    },
}


def lines_from(pattern, folder):
    files = [path for path in folder.glob(pattern) if not path.name.startswith('._')]
    assert len(files) == 1, f'Expected one source file for {folder / pattern}'
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def numbered_points(lines, kind):
    points = []
    for index, line in enumerate(lines):
        match = re.match(r'^\d{2}\s+(.+)', line)
        if not match:
            continue
        if kind == 'selling':
            points.append({'title': match.group(1), 'description': lines[index + 1]})
        else:
            points.append({'eyebrow': match.group(1), 'title': lines[index + 1], 'description': lines[index + 2]})
    assert len(points) == 4, f'Expected four {kind} points: {lines}'
    return points


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=88, method=6)


assert {folder.name for folder in SOURCE.iterdir() if folder.is_dir()} == set(MODELS)
catalog = []
for model, settings in MODELS.items():
    folder = SOURCE / model
    slug = settings['slug']
    hero_lines = lines_from('01_*/*.txt', folder)
    selling_lines = lines_from('02_*/*.txt', folder)
    feature_lines = lines_from('03_*/*.txt', folder)
    spec_lines = lines_from('04_*/*.txt', folder)
    summary = next(line for line in hero_lines if line.startswith(('A compact', 'An ')))
    specs = []
    for line in spec_lines:
        if ':' in line:
            key, value = line.split(':', 1)
            if key.strip() != 'Model':
                specs.append({'label': key.strip(), 'value': value.strip()})

    gallery_folder = next(folder.glob('01_*/01_*'))
    photos = sorted(path for path in gallery_folder.iterdir() if path.suffix.lower() in ('.jpg', '.jpeg', '.png') and not path.name.startswith('._'))
    assert len(photos) == 8, (model, photos)
    hero_photo = next(path for path in photos if path.name == settings['hero'])
    photos = [hero_photo] + [path for path in photos if path != hero_photo]
    gallery = []
    for index, photo in enumerate(photos, 1):
        filename = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / filename)
        if photo.name not in settings['omit_gallery_photos']:
            gallery.append(f'/images/products/endo-motor/{slug}/{filename}')

    feature_folder = next(folder.glob('03_*/共享盘功能细节图'))
    features = numbered_points(feature_lines, 'features')
    for index, (feature, filename) in enumerate(zip(features, settings['feature_photos']), 1):
        image_name = f'{slug}-feature-{index:02d}.webp'
        convert(feature_folder / filename, MEDIA / slug / image_name)
        feature['image'] = f'/images/products/endo-motor/{slug}/{image_name}'

    cover_name = f'{slug}-cover-cutout.webp'
    assert (MEDIA / slug / cover_name).exists(), f'Missing reviewed transparent cover: {cover_name}'
    catalog.append({
        'model': model,
        'slug': slug,
        'title': f'{model} Endodontic Motor',
        'subtitle': 'Wireless endodontic motor',
        'summary': summary,
        'specs': specs,
        'gallery': gallery,
        'thumbnail': f'/images/products/endo-motor/{slug}/{cover_name}',
        'sellingHeading': selling_lines[1],
        'sellingPoints': numbered_points(selling_lines, 'selling'),
        'featureHeading': feature_lines[1],
        'features': features,
    })

DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} Endo Motor models to {DATA}')
