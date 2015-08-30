myApp.controller('onebyoneCtrl', ['$scope','musicapi', function ($scope,musicapi) {
	Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");
 	$scope.username = Parse.User.current().attributes.username;
  $scope.userid = ""; 
  $scope.chattex = ""; 
    var socket = io.connect('https://chatroom12.herokuapp.com');

    // socket.emit('people-onlin',$scope.username);
    // socket.disconnect();
    socket.on('upuser2',function(data){
       for(var i=0;i<data.length;i++){
         if(data[i].name == $scope.username ){
              $scope.userid = data[i].id;
          }
        } 
       // console.log(data);
       $scope.userlist = data;
       $scope.$apply();
    });

    $scope.if_online = function(){ 
        if (isonline==false) {
          isonline = true;  
          socket.emit('people-onlin',$scope.username);
        }else{
            socket.emit('people-onlin2',$scope.username);  
        };
    }
        $scope.if_online();

    $scope.gochat = function(id,name){
      $scope.to_name = name; 
      $scope.to_id = id;
      $scope.otheruser = name;
      checkname = name;
      musicapi.showonebyonechat($scope.username,$scope.to_name).then(function(res){
        $scope.mes='';
        var results = res.data;
        for(var i in results) {
           inmessage = results[i].name + " : " + results[i].content;
                 if (i==0){
                      $scope.mes = results[i].name + " : " + results[i].content +'\n';
                      console.log($scope.mes);
                 }
                 else{
                      $scope.mes = $scope.mes + results[i].name + " : " + results[i].content +'\n';
                      // $scope.mes= $("#message").text($("#message").text()+"\n"+inmessage);
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
            // $("#message").text($("#message").text() + "\n" + $scope.username +":"+ $scope.chattext);
            $scope.mes = $scope.mes + $scope.username + " : " + $scope.chattext +'\n'
            // console.log($scope.to_name); 
            // console.log($scope.to_id);
            msg = "text";
            socket.emit('for_someone',$scope.to_id,$scope.chattext,$scope.userid,$scope.username);
            $scope.chattext = "";
        }
        else{
            $scope.chattext = "";
        }

    }

   $scope.logOut = function(){ 
        socket.disconnect();
        Parse.User.logOut();
        socket.emit('disconnect_check');
        location.replace("#/login");
        $scope.$apply();
    }
    
    $scope.goto = function(){
        // isonline = false;
        // socket.disconnect();
        checkname = ''; 
        location.replace("#/chat");
    }
    
    // $(window).resize(function() {
    //     // console.log(1);
    // });

    // console.log(socket);
    socket.on('mymessage',function(data,id,name){
      // console.log('name:' + name);
      // console.log('to_name:' + checkname);

      // console.log('nothing_ooooooooooooooooo');
        if(name == checkname)
        {
          // $scope.mes = $("#message").text() + "\n" + name +":"+ data ;
          $scope.mes = $scope.mes + name + " : " + data +'\n'
          $scope.$apply();
          // $("#message").text($("#message").text() + "\n" + name +":"+ data);
          // console.log(data);
          // console.log($("#message").text());
          // console.log('nothing..................');
        }
        else if(name !== checkname)
        {
          console.log('123123');
          toastr.remove();
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
          toastr.options.preventDuplicates = true;
          toastr.info(name + " has a new message for you");
        } 
    });



    



}]);