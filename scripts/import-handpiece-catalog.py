"""Import the supplied handpiece text and product photos into site assets/data."""
from pathlib import Path
from PIL import Image, ImageOps
import json
import re
import unicodedata

SOURCE = Path('/Volumes/TOSHIBA EXT/未命名文件夹/dental handpiece')
DEST = Path(__file__).resolve().parents[1]
MEDIA = DEST / 'public/images/products/dental-handpiece'
DATA = DEST / 'src/data/handpieceModels.json'

GROUPS = {
    'high-speed': [
        ('45° Surgical', ['45SU', '45TUP']),
        ('LED Turbines', ['FG2-LED', 'FG23', 'J5', 'M2-LED', 'RB-TUP', 'TJ-5L', 'WH5LED']),
        ('Fiber Optic', ['FG68', 'KV8000', 'TJ-PT01']),
        ('Standard Turbines', ['FG33', 'MAX-TUQ-M4', 'ME-SU', 'TJ-C5']),
    ],
    'low-speed': [
        ('Motors & Sets', ['AM01', 'EX-203C', 'L205', 'STU-5手机', 'Ti-205L', 'WH-AM', 'WH-L', 'WH-L3', 'WH-L4', 'WH-L5(6孔光纤低速套装)', 'WH-L6']),
        ('Contra Angles', ['CA01', 'CA02', 'CA03-按压外水道弯机', 'LED-10CA', 'TJ-FCA', 'W15L-精美1：5红色弯机（中性）']),
        ('Straight Handpieces', ['EX-6B', 'SH02', 'TJ-SH03', 'WH-SH']),
        ('Implant & Specialty', ['IPR50', 'TJ-20CA', 'TJ-F20CA', 'TJ-SG45L', 'TL2011']),
    ],
}
SOURCE_PARTS = {'high-speed': 'high speed高速', 'low-speed': 'low speed低速'}
DISPLAY_NAMES = {
    'STU-5手机': 'STU-5',
    'WH-L5(6孔光纤低速套装)': 'WH-L5',
    'CA03-按压外水道弯机': 'CA03',
    'W15L-精美1：5红色弯机（中性）': 'W15L',
}
LOW_SPEED_TRANSPARENT_COVERS = {
    'stu-5', 'ti-205l', 'wh-am', 'wh-l', 'wh-l3', 'wh-l6',
    'ca01', 'led-10ca', 'tj-fca', 'sh02', 'ipr50', 'tj-f20ca',
}

def read_text(path):
    raw = path.read_bytes()
    for encoding in ('utf-8-sig', 'gb18030', 'latin1'):
        try:
            return raw.decode(encoding)
        except UnicodeError:
            continue
    raise ValueError(path)

def slugify(value):
    value = unicodedata.normalize('NFKD', value)
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', value.lower())).strip('-')

def file_from(folder, pattern):
    files = [p for p in folder.glob(pattern) if p.is_file() and not p.name.startswith('._')]
    return sorted(files)[0] if files else None

def parse_spec(path):
    result = []
    for line in read_text(path).splitlines():
        if ':' in line:
            key, value = line.split(':', 1)
            if key.strip() and value.strip() and key.strip() != 'Model':
                result.append({'label': key.strip(), 'value': value.strip()})
    return result

def parse_hero(path):
    lines = [line.strip() for line in read_text(path).splitlines() if line.strip()]
    return next((line for line in lines if line.startswith(('A ', 'An '))), '')

def parse_features(path):
    lines = [line.strip() for line in read_text(path).splitlines() if line.strip()]
    heading = lines[1] if len(lines) > 1 else 'Built around daily handpiece workflows'
    points = []
    for index, line in enumerate(lines):
        if re.match(r'^\d{2}\s+', line) and index + 2 < len(lines):
            points.append({'eyebrow': line.split(' ', 1)[1], 'title': lines[index + 1], 'description': lines[index + 2]})
    return heading, points

def parse_selling_points(path):
    lines = [line.strip() for line in read_text(path).splitlines() if line.strip()]
    heading = lines[1] if len(lines) > 1 else 'Why clinics choose this handpiece'
    points = []
    for index, line in enumerate(lines):
        if re.match(r'^\d{2}\s+', line) and index + 1 < len(lines):
            points.append({'title': line.split(' ', 1)[1], 'description': lines[index + 1]})
    return heading, points

catalog = []
for speed, groups in GROUPS.items():
    root = SOURCE / SOURCE_PARTS[speed]
    actual = {p.name for p in root.iterdir() if p.is_dir()}
    listed = {name for _, names in groups for name in names}
    assert actual == listed, f'{speed}: missing {actual-listed}, extra {listed-actual}'
    for group, names in groups:
        for name in names:
            folder = root / name
            slug = slugify(name)
            spec_file = file_from(folder, '04_*/*.txt')
            hero_file = file_from(folder, '01_*/*.txt')
            feature_file = file_from(folder, '03_*/*.txt')
            selling_file = file_from(folder, '02_*/*.txt')
            assert spec_file and hero_file and feature_file and selling_file, folder
            specs = parse_spec(spec_file)
            feature_heading, features = parse_features(feature_file)
            selling_heading, selling_points = parse_selling_points(selling_file)
            display_name = DISPLAY_NAMES.get(name, name)
            selling_heading = selling_heading.replace(name, display_name)
            assert features and selling_points, folder
            spec_map = {item['label']: item['value'] for item in specs}
            title = spec_map.get('Product type', f'{name} Dental Handpiece')
            summary = parse_hero(hero_file)
            gallery_folder = next(folder.glob('01_*/01_*'), None)
            images = sorted((p for p in gallery_folder.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png') and not p.name.startswith('._')), key=lambda p: p.name) if gallery_folder else []
            if name == '45SU':
                images = [image for image in images if image.name != '04_H6800e988784545.jpg']
            assert images, folder
            gallery = []
            if speed == 'high-speed':
                # The product gallery's first PNG is the hero. Where there is no
                # PNG, a reviewed transparent cutout of the first product photo
                # is supplied as a local WebP asset.
                primary_source = next((image for image in images if image.suffix.lower() == '.png'), images[0])
                hero = MEDIA / speed / slug / f'{slug}-hero.webp'
                hero.parent.mkdir(parents=True, exist_ok=True)
                if primary_source.suffix.lower() == '.png':
                    with Image.open(primary_source) as original:
                        image = ImageOps.exif_transpose(original).convert('RGBA')
                        image.thumbnail((2000, 2000))
                        image.save(hero, 'WEBP', quality=90, method=6)
                else:
                    assert hero.exists(), f'Missing reviewed cutout: {hero}'
                gallery.append('/images/products/dental-handpiece/' + speed + '/' + slug + '/' + hero.name)
                gallery_sources = [image for image in images if image != primary_source][:4]
            else:
                gallery_sources = images[:5]
            for index, source_image in enumerate(gallery_sources, 1):
                filename = f'{slug}-gallery-v2-{index:02d}.webp' if speed == 'high-speed' else f'{slug}-{index:02d}.webp'
                if speed == 'low-speed' and (MEDIA / speed / slug / f'{slug}-gallery-reviewed-{index:02d}.webp').exists():
                    filename = f'{slug}-gallery-reviewed-{index:02d}.webp'
                target = MEDIA / speed / slug / filename
                target.parent.mkdir(parents=True, exist_ok=True)
                if not target.exists():
                    with Image.open(source_image) as original:
                        image = ImageOps.exif_transpose(original)
                        image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
                        image.thumbnail((1600, 1600))
                        image.save(target, 'WEBP', quality=82, method=5)
                gallery.append('/images/products/dental-handpiece/' + speed + '/' + slug + '/' + target.name)
            if name in ('AM01', 'L205', 'EX-6B'):
                cutout_name = {'AM01': 'am01-hero-cutout.webp', 'L205': 'l205-hero-fifth-cutout.webp', 'EX-6B': 'ex-6b-hero-cutout.webp'}[name]
                cutout = MEDIA / speed / slug / cutout_name
                assert cutout.exists(), f'Missing reviewed product cutout: {cutout}'
                cutout_url = '/images/products/dental-handpiece/' + speed + '/' + slug + '/' + cutout_name
                gallery = [cutout_url] + (gallery[:4] if name == 'L205' else gallery[1:])
            elif name == 'STU-5手机':
                gallery = [gallery[2]] + gallery[:2] + gallery[3:]
            elif name == 'W15L-精美1：5红色弯机（中性）':
                selected_name = 'w15l-1-5-hero-selected.webp'
                selected = MEDIA / speed / slug / selected_name
                assert selected.exists(), f'Missing selected product photo: {selected}'
                gallery[0] = '/images/products/dental-handpiece/' + speed + '/' + slug + '/' + selected_name
            elif name in ('WH-SH', 'IPR50'):
                selected_name = 'wh-sh-hero-selected.webp' if name == 'WH-SH' else 'ipr50-hero-selected.webp'
                selected = MEDIA / speed / slug / selected_name
                assert selected.exists(), f'Missing selected product photo: {selected}'
                gallery[0] = '/images/products/dental-handpiece/' + speed + '/' + slug + '/' + selected_name
            elif name == 'TJ-20CA':
                selected_names = [f'tj-20ca-gallery-selected-{index:02d}.webp' for index in range(1, 6)]
                for selected_name in selected_names:
                    assert (MEDIA / speed / slug / selected_name).exists(), f'Missing selected product photo: {selected_name}'
                gallery = ['/images/products/dental-handpiece/' + speed + '/' + slug + '/' + selected_name for selected_name in selected_names]
            elif name == 'TJ-SG45L':
                for index in (3, 5):
                    selected_name = f'tj-sg45l-gallery-selected-{index:02d}.webp'
                    assert (MEDIA / speed / slug / selected_name).exists(), f'Missing selected product photo: {selected_name}'
                    gallery[index - 1] = '/images/products/dental-handpiece/' + speed + '/' + slug + '/' + selected_name
            elif name in ('WH-AM', 'WH-L5(6孔光纤低速套装)'):
                extra_name = 'wh-am-gallery-extra-07.webp' if name == 'WH-AM' else 'wh-l5-6-gallery-extra-box.webp'
                extra = MEDIA / speed / slug / extra_name
                assert extra.exists(), f'Missing selected product photo: {extra}'
                if name != 'WH-AM':
                    gallery = gallery[1:]
                gallery.append('/images/products/dental-handpiece/' + speed + '/' + slug + '/' + extra_name)
            feature_folder = next(folder.glob('03_*/共享盘功能细节图'), None)
            if name in ('FG23', 'J5'):
                feature_folder = next(folder.glob('02_*/共享盘卖点素材'), None)
            feature_sources = sorted((p for p in feature_folder.iterdir() if p.suffix.lower() in ('.jpg', '.jpeg', '.png') and not p.name.startswith('._')), key=lambda p: p.name) if feature_folder else []
            if name == '45SU':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name[filename] for filename in ['01_IMG_1395.png', '02_H6800e988784545.jpg', '03_10.jpg', '04_03.jpg']]
            elif name == '45TUP':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name[filename] for filename in ['05_04.jpg', '06_IMG_1648.png', '07_IMG_1629.png', '08_IMG_1651.png']]
            elif name == 'FG23':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name[filename] for filename in ['01_FG23.png', '02_08.jpg', '03_10.jpg', '04_06.jpg']]
            elif name == 'J5':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name[filename] for filename in ['01_J5不死灯风光-1000.jpg', '02_J5不死灯风光-1-750.jpg', '03_J5.png', '04_J5-01.jpg']]
            elif name == 'M2-LED':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name[filename] for filename in ['01_08.jpg', '03_05.jpg', '04_04.jpg', '05_09.jpg']]
            elif name == 'RB-TUP':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name['03_三喷彩色(color code).jpg']]
            elif name == 'WH-L5(6孔光纤低速套装)':
                feature_by_name = {source.name: source for source in feature_sources}
                feature_sources = [feature_by_name[filename] for filename in ['02_人体工学.jpg', '05_画板 3 拷贝 2.jpg', '06_画板 3 拷贝 3.jpg', '07_画板 3 拷贝 4.jpg']]
            feature_images = []
            for index, source_image in enumerate(feature_sources[:4], 1):
                if name in ('WH5LED', 'FG68', 'FG33', 'ME-SU'):
                    target = MEDIA / speed / slug / f'{slug}-feature-cutout-{index:02d}.webp'
                    assert target.exists(), f'Missing reviewed feature cutout: {target}'
                    feature_images.append('/images/products/dental-handpiece/' + speed + '/' + slug + '/' + target.name)
                    continue
                with Image.open(source_image) as original:
                    has_alpha = 'A' in original.getbands()
                filename = f'{slug}-feature-numbered-{index:02d}.webp' if name == '45SU' else f'{slug}-feature-selected-{index:02d}.webp' if name in ('45TUP', 'FG23', 'J5', 'M2-LED', 'RB-TUP', 'WH-L5(6孔光纤低速套装)') else f'{slug}-feature-{index:02d}-alpha.webp' if has_alpha else f'{slug}-feature-{index:02d}.webp'
                target = MEDIA / speed / slug / filename
                if not target.exists():
                    with Image.open(source_image) as original:
                        image = ImageOps.exif_transpose(original).convert('RGBA' if has_alpha else 'RGB')
                        if name == '45SU' and index == 1:
                            image.save(target, 'WEBP', lossless=True, method=6)
                        else:
                            image.thumbnail((1400, 1400))
                            image.save(target, 'WEBP', quality=82, method=5)
                feature_images.append('/images/products/dental-handpiece/' + speed + '/' + slug + '/' + target.name)
            for index, feature in enumerate(features):
                feature['image'] = (feature_images or gallery)[index % len(feature_images or gallery)]
            thumbnail = gallery[1] if name == 'J5' else gallery[0]
            if speed == 'low-speed' and slug in LOW_SPEED_TRANSPARENT_COVERS:
                cover_name = f'{slug}-category-cutout.webp'
                assert (MEDIA / speed / slug / cover_name).exists(), f'Missing transparent category cover: {cover_name}'
                thumbnail = '/images/products/dental-handpiece/' + speed + '/' + slug + '/' + cover_name
            catalog.append({'model': display_name, 'slug': slug, 'speed': speed, 'group': group, 'title': title, 'summary': summary, 'specs': specs, 'gallery': gallery, 'thumbnail': thumbnail, 'sellingHeading': selling_heading, 'sellingPoints': selling_points, 'featureHeading': feature_heading, 'features': features})
DATA.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Imported {len(catalog)} models and {sum(len(item["gallery"]) for item in catalog)} images to {DATA}')
