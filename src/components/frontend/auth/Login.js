import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';

import { useHistory } from 'react-router-dom';



function Login(){

    const history = useHistory();
    const [loginInput, setLogin] = useState({
      
        email: '',    
        password: '',   
        error_list: [],

});

const handleInput = (e) => {
    e.persist();
    setLogin({...loginInput, [e.target.name]: e.target.value });
}



const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
        
        email: loginInput.email,
        password: loginInput.password,
    }
    axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/login`, data).then(res =>{
            if(res.data.status ===200)
            {
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                swal("Success",res.data.message,"success");

                if(res.data.role === 'admin')
                {
                    history.push('/admin/dashboard');
                }

                else
                {
                    history.push('/');
                }
               
            }
            else if(res.data.status === 401)
            {
                swal("warning",res.data.message,"warning");
            }

            else 
            {
                setLogin({...loginInput, error_list: res.data.validation_errors });
            }

  });
    });
 
}



    return (
        <div>
        
        <div className="container py-5">

            <div className="row">
                <div className="row justify-content-center">

                
                <div className="col-md-6">
                    <div className="card">
                <div className="card-body">
                    <div className="card-header">
                        <h4>Login</h4>
                    </div>
                    <form onSubmit={loginSubmit}>
           
                <div className="form-group mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <span>{loginInput.error_list.email}</span>
                </div>


                <div className="form-group mb-3">
                    <label for="exampleInputEmail1" className="form-label">Password</label>
                    <input type="text" name="password" onChange={handleInput} value={loginInput.password} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <span>{loginInput.error_list.password}</span>
                </div>

           
          
            <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </div>

                </div>
           </div>
            </div>

        </div>
        </div>
       
       
    </div>
    )
}



export default Login;