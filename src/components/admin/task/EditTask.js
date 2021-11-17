import axios from 'axios';
import React, {useState,useEffect} from 'react';
import {  useHistory } from 'react-router-dom';
import swal from 'sweetalert';



function EditTask(props){

    const History = useHistory();
    const [loading, setloading ] = useState(true);
    const [taskInput, setTask] = useState([]);
    const [error, setError] = useState([]);

    

    useEffect(() => {
        const task_id = props.match.params.id;
         //console.log(task_id);
       axios.get(`/api/edit-task/${task_id}`).then(res=>{
           if(res.data.status === 200)
           {
            setTask(res.data.category);
           }

           else if(res.data.status === 404)
           {
            swal("Error", res.data.message, "error");
            History.push('/admin/view-category')
          
           }
           setloading(false);
       });
    }, [props.match.params.id, History])


    const handleInput = (e) =>{
        e.persist();
        setTask({...taskInput, [e.target.name]: e.target.value });
        
    }

    if(loading)
    {
        return <h4>Loading Task....</h4>
    }


    const updateTask = (e) => {
     
        e.preventDefault();

        // const data = {
        //     slug:taskInput.slug,
        //     name:taskInput.name,
        //     description:taskInput.descrip,
        //     status:taskInput.status,
        //     meta_title:taskInput.meta_title,
        //     meta_keywords:taskInput.meta_keywords,
        //     meta_descrip:taskInput.meta_descrip,
        // }
        const task_id = props.match.params.id;
        const data = taskInput;
        axios.put(`/api/update-task/${task_id}`, data).then(res =>{
            if(res.data.status === 200)
            {
                    swal("Success", res.data.message, "success");
                    setError([]);
                    // document.getElementById('CATEGORY_FORM').reset();
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","", "error");
            
               
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, "error");
                History.push('admin/view-category');
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
            <h1 classNameName="mt-4">Edit Task</h1>
{/* 
            {
                display_errors.map( (item) => {
                    return( <li>item</li>) 
                })
            } */}


            <form  onSubmit={updateTask}>
           
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div className="form-group mb-3">
                    <label>Title</label>
                    <input type="text" name="title" onChange={handleInput} value={taskInput.title} className="form-control" />
                    <span className="text-danger">{error.title}</span>
                   
                   

                </div>

               

                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea  name="description" onChange={handleInput} value={taskInput.description}className="form-control"> </textarea>
               

                </div>

                <div className="form-group mb-3">
                    <label>Assign To</label>
                    <input type="text" name="assignTo" onChange={handleInput} value={taskInput.assignTo} className="form-control" />
                    <span className="text-danger">{error.assignTo}</span>        

                </div>
     
                </div>

           
            </div>
            <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </form>
        </div>
    )
}



export default EditTask;