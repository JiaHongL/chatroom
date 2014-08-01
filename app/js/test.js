myApp.controller('testCtrl', ['$scope', function ($scope) {
	Parse.initialize("NmpohwL2F6HY2ekvFOhvgI4yla69szhDJ27jnZKS", "UnB0zyLH34p6zQkBzECUCxhka99WG2eOJpTsLrzC");

     // root
     //  var roleACL = new Parse.ACL();
     // roleACL.setPublicReadAccess(true);
     // roleACL.setPublicWriteAccess(true);
     // var role = new Parse.Role("root", roleACL);
     //  role.save(); 

     // user
      var roleACL = new Parse.ACL();
     roleACL.setPublicReadAccess(true);
     roleACL.setPublicWriteAccess(true);
     var role = new Parse.Role("user", roleACL);
      role.save();

   // var query = new Parse.Query(Parse.User);
   //    query.contains("username",'user2');
   //    // query.contains("name",'user');
   //   query.find({
   //    success: function(results) {
   //     // console.log(results);
   //     $scope.add(results);
   //    },
   //    error: function(error) {
   //      alert("Error: " + error.code + " " + error.message);
   //    }
   // });  

      

   // $scope.add = function(user){
   //    var query = new Parse.Query(Parse.Role);
   //      query.contains("name",'read_note_role');
   //      // query.contains("name",'user');
   //     query.find({  
   //      success: function(results) {
   //       // console.log(results[0].changed.roles);
   //       // console.log(typeof(user));
   //       // console.log(results[0].changed.ACL.permissionsById);
   //        // results[0].getUsers().remove(user);
   //        results[0].getUsers().add(Parse.User.current());
   //        results[0].save();
   //      },
   //      error: function(error) {
   //        alert("Error: " + error.code + " " + error.message);
   //      }
   //   });
   // }  
   // $scope.add();

    $scope.username = Parse.User.current().attributes.username;
    var query = new Parse.Query(Parse.User);
     // query.contains("username",'rootadmin');
       query.find({  
        success: function(results) {
          // console.log(results[0]._serverData.username);
          // console.log(results);
          $scope.names = results;
          $scope.$apply();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
     });


    var query = new Parse.Query(Parse.Role);
       query.find({  
        success: function(results) {
          // console.log(results);
          $scope.names2 = results;
          $scope.$apply();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
     }); 


    var query = new Parse.Query(Parse.Role);
    query.contains("name",'read_note_role');
       query.find({  
        success: function(results) {
          // console.log(results.getUsers());
          // var moderators = results;
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
     }); 


     var Note = Parse.Object.extend("Note");
      var query = new Parse.Query(Note);  
       query.find({  
        success: function(results) {
          // console.log(results);
          if (isEmpty(results)){
          }else{
            $scope.names3 = results;
            // $scope.note = results[0].attributes.content;
            $scope.$apply();  
          }
                  },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
     });

    

    $scope.getnote = function(){ 
      var Note = Parse.Object.extend("Note");
      var query = new Parse.Query(Note);  
       query.find({  
        success: function(results) {
          console.log(results);
          if (isEmpty(results)){
            $scope.note = "sorry,you don't read";
            $scope.$apply();  
          }else{
            $scope.note = results[0].attributes.content;
            $scope.$apply();  
          }
                  },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
     });
    }

    $scope.logOut = function(){ 
      Parse.User.logOut();
        location.replace("#/login");
    }
// Parse.User.logOut();

  
  function isEmpty(obj)
  {
    for (var name in obj) 
    {
        return false;
    }
    return true;
  };




}]);