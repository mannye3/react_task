import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


function ViewProduct()

{

    const [loading, setloading ] = useState(true);
    const [productlist, setProductlist ] = useState([]);

    useEffect(() => {
        document.title = "View Products";

        axios.get(`/api/view-product`).then(res=>{
         

            if(res.data.status === 200)
            {
                //console.log(res.data.products);
                setProductlist(res.data.products)
            }

            setloading(false);

        });
      
    }, []);



    var viewproduct_HTMLTABLE = "";
    if(loading)
    {
        return <h4>Loading Product....</h4>
    }

    else
    {
        var ProductStatus = '';
        viewproduct_HTMLTABLE = 
        productlist.map( (item) => {
           if( item.status === '0')
           {
            ProductStatus = 'Shown';
           }else if(item.status === '1')
           {
            ProductStatus = 'Hidden';
           }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`https://eco.fosl-ailesgroup.com/${item.image}`} width="50px" alt={item.name} /></td>
                  
                    <td>
                        <Link to={`edit-product/${item.id}`}  className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                       {ProductStatus}
                    </td>
                </tr>
            )
        });
    }



return(
    <div className="container px-4">
    <div className="row">
        <div className="col-md-12">
                    <div className="card mt-4">
                    <div className="card-header">
                        <h4>Product List
                        </h4>
                        <Link to={'add-product'} className="btn btn-primary btn-sm- float-end">Add Product</Link>

                        </div>
                            <div className="card-body">

                                <table className="table table-bordered table-stripe">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Category Name</th>
                                            <th>Product Name</th>
                                            <th>Slling Price</th>
                                            <th>Image</th>
                                            <th>Edit</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {viewproduct_HTMLTABLE}
                                    </tbody>

                                </table>

                            </div>
                    </div>
        </div>
    </div>
</div>
)
}

export default ViewProduct;