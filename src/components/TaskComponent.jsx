import React, { useEffect, useState } from 'react'
import { createTask, updateTask, getTask} from '../services/TaskService';
import { useNavigate, useParams } from 'react-router-dom'

const TaskComponent = () => {

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const {id} = useParams();

    const [errors, setErrors] = useState({
        title: '',
        date: '',
        status: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
         if(id){
             getTask(id).then((response) => {
                 setTitle(response.data.title);
             setDate(response.data.date);
                 setStatus(response.data.status);
             }).catch(error => {
                 console.error(error);
             })
         }
     }, [id])

//     const handleTitle = (t) => setTitle(t.target.value);

//     const handleDate = (t) => setDate(t.target.value);    

//    const handleStatus = (t) => setStatus(t.target.value);

   function saveOrUpdateTask(t){
    t.preventDefault();

    if(validateForm()){
        const task={title, date, status}
        console.log(task)

        if(id){
            updateTask(id, task).then((response) => {
                console.log(response.data);
                navigator('/task');
            }).catch(error => {
                console.error(error);
            })
         } else{
                createTask(task).then((response) => {
                    console.log(response.data);
                    navigator('/task');
                }).catch(error => {
                    console.error(error);
         })
        }
     }
    }

   function validateForm(){
    let valid = true;
    const errorsCopy = {...errors}

    if(title.trim()){
        errorsCopy.title = '';
    }else{
        errorsCopy.title = 'title is required';
        valid=false;
    }

    if(date.trim()){
        errorsCopy.date = '';
    }else{
        errorsCopy.date = 'date is required';
        valid=false;
    }

    if(status.trim()){
        errorsCopy.status = '';
    }else{
        errorsCopy.status = 'status is required';
    }

    setErrors(errorsCopy);
    return valid;
   }

   function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Task</h2>
    }
    else{
        return <h2 className='text-center'>Add Task</h2>
    }
   }

  return (
    <div className='container'>
    <br></br>
    <div className='row'>
        <div className='card mt-5 col-md-6 offset-md-3 offset-md-3'>
            {
                pageTitle()
            }
            <div className='card-body'>
                <form>
                    <div className='form-group'>
                        <label className='form-label'>Title:</label>
                        <input
                            className={`form-control ${ errors.title ? 'is-invalid' : '' }`}
                            type='text'
                            name='title'
                            value={title}
                            onChange={(t) => setTitle(t.target.value)}>
                        </input>
                        {errors.title && <div className='invalid-feedback'> { errors.title} </div>}
                    </div>
            
                    <div className='form-group'>
                        <label className='form-label'>Date:</label>
                        <input
                            className={`form-control ${ errors.date ? 'is-invalid' : '' }`}
                            type='text'
                            placeholder='yyyy-mm-dd'
                            name='date'
                            value={date}
                            onChange={(t) => setDate(t.target.value)}>
                        </input>
                        {errors.date && <div className='invalid-feedback'> { errors.date} </div>}
                    </div>
                    
                    <div className='form-group'>
                        <label className='form-label'>Status:</label>
                        <input
                            className={`form-control ${ errors.status ? 'is-invalid' : '' }`}
                            type='text'
                            name='status'
                            value={status}
                            onChange={(t) => setStatus(t.target.value)}>
                        </input>
                        {errors.status && <div className='invalid-feedback'> { errors.status} </div>}
                    </div>
                    <div>
                    <button className='btn btn-success mt-2' onClick={saveOrUpdateTask}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </div>
)
}

export default TaskComponent