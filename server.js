var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

var app = express();
var PORT = process.env.PORT || 3000;

var todos = []; /* End var todos */
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/', function (res, res)	{
	res.send('Todo API Root');
	});



// GET /todos?completed=true&q=house
app.get('/todos', function (req, res)	{
	var queryParams = req.query;
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
			filteredTodos = _.where(filteredTodos, {completed:true});
		} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
			filteredTodos = _.where(filteredTodos, {completed:false});
		}

	if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
		filteredTodos = _.filter(filteredTodos, function (argument){
			return argument.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1; /*	teacher	*/
			//if (argument.description.search(queryParams.q) >= 0) {return true} else {return false} /*	mine	*/
		})
		}

	res.json(filteredTodos);
	// res.status(404).send();
	});


// GET /todos/:id
app.get('/todos/:id', function (req, res)	{
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
			res.json(matchedTodo);
		} else {
			res.status(404).send();
		};

	}); /*	End todos/:id	*/



// POST /todos
app.post('/todos', function (req, res)	{
		var body = _.pick(req.body, 'description', 'completed');

		if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		 	
		 	return res.status(400).json("Completed is not a Boolean or description is empty or it is not a string");
			};

		body.description = body.description.trim();
		

		db.todo.create(body)
			.then(function (todo) {
			 	console.log(todo)
			 	res.json(todo.toJSON());
				}, 
				function (e) {
				 res.status(400).json(e);
				})


	}); /*	End Post	*/



// DELETE /todos/:id

app.delete('/todos/:id', function (req, res) {
  	var todoId = parseInt(req.params.id, 10);
  	var matchedTodo = _.findWhere(todos, {id: todoId});

  if (matchedTodo) {
			todos = _.without(todos, matchedTodo);
			res.json(matchedTodo);
		} else {
			res.status(404).json({"error":"no todo found with that id"}).send();
		};

	}); /*	End Delete	*/




// PUT /todos/:id

app.put('/todos/:id', function (req, res) {
  	var todoId = parseInt(req.params.id, 10);
	  var matchedTodo = _.findWhere(todos, {id: todoId});
  	var body = _.pick(req.body, 'description', 'completed');
  	var validAttributes = {};

  if (!matchedTodo){
  	return res.status(404).send();
  };

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
  	validAttributes.completed = body.completed;
  } else if (body.hasOwnProperty('completed')) {
  		return res.status(400).send();
  };

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
  	validAttributes.description = body.description;
  } else if (body.hasOwnProperty('description')) {
  	return res.status(400).send();
  };

  _.extend(matchedTodo, validAttributes);
	res.json(matchedTodo)



	}); /*	End Delete	*/




db.sequelize.sync().then(function(){

	app.listen(PORT, function () {
		console.log('Express listening on port ' + PORT + ' !');
		});

});


