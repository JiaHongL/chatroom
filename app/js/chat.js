myApp.controller('chatCtrl', ['$scope','musicapi', function ($scope,musicapi) {
	Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");
 	$scope.username = Parse.User.current().attributes.username;
 	$scope.chat=function(){ 
 		musicapi.showchat().then(function(res){
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

    
    $scope.upuserlist=function(data){
        var results = data;
        $("#message2").text('');
        for(var i in results) {
               $("#message2").text($("#message2").text()+"\n"+results[i]);
               $scope.$apply();
            }
    }

	$scope.addchat=function(){
        if ($scope.chattext!== '' && $scope.chattext!==undefined){
             inmessage = $scope.username + " : " + $scope.chattext;
            $("#message").text($("#message").text()+"\n"+inmessage);
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
        Parse.User.logOut();
        socket.disconnect();
        location.replace("#/login");
    }


    var socket = io.connect('http://localhost:3000');
    socket.emit('people-onlin',$scope.username);
    socket.on('hi',function(data){
        $scope.chat();
        console.log(data);
    });

    socket.on('update',function(data){
        var results = data;
        inmessage = results.name + " : " + results.content;
        $("#message").text($("#message").text()+"\n"+inmessage);
        document.getElementById("message").scrollTop = document.getElementById("message").scrollHeight;
    });

    socket.on('upuser',function(data){
        $scope.upuserlist(data);
    }); 


}]);