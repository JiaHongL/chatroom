myApp.controller('signCtrl', ['$scope', function ($scope) {
	Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");
	var checkdatareturn = true;

  $scope.sign=function(){ 
    var user = new Parse.User();
    user.set("username", $scope.sign_username);
    user.set("password", $scope.sign_pass);
    user.set("email", $scope.sign_email);
     
    // other fields can be set just like with Parse.Object
    // user.set("phone", "415-392-0202");
    
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
         location.replace("#/login");
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        $scope.warn = true ;
        $scope.$apply();
      }
    });
  }

  // $scope.sign=function(){ 
  //   console.log("sign");
  //   console.log($scope.sign_email);
  //   var GameScore = Parse.Object.extend("Userdata");
  // 	var query = new Parse.Query(GameScore);
  // 	query.equalTo("email", $scope.sign_email);
  // 	if (checkdatareturn){
  //       checkdatareturn=false;
  //       query.find({
  //         success: function(results) {
  //           console.log(isEmpty(results));
  //           if( isEmpty(results) == true){
  //             console.log("ok");
  //             $scope.dosign();
  //             checkdatareturn = true;
  //           }else{
  //             $scope.warn = true ;
  //             console.log("sorry");
  //             $scope.$apply();
  //             checkdatareturn =true;
  //           }
  //         },
  //         error: function(error) {
  //           alert("Error: " + error.code + " " + error.message);
  //         }
  //       });
  //     }
  // }



 //  $scope.dosign=function(){ 
 //    var TestObject = Parse.Object.extend("Userdata");
 //    var testObject = new TestObject();
 //      testObject.save({username:$scope.sign_username,email: $scope.sign_email,pass:$scope.sign_pass}, {

 //      success: function(object) {
 //       console.log("success");
 //       location.replace("#/login");
 //      },
 //      error: function(model, error) {
 //       console.log("error");
 //      }
 //    });
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