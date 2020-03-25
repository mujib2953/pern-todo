const express = require("express");
const cors = require("cors");
const pool = require("./db");

const PORT = 5000;

const app = express();

// --- enabled the cors
app.use(cors());

// --- enabled the req.body as json
app.use(express.json());

// --- Routes/APIs
app.get("/", (req, res) => {
    res.send("Hello to PERN Application.");
});

/**
 * @type: GET
 * @description: To fecth all the todos from the database
 * @param: NONE
 * @body : NONE
 * @returns: Array of todos({id: number, description: string})
 * **/
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");

        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

/**
 * @type: GET
 * @description: To fecth single todos from the database
 * @param: id(number)
 * @body : NONE
 * @returns: todo({id: number, description: string})
 * **/
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [ id ]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

/**
 * @type: POST
 * @description: To save new todo in the database
 * @param: NONE
 * @body : description(string)
 * @returns: todo({id: number, description: string})
 * **/
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const todo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [ description ]);

        res.send(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

/**
 * @type: PUT
 * @description: To update todo in the database
 * @param: id(number)
 * @body : description(string)
 * @returns: Message(string)
 * **/
app.put("/todos/:id", async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.params;

        const todo = await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *", [ description, id ]);

        res.json(todo.rows[ 0 ]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

/**
 * @type: DELETE
 * @description: To delet a todo from the database
 * @param: id(number)
 * @body : NONE
 * @returns: Message(string)
 * **/
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [ id ]);

        res.send("Todo was deleted.");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});


app.listen(PORT, () => {
    console.log(`Express server is started on ${PORT}`);
});
