"""Import the five supplied Orthodontics products and their reviewed photos."""

from pathlib import Path
import json
import re

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Orthodontics')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/orthodontics'
DATA = PROJECT / 'src/data/orthodonticsModels.json'

MODELS = {
    'DI-M21': {
        'slug': 'di-m21',
        'display': 'DI-M21',
        'gallery_section': '01',
    },
    'TJ-B252 成型片': {
        'slug': 'tj-b252',
        'display': 'TJ-B252',
        'gallery_section': '01',
    },
    'TJ-DE48 百诺儿童不锈钢预成冠': {
        'slug': 'tj-de48',
        'display': 'TJ-DE48',
        'gallery_section': '01',
    },
    'TJ-F003': {
        'slug': 'tj-f003',
        'display': 'TJ-F003',
        'gallery_section': '02',
    },
    'TJ-OT40': {
        'slug': 'tj-ot40',
        'display': 'TJ-OT40',
        'gallery_section': '01',
    },
}


def source_lines(folder, prefix):
    files = [path for path in folder.glob(f'{prefix}_*/*.txt') if not path.name.startswith('._')]
    assert len(files) == 1, (folder, prefix, files)
    return [line.strip() for line in files[0].read_text(encoding='utf-8-sig').splitlines() if line.strip()]


def media_folder(folder, prefix):
    pattern = f'{prefix}_*/01_*' if prefix == '01' else f'{prefix}_*/共享盘*'
    matches = [path for path in folder.glob(pattern) if path.is_dir()]
    assert len(matches) == 1, (folder, pattern, matches)
    return matches[0]


def numbered_points(lines, kind):
    points = []
    for index, line in enumerate(lines):
        match = re.match(r'^0[1-4]\s+(.+)', line)
        if not match:
            continue
        if kind == 'selling':
            points.append({'title': match.group(1), 'description': lines[index + 1]})
        else:
            points.append({'eyebrow': match.group(1), 'title': lines[index + 1], 'description': lines[index + 2]})
    assert len(points) == 4, (kind, lines)
    return points


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=88, method=6)


assert {path.name for path in SOURCE.iterdir() if path.is_dir()} == set(MODELS)
catalog = []
for folder_name, settings in MODELS.items():
    folder = SOURCE / folder_name
    slug = settings['slug']
    hero_lines = source_lines(folder, '01')
    selling_lines = source_lines(folder, '02')
    feature_lines = source_lines(folder, '03')
    spec_lines = source_lines(folder, '04')
    specs = []
    for line in spec_lines:
        if ':' in line:
            label, value = line.split(':', 1)
            if label.strip() != 'Model':
                specs.append({'label': label.strip(), 'value': value.strip()})

    section = settings['gallery_section']
    gallery_folder = media_folder(folder, section)
    photos = sorted(path for path in gallery_folder.iterdir() if path.suffix.lower() in ('.jpg', '.jpeg', '.png') and not path.name.startswith('._'))
    assert photos, folder
    gallery = []
    for index, photo in enumerate(photos, 1):
        filename = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / filename)
        gallery.append(f'/images/products/orthodontics/{slug}/{filename}')

    features = numbered_points(feature_lines, 'features')

    cover_name = f'{slug}-cover-cutout.webp'
    assert (MEDIA / slug / cover_name).exists(), f'Missing reviewed transparent cover: {cover_name}'
    catalog.append({
        'model': settings['display'],
        'slug': slug,
        'title': hero_lines[1],
        'subtitle': hero_lines[2],
        'summary': next(line for line in hero_lines if line.startswith(('A ', 'An '))),
        'specs': specs,
        'gallery': gallery,
        'thumbnail': f'/images/products/orthodontics/{slug}/{cover_name}',
        'sellingHeading': selling_lines[1],
        'sellingPoints': numbered_points(selling_lines, 'selling'),
        'featureHeading': feature_lines[1],
        'features': features,
    })

DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} Orthodontics products to {DATA}')
