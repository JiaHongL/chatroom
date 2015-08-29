myApp.controller('chatCtrl', ['$scope','musicapi', function ($scope,musicapi) {
  
  Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");
 	$scope.username = Parse.User.current().attributes.username;
 	$scope.chat=function(){ 
 		musicapi.showchat().then(function(res){
			// $("#message").text('');
      $scope.mes='';
			var results = res.data;
			for(var i in results) {
			   inmessage = results[i].name + " : " + results[i].content;
               if (i==0){
                    // $("#message").text(inmessage);
                    $scope.mes = results[i].name + " : " + results[i].content +'\n';
               }
               else{
                    $scope.mes = $scope.mes + results[i].name + " : " + results[i].content +'\n';
               }
			   
			}
			document.getElementById("message").scrollTop = document.getElementById("message").scrollHeight;
		});
	}
    $scope.chat();
        
    $scope.upuserlist=function(data){
        var results = data;
        // console.log(results);
        $("#message2").text('');
        for(var i in results) {
               $("#message2").text($("#message2").text()+"\n"+results[i]);
               $scope.$apply();
            }
    }

	$scope.addchat=function(){
        if ($scope.chattext!== '' && $scope.chattext!==undefined){
             // inmessage = $scope.username + " : " + $scope.chattext;
            // $("#message").text($("#message").text()+"\n"+inmessage);
            $scope.mes= $scope.mes  + $scope.username + " : " + $scope.chattext +'\n' ;
            document.getElementById("message").scrollTop = document.getElementById("message").scrollHeight;   
            var newcat = $scope.chattext;
            var temp = {"name":$scope.username,"content":$scope.chattext};
            socket.emit('addchat',temp);
            $scope.chattext = '';
            musicapi.addchat($scope.username,newcat).then(function(res){
                console.log("create success");      
            });
        }

	}

	$scope.logOut = function(){
        socket.disconnect();  
        Parse.User.logOut();
        location.replace("#/login");
         window.location.reload();
         $scope.$apply();
    }


    $scope.goto = function(){
        // isonline = false;
        // socket.disconnect();  
        location.replace("#/onebyone");
    }

    $scope.if_online = function(){ 
        if (isonline==false) {
          isonline = true;  
          socket.emit('people-onlin',$scope.username);
        }else{
            socket.emit('people-onlin2',$scope.username);  
        };
    }



    var socket = io.connect('https://chatroom12.herokuapp.com');
    
    
    $scope.if_online();
    socket.on('hi',function(data){
        $scope.chat();
        $scope.$apply();
        // console.log(data);
    });

    socket.on('update',function(data){
        var results = data;
        // inmessage = results.name + " : " + results.content;
        // $("#message").text($("#message").text()+"\n"+inmessage);
        $scope.mes = $scope.mes + results.name + " : " + results.content +"\n" ;
        console.log('update');
        console.log($scope.mes);
        document.getElementById("message").scrollTop = document.getElementById("message").scrollHeight;
        $scope.$apply();
    });

    socket.on('upuser',function(data){
        $scope.upuserlist(data);
    }); 

     socket.on('mymessage',function(data,id,name){
        // console.log('to_name:' + checkname);
        if(name == checkname)
        {
          // $("#message").text($("#message").text() + "\n" + name +":"+ data);
          // console.log('one11');
        }
        else if(name !== checkname)
        {
          toastr.remove();  
          console.log('one2');
          toastr.options = {
            "closeButton": false,
            "debug": true,
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