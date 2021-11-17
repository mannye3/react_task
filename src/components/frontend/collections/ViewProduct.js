import React, {useEffect,useState} from 'react';
import {  useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';




function ViewProduct(props){

    const [loading, setloading ] = useState(true);
    const History = useHistory();
    const [product, setProduct ] = useState([]);
    const [category, setCategory ] = useState([]);

    const productCount = product.length;
    useEffect(() => {
        let isMounted = true;

        const product_slug = props.match.params.slug
        axios.get(`/api/getProducts/${product_slug}`).then(res=>{
          if(isMounted)
          {
            if(res.status === 200)
            {

                setProduct(res.data.product_data.product)
                setCategory(res.data.product_data.category)
                setloading(false);
            }

            else if(res.data.status === 400)
            {
               
             swal("Warning", res.data.message, "");
            
           
            }




            else if(res.data.status === 404)
            {
                History.push('/collections')
             swal("Warning", res.data.message, "error");
            
           
            }

          }
            
          

        });

        return () => {
            isMounted = false;
        }
      
    }, [props.match.params.slug, History]);

    if(loading)
    {
        return <h4>Loading product......</h4>
    }

    else 
    {
        var showProductlist ='';

        if(productCount)
        {

        
        showProductlist = product.map( (item, idx) => {

            return (
                <div className="col-md-3" key={idx}>
                <div className="card">
                <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                    <img src={`https://eco.fosl-ailesgroup.com/${item.image}`} className="w-100" alt={item.name} />
                    </Link>
                    <div className="card-body">
                    <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                    <h5>{item.name}</h5>
                    </Link>
                    </div>
                </div>
       
            </div>
            )
        });
    }
    else
    {
        showProductlist =
        <div className="col-md-12">
        <h5>No product availabe for {category.name} </h5>
        </div>
    }
    }
    return (
        <div>
       
        <div className="py-3 bg-warning">
            <div className="container">
                <h6>Collections / {category.name}</h6>
            </div>
   
        </div>
   
        <div className="py-3">
            <div className="container">
                <div className="row">
                   {showProductlist}
                </div>
   
            </div>
        </div>
        </div>
    )
}



export default ViewProduct;