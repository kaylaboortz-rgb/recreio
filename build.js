// Builds index.html from src/head.html + data/camps.json + src/tail.html.
// Run: node build.js
const fs=require('fs'),p=require('path');
const C=JSON.parse(fs.readFileSync(p.join(__dirname,'data/camps.json'),'utf8'));
const head=fs.readFileSync(p.join(__dirname,'src/head.html'),'utf8');
const tail=fs.readFileSync(p.join(__dirname,'src/tail.html'),'utf8');
const title=head.match(/<title>.*?<\/title>/)[0];
const data='const CAMPS=[\n'+C.map(c=>JSON.stringify(c)).join(',\n')+'\n];\n';
const page='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="description" content="Find school-holiday camps around Lisbon, Cascais, Sintra, Oeiras and Almada by your dates.">\n'+title+'\n</head>\n<body>\n'+head.replace(title,'')+data+tail+'\n</body>\n</html>\n';
fs.writeFileSync(p.join(__dirname,'index.html'),page);
console.log('Built index.html with',C.length,'camps');
