"""Import the supplied Teaching Model product folders and local product photos."""

from pathlib import Path
import json
import re
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Teaching Model')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/teaching-model'
DATA = PROJECT / 'src/data/teachingModels.json'
SCENE_SOURCE = SOURCE / '通用资料/02 产品详情图及参数（古旗和拓健）'
SCENE_FILES = [
    '1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_24_25_26_27_28_29_30_31_32_33_34_35_36_37_38_39_40_41_42_43_44_45_46_47.jpg',
    '1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_24_25_26_27_28_29_30_31_32_33_34_35_36_37.jpg',
    '1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18_19_20_21_22_23_24_25_26_27_28_29_30_31_32_33_34_35.jpg',
    '1_2_3_4_5_6_7_8_9_10_11_12_13_14_15_16_17_18.jpg',
]


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
        end = indices[number + 1] if number + 1 < 4 else len(lines)
        detail = lines[index + 1:end]
        if kind == 'selling':
            assert len(detail) == 1, (kind, lines[index], detail)
            points.append({'title': label, 'description': detail[0]})
        else:
            assert len(detail) == 5 and all(line.startswith('- ') for line in detail[2:]), (kind, lines[index], detail)
            points.append({
                'eyebrow': label,
                'title': detail[0],
                'description': detail[1],
                'bullets': [line[2:] for line in detail[2:]],
            })
    return points


def main_photos(folder):
    hero_folder = next(folder.glob('01_*'))
    photos = []
    for path in hero_folder.rglob('*'):
        if (path.is_file() and path.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp')
                and not path.name.startswith('._')
                and not any(part.startswith('_') for part in path.relative_to(hero_folder).parts[:-1])):
            photos.append(path)
    return sorted(photos)


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


catalog = []
folders = sorted(path for path in SOURCE.iterdir() if path.is_dir() and path.name != '通用资料')
assert len(folders) == 50, f'Unexpected Teaching Model folder count: {len(folders)}'
for folder in folders:
    slug = slugify(folder.name)
    hero = source_lines(folder, '01')
    selling = source_lines(folder, '02')
    feature = source_lines(folder, '03')
    specs_text = source_lines(folder, '04')
    assert hero[0] == 'TEACHING MODEL SERIES' and len(hero) >= 4, folder
    assert selling[0] == 'KEY SELLING POINTS' and feature[0] == 'FEATURES', folder
    assert specs_text[0] == 'TECHNICAL SPECIFICATIONS', folder

    specs = []
    model = None
    for line in specs_text:
        if ':' not in line:
            continue
        label, value = [part.strip() for part in line.split(':', 1)]
        if label == 'Model':
            model = value
        else:
            specs.append({'label': label, 'value': value})
    assert model and specs, folder
    code_match = re.match(r'^TJ-[A-Za-z0-9-]+', model)
    assert code_match and hero[1] == f'{model} {hero[2]}', (folder, hero[1], model, hero[2])
    model_code = code_match.group(0)
    english_title = f'{model_code} {hero[2]}'

    photos = main_photos(folder)
    assert photos, f'Missing main photo: {folder}'
    gallery = []
    for index, photo in enumerate(photos, 1):
        name = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / name)
        gallery.append(f'/images/products/teaching-model/{slug}/{name}')

    catalog.append({
        'model': model_code,
        'slug': slug,
        'group': hero[0],
        'title': english_title,
        'subtitle': hero[2],
        'summary': hero[3],
        'specs': specs,
        'gallery': gallery,
        'thumbnail': gallery[0],
        'sellingHeading': selling[1].replace(model, model_code),
        'sellingPoints': numbered_points(selling, 'selling'),
        'featureHeading': feature[1],
        'features': numbered_points(feature, 'features'),
    })

assert len({item['slug'] for item in catalog}) == len(catalog), 'Duplicate product route'
catalog.sort(key=lambda item: item['model'].lower())
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
for index, filename in enumerate(SCENE_FILES, 1):
    source = SCENE_SOURCE / filename
    assert source.is_file(), f'Missing usage scenario photo: {source}'
    convert(source, MEDIA / 'usage-scenarios' / f'usage-scenario-{index:02d}.webp')
print(f'Imported {len(catalog)} teaching models, {sum(len(item["gallery"]) for item in catalog)} gallery photos, and {len(SCENE_FILES)} usage scenario photos to {DATA}')
