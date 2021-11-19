import express from 'express'
import bp from 'body-parser'
import morgan from 'morgan'

const app = express()

app.use(bp.urlencoded({extended: true})) // helps parse url params
app.use(bp.json()) //helps see body of post req as Json as opposed to chunks
app.use(morgan('dev')) 

const db = []

app.post('/todo', (req, res) => {
	const newTodo = {
		id: Date.now(),
		text: req.body.text //body-parser lets us attach the req params to an Object 'body'
	}

	db.push(newTodo)
	res.status(201)
	res.json(newTodo) // res.json basically does what res.end does for us
})

app.get('/todo', (req, res) => {
	res.json(db)
})

// for Dynamic routes
app.get('/todo/:id', (req, res) => {
	const todo = db.find(t => {
		return t.id === +req.params.id //+ converts to a number
	})

	res.json({data: todo})
})

app.listen(8000, () => {
	console.log(`Server on http://localhost:8000`)
})