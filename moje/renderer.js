const electron = require('electron');
const ipc = electron.ipcRenderer;


const btn = document.getElementById('btn');
btn.addEventListener('click',()=>{
  ipc.send('klikniecie');
})

ipc.on('feedback',(e,payload)=>{
  console.log(payload);
})