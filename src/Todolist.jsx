import { useState } from "react"

function Todolist() {
    const [todo,setTodo]=useState([])
    const [task,newTask]=useState('')
    const [indx,setIndx]=useState(null)

    const handleinput=(e)=>{
        if(e.target.value!==""){
            newTask(e.target.value)
        }else{
            newTask('')
        }
    }

    const addtask=()=>{
        let check=task.toLowerCase()
        const already=todo.some((item)=>item.toLowerCase()===check)
        if(task.trim()!==''&&task!==''&& !already){
            setTodo(t=> [...t,task])
            newTask('')
        }else{
            newTask('')
        }
    }

    const handledelete =(index)=>{
        setTodo(todo.filter((_,i)=>i!==index))
    }

    const handleedit = (index) => {
        let element = todo[index];
        if (element.trim() !== "") {
          newTask(element);
          setIndx(index);
        }else{
            newTask('');
            setIndx(null);
        }
      };

    const handleupdate=()=>{
        let check = task.toLowerCase()
        const already=todo.some((item)=>item.toLowerCase()===check)
        if(task.trim()!==''&&task!==''&& !already){
        const element=[...todo]
        element[indx]=task
            setTodo([...element])
            newTask('')
        }
        newTask('')
        setIndx(null)
    }

    const handleup=(index)=>{
        let element=[...todo]
        console.log(element);
        if(index>=1  ){
            console.log(element[index]);
            [element[index],element[index-1]]=[element[index-1],element[index]]
            setTodo([...element])
        }
    }

    const handledown=(index)=>{
        let element=[...todo]
        if(index<element.length-1){
            [element[index+1],element[index]]=[element[index],element[index+1]]
            setTodo([...element])
        }

    }

    const handlecomplete = (index) => {
        let li = document.getElementById(`text${index}`);
        let style = window.getComputedStyle(li);
        let textDecoration = style.getPropertyValue("text-decoration");
        let btn=document.getElementById(`complete${index}`)

        if (textDecoration.includes("line-through")) {
          li.style.textDecoration = "none";
          btn.innerHTML='✅'
        } else {
          li.style.textDecoration = "line-through";
            btn.innerHTML='❌'

        }
      };


  return (

    <div className="to-do-list">
        <h1>To-Do-List</h1>

        <div>
            <input type="text" value={task}  placeholder="Enter a task..." onChange={handleinput} />
            {
            indx==null?<button className="add-button" onClick={addtask}>Add</button>
            :<button className="add-button" onClick={handleupdate}>Update</button>
            }
        </div>

        <ol>
            {todo.map((to,index)=>(
                <li key={index}>
                <span className="text" id={`text${index}`}  >{`${index+1}) ${to}`}</span>
                <button className="move-button" id={`complete${index}`} onClick={()=>handlecomplete(index)}>✅</button>
                <button className="delete-button" onClick={()=>handledelete(index)}>Delete</button>
                <button className="edit-button" onClick={()=>handleedit(index)}>Edit</button>
                <button className="move-button" onClick={()=>handleup(index)}>☝️</button>
                <button className="move-button" onClick={()=>handledown(index)}>👇</button>
            </li>
            ))}
        </ol>

    </div>


   )
}

export default Todolist
