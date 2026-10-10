"""Merge and import Curing Light product folders by their specification model."""

from collections import defaultdict
from pathlib import Path
import hashlib
import json
import re
import shutil
import unicodedata

from PIL import Image, ImageOps

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/Curing Light & Scaler/Curing Light')
PROJECT = Path(__file__).resolve().parents[1]
MEDIA = PROJECT / 'public/images/products/curing-light'
VIDEO = PROJECT / 'public/videos/products/curing-light'
DATA = PROJECT / 'src/data/curingLightModels.json'
GROUP_ORDER = ['CURING LIGHT SERIES', 'CURING LIGHT ACCESSORY']
PREFERRED_TEXT_FOLDER = {
    'CL-03': 'CL-03枪式光固化',
    'CL-04': 'CL-04光固化',
    'CS-002': 'CS-002光固化挡板',
    'T787': 'T787 导光棒',
    'TJ-CS003': 'TJ-CS003光固化保护罩',
    'V300': 'V-300',
}
PREFERRED_PHOTO_FOLDER = {'V300': 'v300'}
PREFERRED_HERO_NUMBER = {'CL-10': 3, 'TJ-CS003': 4}
REMOVED_GALLERY_NUMBERS = {
    'CL-03': {2, 3, 4},
    'CL-04': {6, 7, 8, 9, 10},
    'CS-002': {2, 3, 4, 5},
    'T787': {8, 9, 10, 11},
}
TEXT_ONLY_FEATURES = {'CL-03', 'CL-04', 'LED.G', 'CS-002', 'T787'}
DISABLED_VIDEOS = {'TJ-CS003'}


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
    end_of_points = lines.index('PRODUCT VIDEO') if kind == 'selling' and 'PRODUCT VIDEO' in lines else len(lines)
    points = []
    for number, index in enumerate(indices):
        label = re.match(r'^0[1-4]\s+(.+)', lines[index]).group(1)
        end = indices[number + 1] if number + 1 < 4 else end_of_points
        detail = lines[index + 1:end]
        if kind == 'selling':
            assert len(detail) == 1, (kind, lines[index], detail)
            points.append({'title': label, 'description': detail[0]})
        else:
            assert len(detail) == 2, (kind, lines[index], detail)
            points.append({'eyebrow': label, 'title': detail[0], 'description': detail[1]})
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
    variants = defaultdict(list)
    for path in paths:
        variants[canonical_stem(path)].append(path)
    return sorted((max(options, key=quality) for options in variants.values()), key=image_order)


def merged_images(folders, pattern, model):
    photos = []
    seen = set()
    for folder in folders:
        for photo in images_in(folder, pattern):
            if model == 'V300' and photo.name == '01_catalog.png':
                continue  # The supplied PNG has large corrupted black areas.
            digest = hashlib.md5(photo.read_bytes()).digest()
            if digest in seen:
                continue
            seen.add(digest)
            photos.append(photo)
    return photos


def convert(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
        image.thumbnail((1600, 1600))
        image.save(target, 'WEBP', quality=86, method=6)


folders = sorted(path for path in SOURCE.iterdir() if path.is_dir() and not path.name.startswith('._'))
assert len(folders) == 18, f'Unexpected Curing Light folder count: {len(folders)}'
by_model = defaultdict(list)
for folder in folders:
    specs = source_lines(folder, '04')
    model = next(line.split(':', 1)[1].strip() for line in specs if line.startswith('Model:'))
    by_model[model].append(folder)
assert len(by_model) == 12, f'Unexpected unique Curing Light model count: {len(by_model)}'

catalog = []
for model, model_folders in by_model.items():
    preferred_name = PREFERRED_TEXT_FOLDER.get(model)
    text_folder = next((folder for folder in model_folders if folder.name == preferred_name), model_folders[0])
    photo_name = PREFERRED_PHOTO_FOLDER.get(model, text_folder.name)
    photo_folders = sorted(model_folders, key=lambda folder: (folder.name != photo_name, folder.name))

    hero = source_lines(text_folder, '01')
    selling = source_lines(text_folder, '02')
    feature = source_lines(text_folder, '03')
    specs_text = source_lines(text_folder, '04')
    assert hero[0] in GROUP_ORDER and len(hero) >= 4, model
    assert selling[0] == 'KEY SELLING POINTS' and feature[0] == 'FEATURES', model
    assert specs_text[0] == 'TECHNICAL SPECIFICATIONS', model
    for folder in model_folders:
        assert source_lines(folder, '01')[0] == hero[0], (model, folder)
        assert source_lines(folder, '04')[2:] == specs_text[2:], (model, folder)

    specs = []
    for line in specs_text[2:]:
        assert ':' in line, (model, line)
        label, value = [part.strip() for part in line.split(':', 1)]
        if label != 'Model':
            specs.append({'label': label, 'value': value})
    assert specs, model
    slug = slugify(model)

    photos = merged_images(photo_folders, '01_*/01_*/*', model)
    assert photos, f'Missing main product photos: {model}'
    if model in PREFERRED_HERO_NUMBER:
        preferred_index = PREFERRED_HERO_NUMBER[model] - 1
        assert preferred_index < len(photos), model
        photos.insert(0, photos.pop(preferred_index))
    removed_numbers = REMOVED_GALLERY_NUMBERS.get(model, set())
    assert all(1 <= number <= len(photos) for number in removed_numbers), model
    photos = [photo for index, photo in enumerate(photos, 1) if index not in removed_numbers]
    gallery = []
    for index, photo in enumerate(photos, 1):
        name = f'{slug}-gallery-{index:02d}.webp'
        convert(photo, MEDIA / slug / name)
        gallery.append(f'/images/products/curing-light/{slug}/{name}')

    features = numbered_points(feature, 'features')
    feature_photos = merged_images(photo_folders, '03_*/共享盘*/*', model)
    if model not in TEXT_ONLY_FEATURES and len(feature_photos) >= 4:
        for index, photo in enumerate(feature_photos[:4], 1):
            name = f'{slug}-feature-{index:02d}.webp'
            convert(photo, MEDIA / slug / name)
            features[index - 1]['image'] = f'/images/products/curing-light/{slug}/{name}'

    video_files = [path for folder in model_folders for path in folder.glob('05_*/*.mp4') if not path.name.startswith('._')]
    video_path = None
    if video_files and model not in DISABLED_VIDEOS:
        assert len({hashlib.md5(path.read_bytes()).digest() for path in video_files}) == 1, model
        VIDEO.mkdir(parents=True, exist_ok=True)
        target = VIDEO / f'{slug}.mp4'
        shutil.copyfile(video_files[0], target)
        video_path = f'/videos/products/curing-light/{slug}.mp4'

    catalog.append({
        'model': model,
        'slug': slug,
        'group': hero[0],
        'title': hero[1],
        'subtitle': hero[2],
        'summary': hero[3],
        'specs': specs,
        'gallery': gallery,
        'thumbnail': gallery[0],
        'sellingHeading': selling[1],
        'sellingPoints': numbered_points(selling, 'selling'),
        'featureHeading': feature[1],
        'features': features,
        'video': video_path,
    })

assert len({item['slug'] for item in catalog}) == len(catalog), 'Duplicate product route'
catalog.sort(key=lambda item: (GROUP_ORDER.index(item['group']), item['model'].lower()))
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
used_media = {
    PROJECT / 'public' / path.lstrip('/')
    for item in catalog
    for path in [*item['gallery'], *(feature['image'] for feature in item['features'] if 'image' in feature)]
}
for path in MEDIA.rglob('*.webp'):
    if path not in used_media:
        path.unlink()
used_videos = {PROJECT / 'public' / item['video'].lstrip('/') for item in catalog if item['video']}
if VIDEO.exists():
    for path in VIDEO.glob('*.mp4'):
        if path not in used_videos:
            path.unlink()
print(f'Imported {len(catalog)} curing-light products from {len(folders)} folders, {sum(len(item["gallery"]) for item in catalog)} gallery photos, and {sum(sum("image" in feature for feature in item["features"]) for item in catalog)} feature photos to {DATA}')
