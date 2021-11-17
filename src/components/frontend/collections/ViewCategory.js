import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function ViewCategory(){
    const [loading, setloading ] = useState(true);
    const [category, setCategory ] = useState([]);
    useEffect(() => {
        let isMounted = true;


        axios.get(`/api/getCategory`).then(res=>{
          if(isMounted)
          {
            if(res.status === 200)
            {

                setCategory(res.data.category)
                setloading(false);
            }

          }
            
          

        });

        return () => {
            isMounted = false;
        }
      
    }, []);

    if(loading)
    {
        return <h4>Loading Categories.</h4>
    }

    
    else
    {
       var showCategorylist = '';
       showCategorylist = category.map( (item, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                <div className="card">
                    <Link to="">
                            <img src="" className="w-100" alt={item.name} />
                        </Link>
                    <div className="card-body">
                    <Link to={`collections/${item.slug}`}>
                    <h5>{item.name}</h5>
                    </Link>
                    </div>
                </div>
       
            </div>
            )
        });
    }

    return (
        <div>
       
     <div className="py-3 bg-warning">
         <div className="container">
             <h6>Category Page</h6>
         </div>

     </div>

     <div className="py-3">
         <div className="container">
             <div className="row">
                {showCategorylist}
             </div>

         </div>
     </div>
         
        </div>
    )
}



export default ViewCategory;