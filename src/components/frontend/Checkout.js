import React, {useEffect,useState} from 'react';
import {  Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

        
function Checkout(){
    const History = useHistory();
    if(!localStorage.getItem('auth_token'))
    {
        History.push('/');
        swal("Warning", "Login to view cart data", "error")
    }

   
    const [loading, setloading ] = useState(true);
    const [cart, setCart ] = useState([]);
var totalCartPrice = 0 ;

const [checkoutInput, setCheckoutInput] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    address: '',
    state: '',
    city: '',
    zipcode: '',

});

const [error, setError] = useState([]);


useEffect(() => {
    let isMounted = true;


    axios.get(`/api/cart`).then(res=>{
    if(isMounted)
    {
        if(res.status === 200)
        {
            setCart(res.data.cart)  
            setloading(false);
        }
        else if(res.data.status === 401)
        {
            History.push('/')
        swal("Warning", res.data.message, "error");
        }

    }
        
    

    });

    return () => {
        isMounted = false;
    }

}, [History]);

const handleInput = (e) =>{
    e.persist();
    setCheckoutInput({...checkoutInput, [e.target.name]: e.target.value })

}


const submitOrder = (e, payment_mode) =>{
    e.preventDefault();

    const data = {
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        phone: checkoutInput.phone,
        email: checkoutInput.email,
        address: checkoutInput.address,
        state: checkoutInput.state,
        city: checkoutInput.city,
        zipcode: checkoutInput.zipcode,
        payment_mode: payment_mode
    }

   


        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res=>{
      
                    if(res.data.status === 200)
                    {
                        swal("Order Placed Successfully", res.data.message, "success");
                        setError([]);
                        History.push('/thank-you');
                    }
                    else if(res.data.status === 422)
                    {
                       
                        swal("All fields are mandatory","", "error");
                        setError(res.data.errors);
                    }
            
                    
                
            
                });
                break;

            case 'razorpay':
                axios.post(`/api/validate-order`, data).then(res=>{
                    if(res.data.status === 200)
                    {
                      
                        setError([]);
                        
                    }
                    else if(res.data.status === 422)
                    {
                       
                        swal("All fields are mandatory","", "error");
                        setError(res.data.errors);
                    }

                })
                break;
        
            default:
                break;
        }
    
}


if(loading)
{
    return <h4>Loading Checkout....</h4>
}
var cart_HTML = '';
if(cart.length > 0)
    {
        cart_HTML = 
        <div>
               <div className="row">
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-header">
                            <h4>Basic Information</h4>
                        </div>
                        <div className="card-body">

                        <div className="row">
                        <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>First Name</label>
                            <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                            <span className="text-danger">{error.firstname}</span>
                            </div>
                            </div>

                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Last Name</label>
                            <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className="form-control" />
                            <span className="text-danger">{error.lastname}</span>
                            </div>
                            </div>

                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Phone Number</label>
                            <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                            <span className="text-danger">{error.phone}</span>
                            </div>
                            </div>
                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Email Address</label>
                            <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                            <span className="text-danger">{error.email}</span>
                            </div>
                            </div>

                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Full Address</label>
                            <input type="text" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control" />
                            <span className="text-danger">{error.address}</span>
                            </div>
                            </div>

                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>City</label>
                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                            <span className="text-danger">{error.city}</span>
                            </div>
                            </div>


                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>State</label>
                            <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className="form-control" />
                            <span className="text-danger">{error.state}</span>
                            </div>
                            </div>


                            <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label>Zipcode</label>
                            <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className="form-control" />
                            <span className="text-danger">{error.zipcode}</span>
                            </div>
                            </div>

                            <div className="col-md-12">
                    
                            
                            <button type="button" onClick={ (e) => submitOrder(e, 'cod')} className="btn btn-primary">Place Order</button>
                            <button type="button" onClick={ (e) => submitOrder(e, 'razorpay')} className="btn btn-primary">Pay Online</button>
                           
                     
                            </div>
                            
                            </div>

                            </div>
                        </div>
                            </div>

                            <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h4>Order Details</h4>
                        </div>
                        <div className="card-body">

                        <div className="row">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th width="50%">Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart.map( (item, idx) => {
                     totalCartPrice += item.product.selling_price * item.product_qty; 
                     return (
                        <tr key={idx}>
                                        <td>{item.product.name}</td>
                                        <td>{item.product.selling_price}</td>
                                        <td>{item.product_qty}</td>
                                        <td>{item.product.selling_price * item.product_qty }</td>
                                    </tr>
                                       )
                                    })}
                                    <tr>
                     <td colSpan="2" className="text-end fw-bold">Grand Total : </td>
                     <td colSpan="2"  className="text-end fw-bold">{totalCartPrice}</td>
                 </tr>
                                </tbody>
                            </table>
                      

                
                            </div>

                            </div>
                        </div>
                            </div>
                            </div>
        </div>

    }

    else 
    {
        cart_HTML = <div>
        <div className="car card-body py-5 text-center shadow-sm">
            <h4>Yor Shopping cart is empty</h4>
            
        </div>
        </div>
    }

    
    return (
        <div>
       
       <div className="py-3 bg-warning">
            <div className="container">
                <h6>Checkout</h6>
            </div>
   
        </div>

        <div className="py-4">
            <div className="container">
            {cart_HTML}
                             </div>
                    </div>
         
        </div>
    )
}



export default Checkout; 