myApp.controller('loginCtrl', ['$scope','musicapi', function ($scope,musicapi) {
	Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");
	 var checkdatareturn2 = true;
	 $scope.login_username = 'jhl';
	 $scope.login_pass = 'jhl';

	 var currentUser = Parse.User.current();
		if (currentUser) {
		    location.replace("#/chat");
		    console.log("login");
		} else {
		    // show the signup or login page		    
		}



	 $scope.login=function(){ 
	 	Parse.User.logIn($scope.login_username, $scope.login_pass, {
		  success: function(user) {
		    // Do stuff after successful login.
		    // location.replace("#/search");
		    location.replace("#/chat");
		    $scope.add(Parse.User.current());

		  },
		  error: function(user, error) {
		    $scope.warn = true;
		    $scope.$apply();
		  }
		});	
	  }	

	$scope.add = function(user){
	    var query = new Parse.Query(Parse.Role);
	      query.contains("name",'user');
	     query.find({  
	      success: function(results) {
	        results[0].getUsers().add(Parse.User.current());
	        results[0].save();
	        console.log("ADD USER");
	       	location.replace("#/chat");
	      },
	      error: function(error) {
	      	location.replace("#/chat");
	        // alert("Error: " + error.code + " " + error.message);
	      }
	   });
 	}  


	 // $scope.test2 = function(){
	 // 	var roleACL = new Parse.ACL();
		// roleACL.setPublicReadAccess(true);
		// var role = new Parse.Role("user2", roleACL);
		// role.getUsers().add("rootadmin");
		// role.save();
	 //  }	

	 //  $scope.login=function(){ 	
		// var GameScore = Parse.Object.extend("Userdata");
		// var query = new Parse.Query(GameScore);
		// console.log($scope.login_pass);
		// query.equalTo("email", $scope.login_email);
		// query.equalTo("pass", $scope.login_pass);
		// if (checkdatareturn2) {
		// 	checkdatareturn2 = false;
		// 	query.find({
		// 	  success: function(results) {
		// 	  	checkdatareturn2 = true;
		// 	  	console.log(results);
		// 	  	console.log(isEmpty(results));
		// 	  	if (isEmpty(results)) {
		// 	  		console.log("sorry");
		// 	  		$scope.warn = true;
		// 	  		$scope.$apply();
		// 	  	}else{
		// 	  		location.replace("#/search");
		// 	  	};
		// 	  },
		// 	  error: function(error) {
		// 	    alert("Error: " + error.code + " " + error.message);
		// 	  }
		// 	});
		// }
	 //  }

	 //  function isEmpty(obj)
		// {
	 //    for (var name in obj) 
	 //    {
	 //        return false;
	 //    }
	 //    return true;
		// };


}]);