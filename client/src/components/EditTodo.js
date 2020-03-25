import React, { Fragment, useState } from "react";

const EditTodos = ({ todo, updateTodo }) => {
    const [description, setDescription] = useState(todo.description);

    const updateDesription = async (e) => {
        e.preventDefault();

        try {
            const {todo_id} = todo;
            const body = { description };

            const response = await fetch(`/todos/${ todo_id }`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const jsonData = await response.json();
            updateTodo(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            
            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={ `#id${todo.todo_id}` }
            >
                Edit
            </button>

            <div
                className="modal"
                id={ `id${todo.todo_id}` }
                onClick={ () => setDescription(todo.description) }
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            onClick={ () => setDescription(todo.description) }
                        >
                            &times;
                        </button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            value={ description }
                            onChange={ e => setDescription(e.target.value) }
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success"
                            data-dismiss="modal"
                            onClick={ e => updateDesription(e) }
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={ () => setDescription(todo.description) }
                        >
                            Discard
                        </button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodos;
