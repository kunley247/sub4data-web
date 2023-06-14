import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactjsOverlayLoader from "reactjs-overlay-loader";
import swal from "sweetalert";

function EditUser(props){
    const user_id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [textInput, setTextInput] = useState({
        status: false
    });

    const handleInput = (e) => {
        e.persist();
        setTextInput({ ...textInput, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = (e) => {        
        e.preventDefault();

        setLoading(true);

        axios.post(`api/update-user/${textInput.id}`, textInput).then((res) => {
            if (res.data.status === 200) {

                swal('Success!', 'Profile data successfully updated', 'success').then(() => {
                    window.location.reload();
                });

            }else {
                swal('Unable to update!', 'Something went wrong, try again', 'error');
            }
            setLoading(false);
        });
    };

    useEffect(() => {

        setLoading(true);
        axios.get(`api/get-user/${user_id}`).then((res) => {
            if (res.data.status === 200) {
                setTextInput(res.data.data);
            }
            setLoading(false);
        });
    }, [user_id]);


    return (
        <div className="container mt-5">
            <div className="text-muted h5 mb-4 pb-4 border-bottom">
                <b>Profile</b> Update /
            </div>
            <div className="card">
                <div className="card-body">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className="nav-link active"
                                id="home-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#home"
                                type="button"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                User profile
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <Link
                                to={`/admin/transactions/${user_id}`}
                                className="nav-link"
                                id="otherdetails-tab"
                                type="button"
                            >
                                User transactions
                            </Link>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="card">
                            <div className="card-body">
                                <ReactjsOverlayLoader isActive={loading} 
                                    icon={<img alt='loader' width={50} src={'http://localhost/sub4data-web/react/src/assets/admin/assets/img/loading.gif' }/>} 
                                />

                                <form className="row" onSubmit={handleProfileUpdate}>
                                    <div className="col-md-6">
                                        <div className='form-group mb-3'>
                                            <label>Email ID</label>
                                            <input type='text' name="email"  value={textInput.email} onChange={handleInput} className='form-control' ></input>
                                        </div>
                                    </div>

                                     <div className="col-md-6">
                                        <div className='form-group mb-3'>
                                            <label>Full Name</label>
                                            <input type='text' name="name" onChange={handleInput} value={textInput.name} className='form-control' ></input>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="custom-control custom-checkbox mb-3">
                                            <label>Status</label>
                                            <input 
                                                type="checkbox"
                                                className="custom-control-input" 
                                                name="status"
                                                checked={textInput.status} 
                                                onChange={e => 
                                                    setTextInput({...textInput, status: e.target.checked})
                                                } 
                                            />
                                            <br />
                                            <small className="text-info">Status checked = Active / Unchecked = Inactive</small>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <div className="custom-control custom-checkbox mb-3">
                                            <label>Role</label>
                                            <input
                                                name="role_as"
                                                type="checkbox"
                                                className="custom-control-input" 
                                                checked={textInput.role_as  === 1} 
                                                onChange={e => 
                                                    setTextInput({...textInput, role_as: e.target.checked})
                                                } 
                                            />
                                            <br />
                                            <small className="text-info">Status checked = Admin / Unchecked = User</small>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="custom-control custom-checkbox mb-3">
                                            <label>Password reset</label>
                                            <input
                                                name="password"
                                                type="checkbox"
                                                checked={textInput.password} 
                                                className="custom-control-input" 
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    swal({
                                                        title: 'Are you sure?',
                                                        text: "Are you sure you want to reset this user's password?",
                                                        icon: 'warning',
                                                        buttons: true,
                                                        dangerMode: true
                                                    }).then((willDelete) => {
                                                        if (willDelete) {
                                                            setTextInput({...textInput, password: true});
                                                        } else {
                                                            setTextInput({...textInput, password: false});
                                                        }
                                                    });
                                                }}
                                            />
                                            <br />
                                            <small className="text-info">Password checked = Reset</small>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className='form-group mb-3'>
                                            <button type='submit' className='btn btn-primary'>Update User</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default EditUser;