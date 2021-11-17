import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Task from '../components/admin/task/Task';
import ViewTask from '../components/admin/task/ViewTask';
import EditTask from '../components/admin/task/EditTask';









const routes = [

    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    { path: '/admin/add-task', exact: true, name: 'Category', component: Task},
    { path: '/admin/view-task', exact: true, name: 'ViewTask', component: ViewTask},
    { path: '/admin/edit-task/:id', exact: true, name: 'EditTask', component: EditTask},
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
   
    

];



export default routes;