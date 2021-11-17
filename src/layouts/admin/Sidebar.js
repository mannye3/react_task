import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';


const Sidebar = () => {
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`api/logout`).then(res => {
          if(res.data.status === 200)
          {
            localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    swal("Success",res.data.message,"success");
                    history.push('/');
          }
    
        })
      }

return (
  <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
  <div className="sb-sidenav-menu">
      <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <Link className="nav-link" to="/admin/dashboard">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Dashboard
          </Link>

        

          <Link className="nav-link" to="/admin/view-task">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              View Tasks
          </Link>

          <Link className="nav-link" to="/admin/add-task">
              <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
              Add Task
          </Link>

          



         
          <Link className="nav-link collapsed"  onClick={logoutSubmit} data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
              <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
              Logout
              <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
          </Link>
       
      </div>
  </div>
  <div className="sb-sidenav-footer">
      <div className="small">Logged in as:</div>
      Start Bootstrap
  </div>
</nav>
);
    



    
}
   





    export default Sidebar;