var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var express = require('express');
var app = express();
app.set('port',3000);



var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://root:root@ds047948.mongolab.com:47948/chatdb');

var Schema = mongoose.Schema;
var chatSchema = new Schema({
  name: String,
  content: String
});
mongoose.model('chat', chatSchema);
var ChatModel = mongoose.model('chat');


var chatSchema2 = new Schema({
  name: String,
  name2: String,
  content: String,
  time:Date 
});
mongoose.model('onebyonechat', chatSchema2);
var ChatModel2 = mongoose.model('onebyonechat');

// var dt=new Date();
// new ChatModel2({ name:'user11',name2:'user2',content:'other',time:dt}).save();

var http = require('http').createServer(function (request, response) { 
	var pathname = url.parse(request.url).pathname;
	var qs = querystring.parse(url.parse(request.url).query);
	// console.log('Received' + pathname + 'request.');
	var routes = {
		'/':function(request,response){	
			response.writeHead(200,{'Content-Type':'text/plain',
    		"Access-Control-Allow-Origin":"*"});
			response.write('hello World');
			response.end();
		},
		'/abc':function(request,response){
			 var type = 'text/plain';
			 var output = 'test123';
			 // http://127.0.0.1:3000/abc?format=json
			 if(typeof qs.format !== 'undefined' && qs.format === 'json'){
				type = 'application/json';
				output = JSON.stringify({id:'01',name:'adnim',content:'testchat'});		 	
			 }
			 // http://127.0.0.1:3000/abc?format=html
			 else if(typeof qs.format !== 'undefined' && qs.format === 'html') {
			 	var html = fs.readFileSync('./return.html');
			 	type = 'text/html';
			 	output = html;
			 }
			response.writeHead(200,{'Content-Type':type,
    		"Access-Control-Allow-Origin":"*"});
			response.write(output);
			response.end();
		},
		'/showchat':function(request,response){
			ChatModel.find({}, function(err, results) {
				response.writeHead(200,{'Content-Type':'application/json',
	    		"Access-Control-Allow-Origin":"*"});
	    		output = JSON.stringify(results);
				response.write(output);
				response.end();
			});	
		},
		'/showonebyonechat':function(request,response){
			// qs.name qs.name2
			if(typeof qs.name !== 'undefined' && qs.name !== '' 
				&&  qs.name2 !== 'undefined' && qs.name2 !== ''){
				ChatModel2.find(
					{ $and: [ {'name':{$in:[qs.name,qs.name2]}},{'name2':{$in:[qs.name,qs.name2]}} ] })
					.sort({'time':1}).exec(function(err,results){
					response.writeHead(200,{'Content-Type':'application/json',
		    		"Access-Control-Allow-Origin":"*"});
		    		output = JSON.stringify(results);
					response.write(output);
					response.end();
				});
			}
			else 
			{
				response.writeHead(200,{'Content-Type':'application/json',
	    		"Access-Control-Allow-Origin":"*"});
	    		output = JSON.stringify({message:'something error'});
				response.write(output);
				response.end(); 
			}		
		},
		'/add':function(request,response){
			 // http://127.0.0.1:3000/add?name=root&content=testest!		 
			 var myobj = new Object();
			 myobj.name = qs.name;
			 myobj.content = qs.content;

			 if(typeof qs.name !== 'undefined' && qs.name !== '' 
			 	&&  qs.content !== 'undefined' && qs.content !== ''){
				var addcat = new ChatModel(myobj);
				addcat.save(function (err) {
				  if (err) return handleError(err);
					response.writeHead(200,{'Content-Type':'application/json',
		    		"Access-Control-Allow-Origin":"*"});
		    		output = JSON.stringify({message:'success'});
					response.write(output);
					response.end(); 	
				})
			 }
			 else{
			 	response.writeHead(200,{'Content-Type':'application/json',
	    		"Access-Control-Allow-Origin":"*"});
	    		output = JSON.stringify({message:'error'});
				response.write(output);
				response.end(); 
			 }
		},
		'/addonebyone':function(request,response){
			 // http://127.0.0.1:3000/addonebyone?name=root&name2=ddd&content=testest
			 var dt=new Date(); 
			 var myobj = new Object();
			 myobj.name = qs.name;
			 myobj.name2 = qs.name2;
			 myobj.content = qs.content;
			 myobj.time = dt;

			 if(typeof qs.name !== 'undefined' && qs.name !== '' &&  qs.content !== 'undefined' && qs.content !== ''){
				var addcat2 = new ChatModel2(myobj);
				addcat2.save(function (err) {
				  if (err) return handleError(err);
					response.writeHead(200,{'Content-Type':'application/json',
		    		"Access-Control-Allow-Origin":"*"});
		    		output = JSON.stringify({message:'success'});
					response.write(output);
					response.end(); 	
				})
			 }
			 else{
			 	response.writeHead(200,{'Content-Type':'application/json',
	    		"Access-Control-Allow-Origin":"*"});
	    		output = JSON.stringify({message:'error'});
				response.write(output);
				response.end(); 
			 }
		},
		'/delete':function(request,response){
		  	response.writeHead(200,{'Content-Type':'text/plain',
    		"Access-Control-Allow-Origin":"*"});
			response.write('delete');
			response.end();		
		}
	}
	if (typeof routes[pathname]==='function'){
		routes[pathname](request,response);
	}
	else{
		response.writeHead(404);
		response.write('404 not found');
		response.end();
	}
	
// }).listen(3000)

}).listen(app.set('port'))



var temp = [];
var temp2 = [];
var io = require('socket.io').listen(http);
var socket = io;  
	socket.on('connection', function(socket){
	console.log(socket.id);
  	console.log('有使用者連進來');
  	socket.emit('hi','伺服器連線成功');

  	socket.on('people-onlin',function(data){
  		var arry = data;
  		var Object1 = {"name":data,"id":socket.id};
  		temp2.push(Object1);
  		console.log(temp2);
  		console.log(data);
  		socket.name = data;
  		temp.push(arry);
  		socket.emit('upuser2',temp2);
  		socket.broadcast.emit('upuser2',temp2);
  		socket.emit('upuser',temp);
  		socket.broadcast.emit('upuser',temp);
    });
    socket.on('people-onlin2',function(){
  		socket.emit('upuser2',temp2);
  		socket.broadcast.emit('upuser2',temp2);
  		socket.emit('upuser',temp);
  		socket.broadcast.emit('upuser',temp);
    });
    socket.on('disconnect_check',function(){
  		console.log('使用者:'+socket.name+'已離線');
    	for(var i=0;i<temp.length;i++){
            if(temp[i]==socket.name){
            	temp.splice(i,1);
            	console.log(temp);
            	socket.emit('upuser',temp);
            	socket.broadcast.emit('upuser',temp);
            }
        }
        for(var i=0;i<temp2.length;i++){
        	// console.log("socketna1" + socket.name);
        	// console.log("socketna" + temp2[0].name)
            if(temp2[i].name == socket.name){
            	console.log("dddd");
            	temp2.splice(i,1);
            	console.log(temp2);
            	// socket.emit('upuser2',temp2);
            	socket.broadcast.emit('upuser2',temp2);
            }
        }
    });	
    socket.on('disconnect', function(){
    	console.log('使用者:'+socket.name+'已離線');
    	for(var i=0;i<temp.length;i++){
            if(temp[i]==socket.name){
            	temp.splice(i,1);
            	console.log(temp);
            	socket.emit('upuser',temp);
            	socket.broadcast.emit('upuser',temp);
            }
        }
        for(var i=0;i<temp2.length;i++){
        	// console.log("socketna1" + socket.name);
        	// console.log("socketna" + temp2[0].name)
            if(temp2[i].name == socket.name){
            	console.log("dddd");
            	temp2.splice(i,1);
            	console.log(temp2);
            	// socket.emit('upuser2',temp2);
            	socket.broadcast.emit('upuser2',temp2);
            }
        }
    	// console.log(temp[0]);
    });
    socket.on('addchat',function(data){
        console.log("有使用者送出新資料");
        	// socket.emit('update','Please update');
        	console.log(data);
        	socket.broadcast.emit('update',data);     
    });
    socket.on('for_someone',function(for_id,data,from_id,from_name){
    	// console.log("for_id:" + for_id);
    	// console.log("from_id:" + from_id);
    	// console.log("text:" + data);
    	// console.log('sv_for_someone..........................');
        io.sockets.socket(for_id).emit('mymessage',data,from_id,from_name); 
    });
	});


// function clock() {
//  	console.log("test");
// }




// new ChatModel({ name:'user1',content:'hello'}).save();
// new ChatModel({ name:'user2',content:'hello2'}).save();
// new ChatModel({ name:'user3',content:'hello3'}).save();






