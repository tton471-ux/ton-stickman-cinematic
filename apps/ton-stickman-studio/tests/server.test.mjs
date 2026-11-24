import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:net';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const app=path.resolve(here,'..');
async function freePort(){const s=createServer();await new Promise(r=>s.listen(0,'127.0.0.1',r));const port=s.address().port;await new Promise(r=>s.close(r));return port}
test('Studio local API smoke test',async t=>{
 const port=await freePort(), projects=fs.mkdtempSync(path.join(os.tmpdir(),'ton-studio-test-'));
 const child=spawn(process.execPath,[path.join(app,'server.mjs')],{cwd:app,env:{...process.env,TON_STUDIO_PORT:String(port),TON_PROJECTS_DIR:projects},stdio:'ignore'});
 const base=`http://127.0.0.1:${port}`;
 t.after(()=>{child.kill();fs.rmSync(projects,{recursive:true,force:true})});
 let ready=false;
 for(let i=0;i<60;i++){try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}
 assert.equal(ready,true,'server should start on loopback');
 const health=await (await fetch(base+'/api/health')).json();
 assert.equal(health.ok,true);
 const styles=await (await fetch(base+'/api/styles')).json();
 assert.equal(styles.modelEngine.length,8);
 assert.equal(styles.codeEngine.length,7);
 const bad=await fetch(base+'/api/jobs',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({command:'shell'})});
 assert.equal(bad.status,400,'unlisted commands must be rejected');
 const cross=await fetch(base+'/api/jobs',{method:'POST',headers:{'content-type':'application/json',origin:'https://example.com'},body:JSON.stringify({command:'doctor'})});
 assert.equal(cross.status,400,'cross-origin POST must be rejected');
 const listing=await (await fetch(base+'/api/projects')).json();
 assert.deepEqual(listing.items,[]);
});
