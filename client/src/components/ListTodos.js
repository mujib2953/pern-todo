import React, { Fragment } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ todos, deleteTodo, updateTodo }) => {

    return (
        <Fragment>
            <table className="table mt-3 text-center mb-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map( t=> (
                            <tr key={ t.todo_id }>
                                <td>{ t.description }</td>
                                <td>
                                    <EditTodo todo={ t } updateTodo={ updateTodo }/>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={ e => deleteTodo(t.todo_id) }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;
