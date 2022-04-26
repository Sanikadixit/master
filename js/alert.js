angular.module('myApp', [])
.controller('alertController', function($scope, $http) {
  $scope.name = null;
  $scope.desc = null;
  $scope.webRef = null;
  $scope.index = null;

  // Get data from JSON file
 $http.get('http://127.0.0.1:8080/data.json')
  .then(function(response) {
    $scope.tdata = response.data.data;

    // Push data to JSON file
    $scope.submitData =function(name,desc,webRef){
      if(name != null && desc != null && webRef != null){
        var data = {
          id : $scope.tdata.length + 1,
          name : name,
          description : desc,
          webReference : webRef
        }
        $scope.tdata.push(data);
        var msgcls = document.getElementById("msg")
        msgcls.style.color = "green";
        $scope.msg = "Data Inserted Successfully!";
        $scope.name = "";
        $scope.desc = "";
        $scope.webRef = "";
      }
      else{
        var msgcls = document.getElementById("msg")
        msgcls.style.color = "red";
        $scope.msg = "Insert Valid Data";
        $scope.name = "";
        $scope.desc = "";
        $scope.webRef = "";
      }

    };

    // function to delete a row
    $scope.select = function(i){
      this.index = i;
      $scope.remove = function(){
        console.log(i);
        $scope.tdata.splice(i,1);
      };
    };
    // function to delete all rows
    $scope.selectall = function(i){
      this.index = i;
      $scope.remove = function(){
        console.log(i);
        $scope.tdata.splice(i);
      };
    };

    // Function to open a modal
    $scope.openModal = function(){
      var modal = document.getElementById("modalview");
      var main = document.getElementById("mainpage");
      if(modal.style.display = "none"){
        modal.style.display = "block";
        main.style.opacity = 0.1;
      }
      else{
        modal.style.display = "none";
      }
    };

    // function to close modal
    $scope.closeModal =  function(){
      var modal = document.getElementById("modalview");
      var main = document.getElementById("mainpage");
      if(modal.style.display = "block"){
        modal.style.display = "none";
        main.style.opacity = 1;
      }
      else{
        modal.style.display = "block"
      }
    }
    
    var navbar = document.getElementById("navbar");
    var btn = navbar.getElementsByClassName("tabs");
    for(var i = 0; i <btn.length; i++){
      btn[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    };
  
    // sort table data
    $scope.orderBy = "name";
    $scope.reverseSort = false;   

  });
 
});

