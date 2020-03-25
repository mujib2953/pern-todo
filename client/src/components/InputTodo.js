import React, { Fragment, useState } from "react";

const InputTodo = ({ updateTodo }) => {

    const [description, setDescription] = useState("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {

            const body = { description };
            // --- calling save api
            const response = await fetch("/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            setDescription("");
            updateTodo(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h4 className="mt-5 text-center">Add Todos</h4>

            <form
                onSubmit={ e => onFormSubmit(e) }
                className="d-flex p-5"
            >
                <input
                    className="form-control"
                    type="text"
                    placeholder="Type your Todo task"
                    value={ description }
                    onChange={ e => setDescription(e.target.value) }
                />
                <button className="btn btn-success ml-2">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;
