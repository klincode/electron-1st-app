//hidden window
// po dodaniu itema z url'em strony, uruchom poniższą wyeksportowaną funkcję.
//otworz okno ze stroną , pobierz tytuł i zrób jej scereen

const {BrowserWindow} = require('electron')

let offScreenWindow

module.exports = (url,callback) =>{
  offScreenWindow = new BrowserWindow({
    width:500,
    height:500,
    show:false,
    webPreferences:{
      offscreen:true
    }
  })

  //laod url
  offScreenWindow.loadURL(url);
  //wiat for content finish load
  offScreenWindow.webContents.on('did-finish-load',()=>{
    //get page title
    let title = offScreenWindow.getTitle();

    //get screenshot (thumbnaki)
    offScreenWindow.webContents.capturePage().then(image =>{
      //get image as data url
      let screenshot = image.toDataURL();

      //execute callback with new itemo object
      //wykonaj callback czyli wyślij komunikat zwrotny do htmla
      callback({title,screenshot,url})

      //clan up
      offScreenWindow.close();
      offScreenWindow = null;
    })
  })
}