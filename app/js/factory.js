var $key,$channelId,$youtube_api;
$key = 'AIzaSyCfmi2Rsd5cjHV_-cW0avDqn5Nzq1k7EDA';  // V3 需要key才能使用api
$youtube_api = 'https://www.googleapis.com/youtube/v3'; //youtube api
$channelId ='UCCsUQXwhDj4iVlhG4VCq6Kg';  //測試

var isonline = false;
var checkname = '';
var stoprepeat = false;

myApp.factory('musicParameter',  [
	'$http', function($http) {
		return {
			token: function() {
				var token = undefined;
				return token;
			},		
		};
	}		
]);


myApp.factory('musicapi',  [
	'$http', function($http) {
		return {
			searchdata: function(now_total,part){
				console.log($youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&maxResults="+now_total+"&part="+part+"&type=video");
				return $http({ 		
					url:($youtube_api+"/search?channelId="+$channelId+"&key="+$key+"&maxResults="+now_total+"&part="+part+"&type=video"),
					method: 'get',
				}).then(function(res) {			       
		            return res.data;
				});
			},
			showchat: function(){
				console.log('http://127.0.0.1:3000/showchat');
				return $http({ 		
					url:('https://chatroom12.herokuapp.com/showchat'),
					method: 'get',
				}).then(function(res) {			       
		            return res;
				});
			},
			showonebyonechat: function(name,name2){
				// console.log('http://127.0.0.1:3000/showchat');
				console.log('http://127.0.0.1:3000/showonebyonechat?name='+ name +"&name2=" +name2);
				return $http({ 		
					url:('https://chatroom12.herokuapp.com/showonebyonechat?name='+ name +"&name2=" +name2),
					method: 'get',
				}).then(function(res) {			       
		            return res;
				});
			},
			addchat: function(name,content){
				// http://127.0.0.1:3000/add?name=root&content=testest!
				console.log('http://127.0.0.1:3000/add?name='+ name +'&content=' + content);
				return $http({ 		
					url:('https://chatroom12.herokuapp.com/add?name='+ name +'&content=' + content),
					method: 'get',
				}).then(function(res) {			       
		            return res;
				});
			},
			addonebyonechat: function(name,name2,content){
				// http://127.0.0.1:3000/addonebyone?name=root&name2=ddd&content=testest
				console.log('http://127.0.0.1:3000/add?name='+ name +'&content=' + content);
				return $http({ 		
					url:('https://chatroom12.herokuapp.com/addonebyone?name=' + name + '&name2=' + name2 + '&content=' + content),
					method: 'get',
				}).then(function(res) {			       
		            return res;
				});
			}		
		};
	}		
]);


myApp.factory('musicfunction',  [
	'$http', function($http) {
		return {
			test2: function(a,b) {
				var test = a + b ;
				return test;
			},		
		};
	}		
]);

// <script src="http://localhost:3000/socket.io/socket.io.js"></script>



