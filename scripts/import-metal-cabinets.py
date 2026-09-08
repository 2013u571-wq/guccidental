"""Import client-approved cabinet copy and media; shared sections are composed in TS."""
from pathlib import Path
from PIL import Image,ImageOps
import re,json
ROOT=Path('/Volumes/TOSHIBA EXT/economic/Dental cabinet')
REPO=Path(__file__).resolve().parents[1]
records=[]; report=[]
def files(d):return sorted(f for f in d.rglob('*') if f.is_file() and not f.name.startswith('._'))
def section(d,n):return next(p for p in d.iterdir() if p.is_dir() and p.name.startswith(n))
def copy(d,n):return next(f for f in files(section(d,n)) if f.suffix=='.txt' and '可用文案' in f.name).read_text().strip()
def image_files(d,n):return [f for f in files(section(d,n)) if f.suffix.lower() in ['.png','.jpg','.jpeg','.webp']]
for d in sorted(ROOT.iterdir()):
 if not d.is_dir() or d.name=='G-A3':continue
 model=re.match(r'[A-Za-z0-9-]+',d.name).group();slug=model.lower()
 dest=REPO/'public/images/products/dental-cabinet'/slug;dest.mkdir(parents=True,exist_ok=True)
 def img(f,name):
  im=ImageOps.exif_transpose(Image.open(f));im.thumbnail((1800,1800));im.save(dest/(name+'.webp'),'WEBP',quality=88)
  return dict(src=f'/images/products/dental-cabinet/{slug}/{name}.webp',width=im.width,height=im.height,label=f'{model} product view {name.split("-")[-1]}',alt=f'{model} dental cabinet {name.replace("-"," ")}')
 gallery=[img(f,f'gallery-{i+1}') for i,f in enumerate(image_files(d,'01'))]
 texts=[copy(d,n).replace(d.name,model) for n in ['01','02','05','06','09']]
 hero,points,specs,case,faq=texts
 blocks=hero.split('\n\n')
 selling=[]
 for b in points.split('\n\n'):
  if re.match(r'\d{2} ',b):
   t,v=b.split('\n',1);selling.append(dict(title=t[3:],description=v))
 specifications=[]
 for l in specs.splitlines():
  if ': ' not in l:continue
  label,value=l.split(': ',1)
  value=value.replace('To confirm from source files','To be confirmed').replace('subject to source materials','confirm the selected configuration')
  specifications.append(dict(label=label,value=value))
 if model=='MQ-Y01':specifications.append(dict(label='Gross weight',value='38 kg'))
 cases=[];caseimgs=image_files(d,'06')
 for b in case.split('\n\n'):
  if re.match(r'\d{2} ',b):
   lines=b.splitlines();t=lines[0][3:];v=lines[1]
   if 'Scene image to confirm' in t:
    t='Organized storage beside the treatment area';v=f'The {model} provides storage for instruments, consumables and everyday clinic accessories, helping keep frequently used items close to the working area.'
   cases.append(dict(src='',width=0,height=0,label=t,alt='',title=t,description=v))
 faqitems=[]
 for b in faq.split('\n\n'):
  if re.match(r'Q\d:',b):
   q,a=b.split('\n',1)
   a=a.replace('Use the collected color and material references','Use the color and material references').replace('CE-related certificate materials are collected where applicable.','Please contact us to confirm the certification documents available for your selected configuration.').replace('Some parameters should be confirmed from the source card, catalog or supplier file before publishing.','Please confirm final dimensions, materials and configuration with our team before ordering.')
   faqitems.append(dict(question=q.split(': ',1)[1],answer=a))
 rec=dict(slug=slug,model=model,title=f'{model} Dental Cabinet',productType=blocks[2],tagline=blocks[3],seoDescription=f'{model} dental cabinet for organized treatment-room storage. Explore product views, finish options, cabinet catalogs and configuration details.',gallery=gallery,quickSpecs=[dict(label='Cabinet type',value='Dental cabinet'),dict(label='Application',value='Treatment-room storage'),dict(label='Finish options',value='Shared cabinet color chart'),dict(label='Configuration',value='Contact us to confirm')],trustHighlights=['Organized clinic storage','Easy-clean work surface','Practical treatment-room layout'],sellingPointHeading=f'Why clinics choose the {model}',sellingPoints=selling,specifications=specifications,caseHeading=f'{model} in finished clinic scenes',caseIntroduction='Explore organized storage for practical dental treatment rooms.',cases=cases,faq=faqitems,caseImage=img(caseimgs[0],'case-1') if caseimgs else None)
 records.append(rec);report.append(dict(model=model,sourceFolder=d.name,galleryImages=len(gallery),caseImages=len(caseimgs),slug=slug))
assert len({r['slug'] for r in records})==len(records)
(REPO/'src/data/metalDentalCabinetModels.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
(REPO/'docs/METAL_CABINET_IMPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print('Imported',len(records),'models;',sum(r['galleryImages'] for r in report),'gallery images;',sum(bool(r['caseImages']) for r in report),'models with case images')
