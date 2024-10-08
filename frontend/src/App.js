import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Context, reducer } from './contexts/globalContext';
import ReactjsOverlayLoader from "reactjs-overlay-loader";
import AppRoutes from './routes';
import { csrfToken, CustomCookieConsent, deleteCookie, get_local_storage_item, getCookie, initializeGoogleAnalytics, store_local_storage_item, toastifyFunction, url } from './util';


function App() {
    axios.defaults.baseURL = url();
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use(function (config) {
        const token = getCookie('auth_token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    const [stateLoading, setStateLoading] = React.useState(false);
    const [values, dispatch] = React.useReducer(reducer, {isLoading: false});

    React.useEffect(() => {
        initializeGoogleAnalytics()
        if(!get_local_storage_item('auth_role')) {
            store_local_storage_item('auth_role', 'public');
            window.location.reload();
        }
        if(get_local_storage_item('auth_role') !== "public" && !getCookie('auth_token') ) {
            store_local_storage_item('auth_role', 'public');
            window.location.reload();
        }

        if ( getCookie('auth_token')) {
            axios.get(`api/view-category`).then((res) => {
                if (res?.data.status === 200) {
                    dispatch({category: res.data.category});
                }            
            });
            
            axios.get(`api/user`).then((res) => {
                if (res?.status === 200) {
                    dispatch({user: res.data.data});
                }
            });

            axios.get(`api/view-transactions`).then((res) => {
                if (res?.data.status === 200) {
                    dispatch({transactions: res.data.data});
                }
            });
        }

        if(get_local_storage_item('auth_role') === "admin" && getCookie('auth_token')) {
            axios.get(`api/view-users`).then(res=>{
                if(res?.status===200){
                    dispatch({users: res?.data.users});
                }
                
            });
    
            axios.get(`api/view-transactions-admin`).then(res=>{
                if(res?.status===200){
                    dispatch({admin_transactions: res?.data.data});
                }
                
            });
            
            axios.get(`api/get-panel-value-admin`).then(res=>{
                if(res?.status===200){
                    dispatch({admin_panels: res?.data});
                }
                
            });
        }
    }, [])
    
    axios.interceptors.request.use(
        function (request) {
            setStateLoading(true);
            return request;
        },
        
        function (error) {
            console.error(error);
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        function (response) {
            setStateLoading(false);
            return response;
        },
        function (error) {
            if (error.response?.status === 403) {
                Swal.fire('Forbidden', error.response.data.message, 'warning').then(() => {
                    window.history.back();
                });
            } else if (error.response?.status === 419) {
                store_local_storage_item('auth_role', 'public');
                deleteCookie("auth_token")
                Swal.fire('Timeout', "Your session is timed out, login again", 'warning').then(() => {
                    window.location.replace("/login");
                });
            }else if (error.response?.status === 401) {
                store_local_storage_item('auth_role', 'public');
                deleteCookie("auth_token");
                Swal.fire('Unauthenticated', "Please login your account", 'warning').then(() => {
                    window.location.replace("/login");
                });
            } else {
                toastifyFunction(error.message);
            }
            setStateLoading(false);
            return Promise.reject(error);
        }
    );
    
    return (
        <div className="App">
            <Context.Provider value={{ globalValues: values, setGlobalValues: dispatch }}>
                <BrowserRouter>
                    <Switch>
                        <AppRoutes name="Index" />
                    </Switch>
                </BrowserRouter>
                <ReactjsOverlayLoader 
                    isActive={stateLoading} 
                    style={{zIndex: 1}} 
                    icon={<img alt='loader' width={50} src={`${url()}img/loading.gif`}/>} />
                <CustomCookieConsent />
            </Context.Provider>
        </div>
    );
}

export default App;
