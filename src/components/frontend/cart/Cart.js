import React, {useEffect,useState} from 'react';
import {  Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




function Cart(){
    const History = useHistory();
    const [loading, setloading ] = useState(true);
    const [cart, setCart ] = useState([]);
var totalCartPrice = 0 ;

    if(!localStorage.getItem('auth_token'))
    {
        History.push('/');
        swal("Warning", "Login to view cart data", "error")
    }
  
   

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


    const handleDecrement = (cart_id) =>{
        setCart(cart => 
            cart.map( (item) =>
            cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1:0  )} : item
            )
            );
            updateCartQuantity(cart_id,"dec")
       
    }

    const handleIncrement = (cart_id) =>{

        setCart(cart => 
            cart.map( (item) =>
            cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1:0  )} : item
            )
            );
            updateCartQuantity(cart_id,"inc")
    }

    function updateCartQuantity(cart_id,scope){

        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res=>{
          
          if(res.data.status === 200)
          {
            //swal("Success", res.data.message, "success")
          }

           else if(res.data.status === 401)
            {
                History.push('/')
             swal("Warning", res.data.message, "error");
            }

              
            
  
          });

    }


    const deleteCartItem = (e, cart_id) => {
        e.preventDefault();

        const thidClickedFunda = e.currentTarget;
        thidClickedFunda.innerText = "Removing";

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res=>{
          
            if(res.data.status === 200)
            {
                
              swal("Success", res.data.message, "success");
              thidClickedFunda.closest("tr").remove();
            
            }

            else if(res.data.status === 404)
            {
              
             swal("Warning", res.data.message, "error");
             thidClickedFunda.innerText = "Remove";
            }
  
                
              
    
            });

        

        //  axios.delete(`/api/delete-cartitem/${cart_id}`).then(res=>{

        // if(res.data.status === 200)
        // {
        //     thidClickedFunda.closest("tr").remove();
        //    swal("Success", res.data.message, "success")
        //     //console.log(res.data.message);
        // }
     

    }


    if(loading)
    {
        return <h4>Loading cart....</h4>
    }

    var cart_HTML = '';
    if(cart.length > 0)
    {
        cart_HTML = 
        <div>
        <div className="table-responsive">
        <table className="table table-bordered">
             <thead>
                 <tr>
                 <th>Image</th>
                 <th>Product</th>
                 <th className="text=center">Price</th>
                 <th className="text=center">Quantity</th>
                 <th className="text=center">Total Price</th>
                 <th>Remove</th>
               </tr>
             </thead>
             <tbody>
                 {cart.map( (item, idx) => {
                     totalCartPrice += item.product.selling_price * item.product_qty; 
                     return (

                   
                 <tr key={idx}>
                     <td width="10%">
                         <img src={`https://eco.fosl-ailesgroup.com/${item.product.image}`} alt="Product" width="50px" height="50px" />

                     </td>
                     <td>{item.product.name}</td>
                     <td width="15%" className="text-center">{item.product.selling_price}</td>
                     <td width="15%">
                     <div className="input-group">
                         <button  type="button" onClick={() => handleDecrement(item.id)}  className="input-group-text">-</button>
                         
                         <div className="form-control text-center">{item.product_qty}</div>
                         <button  type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                     </div>
                     </td>
                     <td width="15%" className="text-center">{item.product.selling_price * item.product_qty }</td>
                     <td width="10%">
                     <button  type="button"  onClick={(e) => deleteCartItem(e, item.id)} className="btn btn-danger btn-sm">Remove</button>

                     </td>
                 </tr>
                   )
                 })}
                 
             </tbody>
        </table>
    </div>
    <div className="row">
        <div className="col-md-4">
                    <div className="card card-body mt-3">
                        <h4>Sub Total:
                            <span className="float-end ">{totalCartPrice}</span>
                        </h4>
                        <h4>Grand Total:
                            <span className="float-end">{totalCartPrice}</span>
                        </h4>
                        <hr />
                        <Link to="/checkout" className="btn btn-primary"> Check out</Link>
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



    return(
        <div>
             <div className="py-3 bg-warning">
            <div className="container">
                <h6>Name /Cart</h6>
            </div>
   
        </div>

        <div className="py-4">
            <div className="container">
            <div className="row">
                <div className="col-md-12">
              {cart_HTML}
                </div>
                <div className="col-md-8">
                   

                </div>
                </div>
            </div>
   
        </div>

        </div>
    )

}



export default Cart;