var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [
	{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
	},	{
	id: 2,
	description: 'Go to market',
	completed: false
	},	{
	id: 3,
	description: 'Just for fun',
	completed: true
	}
	]; /* End var todos */




app.get('/', function (res, res)	{
	res.send('Todo API Root');
	});




app.get('/todos', function (req, res)	{
	res.json(todos);
	// res.status(404).send();
	});



app.get('/todos/:id', function (req, res)	{
 		var todoId = parseInt(req.params.id, 10);
 		// var founded = false
 		var matchedTodo;

 		/*	My loop	*/
 	// for (var i = todos.length - 1; i >= 0; i--) {
 	// 	if (todos[i].id === todoId) {
	 	// 		founded = true
	 	// 		break;
		// 	}	/*	End if	*/
		// } /*	End for	*/

		/*	My if	*/
	// if (founded === true)	{
		// 	res.send('Asking for todo with id of ' + todos[i].id + '\nDescription: ' + todos[i].description + '\ncompleted: ' + todos[i].completed)
	// 	} else {
		// 	res.status(404).send();
	// 	} /*	End if	*/

	/*	teacher loop	*/
	todos.forEach(function (todo)	{
		if (todoId === todo.id) {
				matchedTodo = todo;
			}
		});

	/*	teacher if	*/
	if (matchedTodo) {
			res.json(matchedTodo);
		} else {
			res.status(404).send();
		};

	}); /*	End todos/:id	*/






app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT + ' !');
	});