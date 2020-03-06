import React, { useState } from 'react';

const TodoList = props => {
    const [state, setState] = useState({
        todo_items: [],
        todo: "",
    })

    const onChangeHandler = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    }

    const onSubmitHandler = event => {
        event.preventDefault();
        setState({
            ...state,
            todo_items: state.todo_items.concat([{ content: event.target.todo.value, completed: false }]),
        });
    }


    const deleteTodoHandler = event => {
        setState({
            ...state,
            todo_items: state.todo_items.filter((obj) => { return obj.content !== state.todo_items[event.target.name].content })
        });
    }

    const completeTodoHandler = event => {
        setState({
            ...state,
            todo_items: state.todo_items.map((obj) => {
                if (obj.content === state.todo_items[event.target.name].content) {
                    obj.completed = !obj.completed;
                }
                return obj;
            })
        });
    }

    const completedStyle = {
        textDecoration: "line-through"
    };

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <input type="text" name="todo" placeholder="Write something to do..." onChange={onChangeHandler} />
                    {state.todo.length > 0 && <input type="submit"></input>}
                </div>
            </form>
            <div>
                <ul>
                    {state.todo_items.map((todo_item, idx) => {
                        return todo_item.completed === false ? <li key={idx}>
                            {todo_item.content}
                            <input type="checkbox" name={idx} onChange={completeTodoHandler} />
                            <button name={idx} onClick={deleteTodoHandler}>Delete</button>
                        </li> : <li key={idx} style={completedStyle}>
                                {todo_item.content}
                                <input type="checkbox" name={idx} onChange={completeTodoHandler} />
                                <button name={idx} onClick={deleteTodoHandler}>Delete</button>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;