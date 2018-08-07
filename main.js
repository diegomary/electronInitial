const {app, BrowserWindow,Menu} = require('electron');
const path = require('path');
const url = require('url'); 
const shell = require('electron').shell;
  
  let win;  
  function createWindow () {
   
    win = new BrowserWindow({width: 600, height: 600});   
    win.loadFile('index.html');   
   
    win.on('closed', () => { win = null; })

    var menu = Menu.buildFromTemplate([
      { label :"Tools", submenu : [
          // DevTools
          { label:"Open Dev Tools",click() {
          win.webContents.openDevTools();
          }},
          // Quit
          { label:"Quit",click() {
            app.quit();
          }},
          { type: 'separator'},
          { label:"Diego Website",click() {
            shell.openExternal('https://diegomary.github.io/#/about');
          }},
          // More ....
        ]    
      },
      { label :"Info", submenu : [
       
      ]    
    }
      // More menus
    ]);
    Menu.setApplicationMenu(menu);
  }
  
  
  app.on('ready', createWindow);  
  app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
      app.quit();
    }
  })
  
  app.on('activate', () => { if (win === null) { createWindow(); }});