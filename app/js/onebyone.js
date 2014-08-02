myApp.controller('onebyoneCtrl', ['$scope','musicapi', function ($scope,musicapi) {
	Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");
 	$scope.username = Parse.User.current().attributes.username;
  $scope.userid = "";  
    var socket = io.connect('http://localhost:3000');
    socket.emit('people-onlin',$scope.username);
    socket.on('upuser2',function(data){
       for(var i=0;i<data.length;i++){
         if(data[i].name == $scope.username ){
              $scope.userid = data[i].id;
          }
        } 
       console.log(data);
       $scope.userlist = data;
       $scope.$apply();
    });

    $scope.gochat = function(id,name){
      $scope.to_name = name; 
      $scope.to_id = id;
      $scope.otheruser = name;
      musicapi.showonebyonechat($scope.username,$scope.to_name).then(function(res){
        $("#message").text('');
        var results = res.data;
        for(var i in results) {
           inmessage = results[i].name + " : " + results[i].content;
                 if (i==0){
                      $("#message").text(inmessage);
                 }
                 else{
                      $("#message").text($("#message").text()+"\n"+inmessage);
                 }
           
        }
         document.getElementById("message").scrollTop = document.getElementById("message").scrollHeight;
      });     
    }

     $scope.addchat = function(){
         if ($scope.chattext!== '' && $scope.chattext!==undefined && $scope.otheruser!== '' && $scope.otheruser!==undefined){
            musicapi.addonebyonechat($scope.username,$scope.otheruser,$scope.chattext).then(function(res){
                console.log("create success");      
            });
            $("#message").text($("#message").text() + "\n" + $scope.username +":"+ $scope.chattext);
            console.log($scope.to_name); 
            console.log($scope.to_id);
            msg = "text";
            socket.emit('for_someone',$scope.to_id,$scope.chattext,$scope.userid,$scope.username);
            $scope.chattext = "";
        }
        else{
            $scope.chattext = "";
        }

    }

    socket.on('mymessage',function(data,id,name){
        if(id == $scope.to_id)
        {
          $("#message").text($("#message").text() + "\n" + name +":"+ data);
        }
        else{
          toastr.options = {
            "closeButton": false,
            "debug": false,
            "positionClass": "toast-top-full-width",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
          toastr.info(name + " has a new message for you");
        } 
    });



}]);