(function() {
    "use strict";
    angular.module("core")
    .constant('Title', {
      value: 'Simple example of Angularjs 1.7'
    })
    .controller("CoreCtrl", ["Title", CoreCtrl]);
    function CoreCtrl(Title) {      
      this.title = Title.value;      
      angular.element(document).ready( () => {});     
    }
  })();