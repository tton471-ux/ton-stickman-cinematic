import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import crypto from 'node:crypto';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.TON_STUDIO_PORT || 4177);
const HOST = '127.0.0.1';
const ROOT = path.resolve(HERE, '../..');
const RUNTIME = process.env.TON_RUNTIME_ROOT || path.join(ROOT, 'skills/ton-stickman-cinematic/vendor/upstream');
const SCRIPT = path.join(RUNTIME, 'scripts/autopilot.mjs');
const PROJECTS = path.resolve(process.env.TON_PROJECTS_DIR || path.join(os.homedir(), 'Documents/TonStickmanProjects'));
const jobs = new Map();
const MIME = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon'};

fs.mkdirSync(PROJECTS, {recursive:true});
const send = (res, status, value, type='application/json; charset=utf-8') => {
  res.writeHead(status, {'content-type':type,'cache-control':'no-store','x-content-type-options':'nosniff'});
  res.end(type.startsWith('application/json') ? JSON.stringify(value) : value);
};
const safeName = value => String(value || '').trim().replace(/[^a-zA-Z0-9_-]/g, '-').replace(/-+/g,'-').slice(0,48);
function projectPath(value) {
  if (typeof value !== 'string' || !value.trim()) throw new Error('Project path is required');
  const target = path.resolve(value);
  if (target !== PROJECTS && !target.startsWith(PROJECTS + path.sep)) throw new Error('Projects must stay inside the TON projects folder');
  return target;
}
function readBody(req) {
  return new Promise((resolve,reject) => {
    let data=''; req.on('data',chunk => { data += chunk; if(data.length > 64*1024) reject(new Error('Request too large')); });
    req.on('end',()=>{ try { resolve(data ? JSON.parse(data) : {}); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error',reject);
  });
}
function runJob(command,args) {
  const id = crypto.randomUUID();
  const job = {id,command,status:'running',startedAt:new Date().toISOString(),finishedAt:null,exitCode:null,stdout:'',stderr:''};
  jobs.set(id,job);
  const child = spawn(process.execPath,[SCRIPT,command,...args],{cwd:RUNTIME,env:{...process.env,FORCE_COLOR:'0'},windowsHide:true});
  child.stdout.on('data,bad',()=>{}); // replaced below
  child.stdout.on('data',chunk=>{job.stdout=(job.stdout+chunk.toString()).slice(-120000);});
  child.stderr.on('data',chunk=>{job.stderr=(job.stderr+chunk.toString()).slice(-120000);});
  child.on('error',error=>{job.status='failed';job.stderr += error.message;job.finishedAt=new Date().toISOString();});
  child.on('close',code=>{job.exitCode=code;job.status=code===0?'succeeded':'failed';job.finishedAt=new Date().toISOString();});
  return job;
}
function assertAllowedOrigin(req) {
  const origin=req.headers.origin;
  if (origin && ![`http://127.0.0.1:${PORT}`,`http://localhost:${PORT}`].includes(origin)) throw new Error('Cross-origin request blocked');
}
const server=http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://127.0.0.1');
    if(req.method==='GET' && url.pathname==='/api/health') return send(res,200,{ok:true,name:'TON Stickman Studio',version:'0.1.0',projectsDir:PROJECTS});
    if(req.method==='GET' && url.pathname==='/api/styles') return send(res,200,{modelEngine:['A1','A2','A3','A4','A5','A6','A7','A8'],codeEngine:['B1','B2','B3','B4','B5','B6','B7'],preferred:['A2','A3','A7','A8','B1']});
    if(req.method==='GET' && url.pathname==='/api/projects') {
      const items=fs.readdirSync(PROJECTS,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>({name:d.name,path:path.join(PROJECTS,d.name),hasManifest:fs.existsSync(path.join(PROJECTS,d.name,'project.json'))}));
      return send(res,200,{items});
    }
    if(req.method==='GET' && url.pathname.startsWith('/api/jobs/')) {
      const job=jobs.get(url.pathname.split('/').pop());
      return job?send(res,200,job):send(res,404,{error:'Job not found'});
    }
    if(req.method==='POST' && url.pathname.startsWith('/api/')) {
      assertAllowedOrigin(req);
      if(!String(req.headers['content-type']||'').includes('application/json')) return send(res,415,{error:'JSON required'});
      const body=await readBody(req);
      if(url.pathname==='/api/projects') {
        const name=safeName(body.name);
        const style=String(body.style||'B1');
        const ratio=String(body.ratio||'16:9');
        if(!name) return send(res,400,{error:'Enter a project name'});
        if(!['B1','B2','B3','B4','B5','B6'].includes(style)) return send(res,400,{error:'Unsupported code-engine style'});
        if(!['16:9','9:16'].includes(ratio)) return send(res,400,{error:'Unsupported aspect ratio'});
        const target=projectPath(path.join(PROJECTS,name));
        if(fs.existsSync(target)) return send(res,409,{error:'A project with this name already exists'});
        return send(res,202,runJob('init',[target,'--style',style,'--ratio',ratio]));
      }
      if(url.pathname==='/api/jobs') {
        const command=String(body.command||'');
        if(!['doctor','workflow','validate','preview','render'].includes(command)) return send(res,400,{error:'Command not allowed'});
        const args=[];
        if(command==='workflow') {
          if(body.style) args.push('--style',String(body.style));
          if(body.ratio) args.push('--ratio',String(body.ratio));
          if(body.project) args.push('--project',projectPath(body.project));
        } else if(command==='validate'||command==='preview'||command==='render') {
          const target=projectPath(body.project);
          if(!fs.existsSync(path.join(target,'project.json'))) return send(res,404,{error:'Project manifest not found'});
          args.push(target);
          if(command==='preview') args.push('--seconds',String(Math.min(60,Math.max(1,Number(body.seconds)||20))));
        } else if(command==='doctor' && body.style) args.push('--style',String(body.style));
        return send(res,202,runJob(command,args));
      }
    }
    if(req.method==='GET') {
      const rel=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname.slice(1));
      const file=path.resolve(HERE,'web',rel);
      if(!file.startsWith(path.resolve(HERE,'web')+path.sep)) return send(res,403,{error:'Forbidden'});
      if(!fs.existsSync(file)||!fs.statSync(file).isFile()) return send(res,404,{error:'Not found'});
      return send(res,200,fs.readFileSync(file),MIME[path.extname(file)]||'application/octet-stream');
    }
    return send(res,404,{error:'Not found'});
  } catch(error) { return send(res,400,{error:error.message||'Request failed'}); }
});
server.listen(PORT,HOST,()=>console.log(`TON Stickman Studio running at http://${HOST}:${PORT}`));
