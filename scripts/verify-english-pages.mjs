import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const {plannedRows,allRows}=JSON.parse(await fs.readFile('outputs/guccidental-url-20260907/inventory.json','utf8'));
const planned=plannedRows.filter(p=>p.status==='当前构建未生成');
const errors=[];let links=0,assets=0;
for(const p of planned){
 const file=path.join(root,'dist',p.path,'index.html');
 let html;try{html=await fs.readFile(file,'utf8');}catch{errors.push('Missing page '+p.path);continue;}
 if((html.match(/<h1\b/g)||[]).length!==1)errors.push('H1 '+p.path);
 if(!html.includes('href="'+p.url+'"'))errors.push('Canonical '+p.path);
 if(/hreflang="(?:es|fr|de|it|pt|ar|ru|ro)"/.test(html))errors.push('Missing translation advertised '+p.path);
 const main=html.match(/<main>([\s\S]*?)<\/main>/)?.[1]||'';
 for(const m of main.matchAll(/(?:href|src)="([^"<>]+)"/g)){
  const value=m[1].replace(/^https:\/\/media\.guccidental\.com(?=\/)/,'');if(!value.startsWith('/')&&!value.startsWith('#'))continue;
  const url=new URL(value,'https://design.guccidental.com'+p.path);
  let target;
  if(url.pathname.startsWith('/en/')){target=path.join(root,'dist',url.pathname,'index.html');links++;}
  else{target=path.join(root,'public',decodeURIComponent(url.pathname));assets++;}
  try{await fs.access(target);if(url.hash && target.endsWith('index.html')){const dest=await fs.readFile(target,'utf8');if(!dest.includes('id="'+decodeURIComponent(url.hash.slice(1))+'"'))errors.push('Missing anchor '+p.path+' -> '+value);}}catch{errors.push('Broken link '+p.path+' -> '+value);}
 }
}
for(const row of allRows){try{await fs.access(path.join(root,'dist',row.path,'index.html'));}catch{errors.push('Existing route lost '+row.path);}}
console.log(JSON.stringify({planned:planned.length,checkedInternalLinks:links,checkedLocalAssets:assets,existingRoutes:allRows.length,errors},null,2));
if(errors.length)process.exitCode=1;
