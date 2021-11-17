import React, {useEffect, useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';


function AddProduct(){
    
    const [categorylist, setCategorylist] = useState([]);
  


    useEffect(() => {
        axios.get(`/api/all-category`).then(res=>{

            if(res.data.status === 200)
            {
                setCategorylist(res.data.category)
            }

        });
    }, []);

    const [productInput, setProduct] = useState({
        category_id: '',
        slug: '',
        brand: '',
        selling_price: '',
        original_price: '',
        qty: '',
        image: '',
        featured: '',
        popular: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_descrip: '', 
       error_list: [],
    });

    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);



    const handleInput = (e) =>{
        e.persist();
        setProduct({...productInput, [e.target.name]: e.target.value });
        
    }


    const handImage = (e) =>{
        e.persist();
        setPicture({ image:e.target.files[0]});
        
    }

    const submitProduct = (e) => {
     
        e.preventDefault();

        const formData =  new FormData();
        formData.append('image', picture.image);
        formData.append('slug',productInput.slug);
        formData.append('name',productInput.name);
        formData.append('description',productInput.description);
        formData.append('status',productInput.status);
        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('meta_descrip',productInput.meta_descrip);
        formData.append('category_id',productInput.category_id);
        formData.append('brand',productInput.brand);
        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('qty',productInput.qty);
        formData.append('featured',productInput.featured);
        formData.append('popular',productInput.popular);


        axios.post(`/api/store-product`, formData).then(res =>{
            if(res.data.status === 200)
            {
                    swal("Success", res.data.message, "success");
                    setProduct({...productInput,
                        category_id: '',
                    slug: '',
                    brand: '',
                    selling_price: '',
                    original_price: '',
                    qty: '',
                    image: '',
                    featured: '',
                    popular: '',
                    name: '',
                    description: '',
                    status: '',
                    meta_title: '',
                    meta_keyword: '',
                    meta_descrip: '', });
                    //document.getElementById('CATEGORY_FORM').reset();
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandatory","", "error");
                setError(res.data.errors);
            }
        })
    }


    return (
        <div className="container-fluid px-4">
        <h1 className="mt-4">Add Product</h1>



        <form onSubmit={submitProduct} id="CATEGORY_FORM" encType="multipart/form-data">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

    <div className="form-group mb-3">
        <label>Select Category</label>
        <select name="category_id" onChange={handleInput}  value={productInput.category_id} className="form-control">
        <option>Select Category</option>
            {
                categorylist.map( (item) =>{
                    return (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    )
                })
            }

            
           
        </select>
        
        <span className="text-danger">{errorlist.category_id}</span>
       

    </div>

    <div className="form-group mb-3">
        <label>Slug</label>
        <input type="text" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
        <span className="text-danger">{errorlist.slug}</span>
       

    </div>


    <div className="form-group mb-3">
        <label>Name</label>
        <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
        <span className="text-danger">{errorlist.name}</span>
       

    </div>

    <div className="form-group mb-3">
        <label> Description</label>
        <textarea  name="description" onChange={handleInput} value={productInput.description}className="form-control"> </textarea>
   

    </div>



  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

    <div className="form-group mb-3">
        <label>Meta Title</label>
        <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control" />
        <span className="text-danger">{errorlist.meta_title}</span>
      

    </div>

<div className="form-group mb-3">
        <label>Meta Keywords</label>
        <textarea  name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className="form-control"> </textarea>
       

    </div>


    <div className="form-group mb-3">
        <label>Meta Description</label>
        <textarea  name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} className="form-control"> </textarea>
       

    </div>
  </div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
    <div className="form-group mb-3">
        <label>Selling price</label>
        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
        <span className="text-danger">{errorlist.selling_price}</span>
      

    </div>

<div className="form-group mb-3">
        <label>Original price</label>
        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className="form-control" />
        <span className="text-danger">{errorlist.original_price}</span>

     
       

    </div>


    <div className="form-group mb-3">
        <label>Quantity</label>
        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className="form-control" />
        <span className="text-danger">{errorlist.qty}</span>

    </div>


    <div className="form-group mb-3">
        <label>Brand</label>
        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className="form-control" />
        <span className="text-danger">{errorlist.brand}</span>
    </div>



    <div className="form-group mb-3">
        <label>Image</label>
        <input type="file" name="image" onChange={handImage} className="form-control" />
        <span className="text-danger">{errorlist.image}</span>
    </div>

    <div className="form-group mb-3">
                    <label>Feature</label>
                    <input type="checkbox"  name="featured"  onChange={handleInput} value={productInput.featured} />
                   
                    (checked=show)

                </div>

                <div className="form-group mb-3">
                    <label>popular</label>
                    <input type="checkbox"  name="popular"  onChange={handleInput} value={productInput.popular} />
                   
                    (checked=show)

                </div>


                <div className="form-group mb-3">
                    <label>Feature</label>
                    <input type="checkbox"  name="featured"  onChange={handleInput} value={productInput.featured} />
                   
                    (checked=show)

                </div>




   

  


  </div>
</div>
        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
        </form>
    </div>
    )
}



export default AddProduct;