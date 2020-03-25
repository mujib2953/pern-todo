import React, { useEffect, useState } from 'react';
import './App.css';

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {

	const [todos, setTodos] = useState([]);

	const getTodos = async () => {

		try {
			const response = await fetch("/todos");
			const jsonData = await response.json();

			setTodos(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	}

	const deleteTodo = async (id) => {
		try {
			await fetch(`/todos/${ id }`, {
				method: "DELETE"
			});

			setTodos( todos.filter( t => t.todo_id !== id ) );
		} catch (err) {
			console.error(err.message);
		}
	}

	const updateTodo = (newTodo) => {
		const newList = [...todos];
		newList.forEach(t => {
			if (t.todo_id === newTodo.todo_id) {
				t.description = newTodo.description;
			}
		});
		setTodos(newList);
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div className="container">
			<h1 className="text-center mt-5">PERN Todos</h1>
			
			<InputTodo updateTodo={ newTodo => setTodos([...todos, newTodo]) }/>
			<ListTodos todos={ todos } deleteTodo={ deleteTodo } updateTodo={ updateTodo }/>
		</div>
	);
}

export default App;
