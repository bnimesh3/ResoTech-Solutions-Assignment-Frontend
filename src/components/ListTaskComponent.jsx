import React, {useEffect, useState} from 'react'
import { listTask, deleteTask} from '../services/TaskService'
import { useNavigate } from 'react-router-dom'

const ListTaskComponent = () => {
    
    const [tasks, setTasks] = useState([])

    const navigator=useNavigate();

    useEffect(() => {
       getAllTask();
    }, [])

    function getAllTask(){
        listTask().then((response) =>{
            setTasks(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewTask(id){
        navigator('/add-task')
    }

    function updateTask(id){
        navigator(`/edit-task/${id}`)
    }

    function removeTask(id){
        console.log(id);

        deleteTask(id).then((response) =>{
            getAllTask();
        })
    }

  return (
    <div className='container'>
        <h2>List of Tasks</h2>
        <button className='btn btn-primary mb-2 mt-5' onClick={addNewTask}>Add Task</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Task Title</th>
                    <th>Task Date</th>
                    <th>Task Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(task =>
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.date}</td>
                            <td>{task.status}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateTask(task.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeTask(task.id)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListTaskComponent