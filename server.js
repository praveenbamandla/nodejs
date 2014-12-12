
function TasksClass(db,ObjectID){
  
  //var tasks = [];
  
  return {
    getTask: function(id,callback) {
      db.open(function(){
			db.collection('tasks',{strict:true}, function(err, collection) {
				collection.find({_id:new ObjectID(id)}).toArray(function(err, item) {
					callback(item);
				});				
			});
	  });
    },
    getTasks: function(callback) {
      db.open(function(){
			db.collection('tasks',{strict:true}, function(err, collection) {
				collection.find().toArray(function(err, items) {
					callback(items);
				});				
			});
	  });
    },
    addTask: function(name){
      //tasks.push({name:name,completed:false});
		db.open(function(){
			db.collection('tasks',{strict:true}, function(err, collection) {
				collection.insert({name:name,completed:false},function(){});
			});
		});	
	},		
    finishTask:function(id){
     // tasks[index-1].completed = true;
		db.open(function(){
			db.collection('tasks',{strict:true}, function(err, collection) {
				collection.update({_id:new ObjectID(id)}, {$set:{completed:true}},function(){});
			});
		});		 
    },
	deleteTask:function(id){
		db.open(function(){
			db.collection('tasks',{strict:true}, function(err, collection) {
				collection.remove({_id:new ObjectID(id)},function(){});
			});
		});		 
	}
  };
  
}





var MongoClient = require('mongodb').MongoClient
 
var Server = require('mongodb').Server;

var mongoClient = new MongoClient(new Server('127.0.0.1', 27017));

var db = mongoClient.db("newdb");

var ObjectID = require('mongodb').ObjectID;


var tasks = TasksClass(db,ObjectID);

//tasks.addTask("test taskabc");
//tasks.getTasks(function(items){
//	console.info(items);
//});
//tasks.deleteTask("test taskabc");



var express = require('express');
var fs = require('fs');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(express.static('public'));

app.get('/', function (req, res) {
  /*res.set('Content-Type', 'text/html');
  fs.readFile('backbone.html', function (err, data) {
     res.send(data);
  });*/
  res.send("Server Home");
});


app.get('/tasks', function (req, res) {
  //res.send('Hello World! 2')
  //res.json({tasks:tasks.getTasks()});
 // res.send("OK");
  tasks.getTasks(function(tasks){
    res.json(tasks);
  });
});

app.get('/tasks/:id', function (req, res) {
  //res.send('Hello World! 2')
  //res.json({tasks:tasks.getTasks()});
  tasks.getTask(req.params.id,function(task){
    res.json(task);
  });
 // res.send("OK");
});

app.post('/tasks', function (req, res) {
	//console.log("Body", req.body);
  tasks.addTask(req.body.taskname); 
  res.send("OK");
});

app.put('/tasks/:id', function (req, res) {
  tasks.finishTask(req.params.id);
  res.send("OK");
});

app['delete']('/tasks/:id', function (req, res) {
  tasks.deleteTask(req.params.id);
  res.send("OK");
});

app.listen(process.env.PORT, function () {

  console.log('Server started');

});
