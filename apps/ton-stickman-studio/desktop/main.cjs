const {app,BrowserWindow,dialog}=require('electron');
const {spawn}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');
const http=require('node:http');
let serverProcess,windowRef;
const port=Number(process.env.TON_STUDIO_PORT||4177);
function waitForServer(attempt=0){return new Promise((resolve,reject)=>{const req=http.get(`http://127.0.0.1:${port}/api/health`,res=>{res.resume();resolve()});req.on('error',()=>{if(attempt>60)return reject(new Error('Core Engine did not start'));setTimeout(()=>waitForServer(attempt+1).then(resolve,reject),300)})})}
async function createWindow(){
 const packaged=app.isPackaged;
 const serverFile=packaged?path.join(process.resourcesPath,'studio','server.mjs'):path.join(__dirname,'..','server.mjs');
 const runtimeRoot=packaged?path.join(process.resourcesPath,'runtime','upstream'):path.resolve(__dirname,'../../../skills/ton-stickman-cinematic/vendor/upstream');
 if(!fs.existsSync(serverFile))throw new Error('Studio server is missing');
 serverProcess=spawn(process.execPath,[serverFile],{env:{...process.env,ELECTRON_RUN_AS_NODE:'1',TON_STUDIO_PORT:String(port),TON_RUNTIME_ROOT:runtimeRoot,...(packaged?{FFMPEG:path.join(process.resourcesPath,'ffmpeg','ffmpeg.exe'),FFPROBE:path.join(process.resourcesPath,'ffmpeg','ffprobe.exe')}:{})},stdio:'ignore',windowsHide:true});
 try{await waitForServer()}catch(e){dialog.showErrorBox('TON Stickman Cinematic',e.message);app.quit();return}
 windowRef=new BrowserWindow({width:1440,height:940,minWidth:980,minHeight:680,backgroundColor:'#0c1018',title:'TON Stickman Cinematic',webPreferences:{contextIsolation:true,nodeIntegration:false,sandbox:true}});
 await windowRef.loadURL(`http://127.0.0.1:${port}`);
 windowRef.on('closed',()=>{windowRef=null});
}
app.whenReady().then(createWindow).catch(e=>dialog.showErrorBox('TON Stickman Cinematic',e.message));
app.on('before-quit',()=>{if(serverProcess&&!serverProcess.killed)serverProcess.kill()});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
