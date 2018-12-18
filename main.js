const {app, BrowserWindow, Menu, dialog,ipcMain } = require('electron');
const path = require('path');
const url = require('url'); 
const shell = require('electron').shell;
const writeFile = require('write');
const express = require('express');
var appexpress = express();

  appexpress.get('/',  (req, res) => {
    res.send('Hello World')
  }); 
  appexpress.listen(3000);
  console.log("Server express listening on http://localhost:3000");
    
  let win;  
  function createWindow () {
   
    win = new BrowserWindow({width: 600, height: 600});   
    win.loadFile('index.html');   
   
    win.on('closed', () => { win = null; })

    var menu = Menu.buildFromTemplate([
      { label :"Tools", submenu : [
          // File Management
          { label:"Create Menu Action", click() {

            dialog.showOpenDialog (
             {  title:"Open File to elaborate",
                securityScopedBookmarks :true,
                properties: ['openFile', 'createDirectory'],
                filters: [                
                {name: 'Javascript Notation Type', extensions: ['json']},
                {name: 'All Files', extensions: ['*']}
              ]
             }, (filePath,bookmarks ) => {

                if(filePath === undefined) return;
                // Here we can elaborate our file
               console.log("Logic here");
               
                dialog.showSaveDialog( {title:"Save file Vocab",filters:[{name: "Vocab Bixby file", extensions:['vocab.6t']}]},
                (filename) => {
                  if(filename === undefined) return;
                  writeFile.sync(filename, total);                                
                  //win.loadFile('vocabdone.html');
                  win.webContents.send('vdone',total);
                });
               }
            );           
     
          }},

          // Addtrainings
          { label:"TODO",click() {
            dialog.showOpenDialog (
              {  title:"Choose File",                
                 properties: ['openFile'],
                 filters: [                
                 {name: 'Executable files', extensions: ['exe']}
               ]
              }, (filePath) => {
                console.log(filePath[0]);
              });              
          }},

          // Html Code checker
          { label:"Html code checker",click() {
            win.webContents.send('htmlchecker',`<!DOCTYPE html>
            <html>
            <head>            
            </head>
            <body>
              <h1>Html checker</h1>
              <p>Paste html in place of this to check tags closure</p>
            </body>
            </html>
            `);
          }},

          // DevTools
          { label:"Open Dev Tools",click() {
          win.webContents.openDevTools();
          }},
          // Quit
          { label:"Quit",click() {
            app.quit();
          }},
          { type: 'separator'},
          { label:"DM88's Website",click() {
            shell.openExternal('https://diegomary.github.io');
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