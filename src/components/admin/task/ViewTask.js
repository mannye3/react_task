import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function ViewTask(){
 
    const [loading, setloading ] = useState(true);
    const [tasklist, settasklist ] = useState([]);

    useEffect(() => {

        axios.get(`/api/view-task`).then(res=>{
            //console.log(res.data.category);

            if(res.status === 200)
            {
                settasklist(res.data.task)
            }

            setloading(false);

        });
      
    }, []);

    const deleteTask = (e, id) =>{
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";
        
        axios.delete(`/api/delete-task/${id}`).then(res=>{
            if(res.data.status === 200)
        {
            // thidClickedFunda.closest("tr").remove();
           swal("Success", res.data.message, "success");
           thisClicked.closest("tr").remove();
            //console.log(res.data.message);
        }

        else if(res.data.status === 404)
        {
            swal("Error", res.data.message, "error");
            thisClicked.innerText = "Delete";
        }

        })

    }

    var viewtask_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Task....</h4>
    }

    else
    {
        viewtask_HTMLTABLE = 
        tasklist.map( (item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.assignTo}</td>
                  
                    <td>
                        <Link to={`edit-task/${item.id}`}  className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteTask(e, item.id)}   className="btn btn-danger btn-sm">Delete</button>
                       
                    </td>
                </tr>
            )
        });
    }



    return (
        <div className="container px-4">
                <div className="row">
                    <div className="col-md-12">
                                <div className="card mt-4">
                                <div className="card-header">
                                    <h4>Task List
                                    </h4>
                                    <Link to={'add-task'} className="btn btn-primary btn-sm- float-end">Add Task</Link>

                                    </div>
                                        <div className="card-body">

                                            <table className="table table-bordered table-stripe">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Title</th>
                                                        <th>description</th>
                                                        <th>Assign To</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {viewtask_HTMLTABLE}
                                                </tbody>

                                            </table>

                                        </div>
                                </div>
                    </div>
                </div>
            </div>
    )
}



export default ViewTask;