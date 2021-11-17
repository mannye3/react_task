import React, {useState} from 'react';

import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


function Register(){
    const history = useHistory();
    const [registerInput, setRegister] = useState({
            name: '',   
            email: '',    
            password: '',   
            error_list: [],
    
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }


    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res =>{
                if(res.data.status ===200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success",res.data.message,"success");
                    history.push('/');
                }
                else
                {
                    setRegister({...registerInput, error_list: res.data.validation_errors });
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
                            <h4>Register</h4>
                        </div>
                    <form onSubmit={registerSubmit}>
                <div className="form-group mb-3">
                    <label for="exampleInputEmail1" className="form-label">Full Name</label>
                    <input type="text" name="name" onChange={handleInput} value={registerInput.name}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <span>{registerInput.error_list.name}</span>
                  
                </div>

                <div className="form-group mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <span>{registerInput.error_list.email}</span>
                </div>


                <div className="form-group mb-3">
                    <label for="exampleInputEmail1" className="form-label">Password</label>
                    <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <span>{registerInput.error_list.password}</span>
                </div>

               

                {/* <div className="form-group mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="text" name="pasword" onChange={handleInput} value={registerInput.password} className="form-control" />
                    <span>{registerInput.error_list.password}</span>
                </div> */}

             
                <button type="submit" className="btn btn-primary">Register</button>
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



export default Register;