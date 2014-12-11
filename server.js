
function TasksClass(){
  
  var tasks = [];
  
  return {
    getTasks: function() {
      return tasks;
    },
    addTask: function(name){
      tasks.push({name:name,completed:false});
    },
    finishTask:function(index){
      tasks[index].completed = true;
    }
  };
  
}

var tasks = TasksClass();


tasks.addTask("xyz");
tasks.addTask("abc");
tasks.finishTask(1);

//console.log(tasks.getTasks());

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/tasks', function (req, res) {
  //res.send('Hello World! 2')
  res.json({tasks:tasks.getTasks()});
});

app.listen(process.env.PORT, function () {

  console.log('Server started');

});