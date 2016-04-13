var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

var todos = []; /* End var todos */
var todoNextId = 1;


app.use(bodyParser.json());

app.get('/', function (res, res)	{
	res.send('Todo API Root');
	});




app.get('/todos', function (req, res)	{
	res.json(todos);
	// res.status(404).send();
	});


// GET /todos/:id
app.get('/todos/:id', function (req, res)	{
 		var todoId = parseInt(req.params.id, 10);
 		// var founded = false
 		var matchedTodo;

	todos.forEach(function (todo)	{
		if (todoId === todo.id) {
				matchedTodo = todo;
			}
		});

	if (matchedTodo) {
			res.json(matchedTodo);
		} else {
			res.status(404).send();
		};

	}); /*	End todos/:id	*/



// POST /todos
app.post('/todos', function (req, res)	{
		var body = req.body;

		body.id = todoNextId++;
		
		todos.push(body);


		res.json(todos);
	});















app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + ' !');
	});