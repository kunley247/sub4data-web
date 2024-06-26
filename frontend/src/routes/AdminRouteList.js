import Dashboard from '../components/admin/Dashboard';

import AddCategory from '../components/admin/category/AddCategory';
import ViewCategory from '../components/admin/category/ViewCategory';
import EditCategory from '../components/admin/category/EditCategory';

import EditACL from '../components/admin/acl/EditACL';
import ViewAdmins from '../components/admin/acl/ViewAdmins';


import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';

import AddServices from '../components/admin/services/AddServices';
import ViewServices from '../components/admin/services/ViewServices';
import EditServices from '../components/admin/services/EditServices';

import Profile from '../components/admin/Profile';
import EditUser from '../components/admin/user/EditUser';
import CreditUser from '../components/admin/user/CreditUser';
import DebitUser from '../components/admin/user/DebitUser';
import Transactions from '../components/admin/Transactions';
import ViewUsers from '../components/admin/user/ViewUsers';
import SendMessage from '../components/admin/settings/SendMessage';
import ViewActivities from '../components/admin/settings/ViewActivities';
import AddLevel from '../components/admin/level/AddLevel';
import EditLevel from '../components/admin/level/EditLevel';
import ViewLevels from '../components/admin/level/ViewLevels';
import AddApi from '../components/admin/api/AddApi';
import ViewApis from '../components/admin/api/ViewApis';
import EditApi from '../components/admin/api/EditApi';
import AddIPs from '../components/admin/ips/AddIPs';
import EditIPs from '../components/admin/ips/EditIPs';
import ViewIPs from '../components/admin/ips/ViewIPs';
import ViewMerchants from '../components/admin/merchants/ViewMerchants';
import AddDiscount from '../components/admin/discounts/AddDiscount';
import ViewDiscounts from '../components/admin/discounts/ViewDiscounts';

const AdminRouteList =[
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },    

    { path: '/admin/view-admins', exact: true, name: 'ViewAdmins', component: ViewAdmins },
    { path: '/admin/edit-acls/:id', exact: true, name: 'EditACL', component: EditACL },
    
    { path: '/admin/add-category', exact: true, name: 'AddCategory', component: AddCategory },
    { path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory },
    { path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory },

    { path: '/admin/add-ip', exact: true, name: 'AddIPs', component: AddIPs },
    { path: '/admin/edit-ips/:id', exact: true, name: 'EditIPs', component: EditIPs },
    { path: '/admin/view-ips', exact: true, name: 'ViewIPs', component: ViewIPs },

    { path: '/admin/add-discount', exact: true, name: 'AddDiscount', component: AddDiscount },
    { path: '/admin/view-discounts', exact: true, name: 'ViewDiscounts', component: ViewDiscounts },

    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/view-product/:id', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },

    { path: '/admin/view-merchants', exact: true, name: 'AddServices', component: ViewMerchants },
    
    { path: '/admin/add-services', exact: true, name: 'AddServices', component: AddServices },
    { path: '/admin/view-services', exact: true, name: 'ViewServices', component: ViewServices },
    { path: '/admin/view-services/:id', exact: true, name: 'ViewServices', component: ViewServices },
    { path: '/admin/edit-services/:id', exact: true, name: 'EditServices', component: EditServices },
    
    { path: '/admin/edit-user/:id', exact: true, name: 'EditUser', component: EditUser },
    { path: '/admin/credit-user', exact: true, name: 'CreditUser', component: CreditUser },
    { path: '/admin/debit-user', exact: true, name: 'DebitUser', component: DebitUser },
    { path: '/admin/transactions', exact: true, name: 'Transactions', component: Transactions },
    { path: '/admin/transactions/:id', exact: true, name: 'Transactions', component: Transactions },

    { path: '/admin/view-users', exact: true, name: 'ViewUsers', component: ViewUsers },
    { path: '/admin/send-message', exact: true, name: 'SendMessage', component: SendMessage },
    { path: '/admin/activities', exact: true, name: 'ViewActivities', component: ViewActivities },
    { path: '/admin/add-level', exact: true, name: 'AddLevel', component: AddLevel },
    { path: '/admin/edit-level/:id', exact: true, name: 'EditLevel', component: EditLevel },
    { path: '/admin/view-levels', exact: true, name: 'ViewLevels', component: ViewLevels },
    { path: '/admin/add-api', exact: true, name: 'AddApi', component: AddApi },
    { path: '/admin/view-apis', exact: true, name: 'ViewApis', component: ViewApis },
    { path: '/admin/edit-api/:id', exact: true, name: 'EditApi', component: EditApi },
    
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile }

];

export default AdminRouteList;