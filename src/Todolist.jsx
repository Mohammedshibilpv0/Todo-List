import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Todolist() {
    const [todo, setTodo] = useState([]);
    const [task, newTask] = useState('');
    const [indx, setIndx] = useState(null);

    const handleinput = (e) => {
        if (e.target.value !== "") {
            newTask(e.target.value);
        } else {
            newTask('');
        }
    };

    const addtask = () => {
        let check = task.toLowerCase();
        const already = todo.some((item) => item.toLowerCase() === check);
        if (task.trim() !== '' && task !== '' && !already) {
            setTodo(t => [...t, task]);
            newTask('');
        } else {
            newTask('');
        }
    };

    const handledelete = (index) => {
        setTodo(todo.filter((_, i) => i !== index));
    };

    const handleedit = (index) => {
        let element = todo[index];
        if (element.trim() !== "") {
            newTask(element);
            setIndx(index);
        } else {
            newTask('');
            setIndx(null);
        }
    };

    const handleupdate = () => {
        let check = task.toLowerCase();
        const already = todo.some((item) => item.toLowerCase() === check);
        if (task.trim() !== '' && task !== '' && !already) {
            const element = [...todo];
            element[indx] = task;
            setTodo([...element]);
            newTask('');
        }
        newTask('');
        setIndx(null);
    };

    const handleup = (index) => {
        let element = [...todo];
        if (index >= 1) {
            [element[index], element[index - 1]] = [element[index - 1], element[index]];
            setTodo([...element]);
        }
    };

    const handledown = (index) => {
        let element = [...todo];
        if (index < element.length - 1) {
            [element[index + 1], element[index]] = [element[index], element[index + 1]];
            setTodo([...element]);
        }
    };

    const handlecomplete = (index) => {
        let li = document.getElementById(`text${index}`);
        let style = window.getComputedStyle(li);
        let textDecoration = style.getPropertyValue("text-decoration");
        let btn = document.getElementById(`complete${index}`);

        if (textDecoration.includes("line-through")) {
            li.style.textDecoration = "none";
            btn.innerHTML = '✅';
        } else {
            li.style.textDecoration = "line-through";
            btn.innerHTML = '❌';

        }
    };


    return (

        <div className="container">
            <h1 className="text-center">To-Do-List</h1>

            <div className="input-group mb-3">
                <input type="text" className="form-control" value={task} placeholder="Enter a task..." onChange={handleinput} />
                {
                    indx == null ? <button className="btn btn-primary" onClick={addtask}>Add</button>
                        : <button className="btn btn-warning" onClick={handleupdate}>Update</button>
                }
            </div>

            <ol className="list-group">
                {todo.map((to, index) => (
                    <li key={index} className="list-group-item">
                        <span className="text" id={`text${index}`}>{`${index + 1}) ${to}`}</span>
                        <button className="btn btn-success mx-1" id={`complete${index}`} onClick={() => handlecomplete(index)}>✅</button>
                        <button className="btn btn-danger mx-1" onClick={() => handledelete(index)}>Delete</button>
                        <button className="btn btn-warning mx-1" onClick={() => handleedit(index)}>Edit</button>
                        {/* <button className="btn btn-secondary mx-1" onClick={() => handleup(index)}>☝️</button>
                        <button className="btn btn-secondary mx-1" onClick={() => handledown(index)}>👇</button> */}
                    </li>
                ))}
            </ol>

        </div>


    )
}

export default Todolist;
