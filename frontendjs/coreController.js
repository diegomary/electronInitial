(function() {
    "use strict";
    angular.module("core")
    .constant('Title', {
      value: 'Simple example of Angularjs 1.7'
    })
    .controller("CoreCtrl", ["Title", CoreCtrl]);
    function CoreCtrl(Title) {      
      this.title = Title.value;      
      angular.element(document).ready( () => {


        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        var renderer = require('electron').ipcRenderer;
        renderer.on('vdone', (event, message) => {
          editor.session.setMode("ace/mode/text");           
          editor.setValue(message);
          editor.clearSelection(); 
        })
        renderer.on('htmlchecker', (event, message) => {
          editor.session.setMode("ace/mode/html");           
          editor.setValue(message);
          editor.clearSelection(); 
        })

      });     
    }
  })();