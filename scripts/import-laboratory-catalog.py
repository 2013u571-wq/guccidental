"""Import the supplied Lab product folders into the Laboratory catalog."""

from pathlib import Path
import hashlib
import json
import re
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Lab')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/laboratory'
DATA = PROJECT / 'src/data/laboratoryModels.json'
GROUP_ORDER = [
    'DENTAL 3D PRINTING',
    'CAD/CAM LAB MILLING',
    'DENTAL ARTICULATOR SERIES',
    'VACUUM FORMING SERIES',
    'DENTAL FURNACE SERIES',
    'DENTAL WAX WORKFLOW',
    'DENTAL LAB EQUIPMENT',
]
COVER_INDEX = {'tj-art01': 4, 'tj-art02': 3, 'tj-art06': 3}


def slugify(value):
    value = unicodedata.normalize('NFKD', value).lower()
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value)).strip('-')


def source_lines(folder, prefix):
    files = [path for path in folder.glob(f'{prefix}_*/*.txt') if not path.name.startswith('._')]
    assert files, (folder, prefix)
    contents = {path.read_text(encoding='utf-8-sig') for path in files}
    assert len(contents) == 1, f'Conflicting {prefix} text files: {folder}'
    return [line.strip() for line in contents.pop().splitlines() if line.strip()]


def numbered_points(lines, kind):
    indices = [index for index, line in enumerate(lines) if re.match(r'^0[1-4]\s+', line)]
    assert len(indices) == 4, (kind, lines)
    points = []
    for number, index in enumerate(indices):
        label = re.match(r'^0[1-4]\s+(.+)', lines[index]).group(1)
        end = indices[number + 1] if number + 1 < 4 else len(lines)
        detail = lines[index + 1:end]
        if kind == 'selling':
            assert len(detail) == 1, (kind, lines[index], detail)
            points.append({'title': label, 'description': detail[0]})
        else:
            assert len(detail) == 2, (kind, lines[index], detail)
            points.append({'eyebrow': label, 'title': detail[0], 'description': detail[1]})
    return points


def image_order(path):
    stem = re.sub(r'\(\d+\)$', '', path.stem).strip()
    number = re.match(r'^(\d+)', stem)
    if stem.startswith('主图'):
        position = -1
    else:
        position = int(number.group(1)) if number else 999
    duplicate = path.stem != stem
    preferred_format = path.suffix.lower() not in ('.png', '.webp')
    return (position, stem.lower(), duplicate, preferred_format, path.name.lower())


def images_in(folder, pattern):
    paths = sorted((path for path in folder.glob(pattern)
                    if path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp')
                    and not path.name.startswith('._')), key=image_order)
    found = []
    stems = set()
    contents = set()
    for path in paths:
        stem = path.stem.strip().lower()
        digest = hashlib.md5(path.read_bytes()).digest()
        if stem in stems or digest in contents:
            continue
        stems.add(stem)
        contents.add(digest)
        found.append(path)
    return found


def display_model(source_model):
    if source_model == '牙科雕铣机':
        return 'Dental Milling Machine'
    if source_model == 'TJ-015 压膜片':
        return 'TJ-015 Forming Sheets'
    if source_model.startswith('TJ-DTRdental x5'):
        return 'TJ-DTRdental x5'
    code = re.match(r'^(?:TJD|TJ|JT)-?[A-Za-z0-9+-]+', source_model)
    if code:
        return code.group(0)
    assert not re.search(r'[\u3400-\u9fff]', source_model), source_model
    return source_model


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


catalog = []
folders = sorted(path for path in SOURCE.iterdir() if path.is_dir() and not path.name.startswith('._'))
assert len(folders) == 42, f'Unexpected Lab folder count: {len(folders)}'
for folder in folders:
    hero = source_lines(folder, '01')
    selling = source_lines(folder, '02')
    feature = source_lines(folder, '03')
    specs_text = source_lines(folder, '04')
    assert hero[0] in GROUP_ORDER and len(hero) >= 4, folder
    assert selling[0] == 'KEY SELLING POINTS' and feature[0] == 'FEATURES', folder
    assert specs_text[0] == 'TECHNICAL SPECIFICATIONS', folder

    specs = []
    source_model = None
    for line in specs_text[2:]:
        assert ':' in line, (folder, line)
        label, value = [part.strip() for part in line.split(':', 1)]
        if label == 'Model':
            source_model = value
        else:
            specs.append({'label': label, 'value': value})
    assert source_model and specs and hero[1] == source_model, folder
    model = display_model(source_model)
    slug = slugify(model)
    assert slug, folder

    photos = images_in(folder, '01_*/01_*/*')
    assert photos, f'Missing main product photos: {folder}'
    gallery = []
    for index, photo in enumerate(photos, 1):
        name = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / name)
        gallery.append(f'/images/products/laboratory/{slug}/{name}')
    cover_index = COVER_INDEX.get(slug, 1)
    assert cover_index <= len(gallery), (slug, cover_index, len(gallery))
    if cover_index != 1:
        cover = gallery.pop(cover_index - 1)
        gallery.insert(0, cover)

    features = numbered_points(feature, 'features')
    feature_photos = images_in(folder, '03_*/共享盘*/*')
    if len(feature_photos) >= 4:
        for index, photo in enumerate(feature_photos[:4], 1):
            name = f'{slug}-feature-{index:02d}.webp'
            convert(photo, MEDIA / slug / name)
            features[index - 1]['image'] = f'/images/products/laboratory/{slug}/{name}'

    catalog.append({
        'model': model,
        'slug': slug,
        'group': hero[0],
        'title': f'{model} {hero[2]}' if model != hero[2] else model,
        'subtitle': hero[2],
        'summary': hero[3],
        'specs': specs,
        'gallery': gallery,
        'thumbnail': gallery[0],
        'sellingHeading': selling[1].replace(source_model, model),
        'sellingPoints': numbered_points(selling, 'selling'),
        'featureHeading': feature[1],
        'features': features,
    })

assert len({item['slug'] for item in catalog}) == len(catalog), 'Duplicate product route'
catalog.sort(key=lambda item: (GROUP_ORDER.index(item['group']), item['model'].lower()))
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} laboratory products, {sum(len(item["gallery"]) for item in catalog)} gallery photos and {sum(sum("image" in feature for feature in item["features"]) for item in catalog)} feature photos to {DATA}')
