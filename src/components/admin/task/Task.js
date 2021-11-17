import axios from 'axios';
import React, {useState} from 'react';
import swal from 'sweetalert';


function Task(){

    const [taskInput, setTask] = useState({
        title: '',
        description: '',
        assignTo: '',
       error_list: [],
    });


    const handleInput = (e) =>{
        e.persist();
        setTask({...taskInput, [e.target.name]: e.target.value });
        
    }

    const submitTask = (e) => {
     
        e.preventDefault();

        const data = {
            title:taskInput.title,
            description:taskInput.description,
            assignTo:taskInput.assignTo,
            
        }

        axios.post(`/api/store-task`, data).then(res =>{
            if(res.data.status === 200)
            {
                    swal("Success", res.data.message, "success")
                    document.getElementById('CATEGORY_FORM').reset();
            }
            else if(res.data.status === 400)
            {
                setTask({...taskInput, error_list:res.data.errors});
            }
        })
    }

    // var display_errors = [];
    // if(taskInput.error_list)
    // {
    //     display_errors = [
    //         taskInput.error_list.slug,
    //         taskInput.error_list.name,
    //         taskInput.error_list.meta_title,
           
    //     ]
    // }


    return (
        <div classNameName="container-fluid px-4">
            <h1 classNameName="mt-4">Add Task</h1>
{/* 
            {
                display_errors.map( (item) => {
                    return( <li>item</li>) 
                })
            } */}


            <form onSubmit={submitTask} id="CATEGORY_FORM">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"></button>
            </li>
           
           
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleInput} value={taskInput.title} className="form-control" />
                    <span>{taskInput.error_list.title}</span>
                   

                </div>

                <div className="form-group mb-3">
                    <label>description</label>
                    <textarea  name="description" onChange={handleInput} value={taskInput.description} className="form-control"> </textarea>
               

                </div>


                <div className="form-group mb-3">
                    <label>AssignTo</label>
                    <textarea  name="assignTo" onChange={handleInput} value={taskInput.assignTo} className="form-control"> </textarea>
               

                </div>



               

               
                
                
                </div>

            
            </div>
            <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </form>
        </div>
    )
}



export default Task;