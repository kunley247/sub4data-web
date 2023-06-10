import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactjsOverlayLoader from "reactjs-overlay-loader";
import swal from "sweetalert";

function Profile(){

    const [loading, setLoading] = useState(true);
    const [textInput, setTextInput] = useState({
        name: '',
        email: ''
    });

    const handleInput = (e) => {
        e.persist();
        setTextInput({ ...textInput, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = (e) => {        
        e.preventDefault();

        setLoading(true);
        axios.post(`api/update-user`, {name: textInput.name}).then((res) => {
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
        axios.get(`api/user/`).then((res) => {
            if (res.status === 200) {
                setTextInput(res.data);
            }
            setLoading(false);
        });
    }, []);


    return (
        <div className="container mt-5">
            <div className="text-muted h5 mb-4 pb-4 border-bottom">
                <b>Profile</b> Update /
            </div>
            <div className="bg-light card card-body col-md-6">
                <ReactjsOverlayLoader isActive={loading} 
                    icon={<img alt='loader' width={50} src={'http://localhost/sub4data-web/react/src/assets/admin/assets/img/loading.gif' }/>} 
                />

                <form onSubmit={handleProfileUpdate}>

                    <div className='form-group mb-3'>
                        <label>Email ID</label>
                        <input type='text' name="email"  value={textInput.email} disabled className='form-control' ></input>
                        <small className="text-info">Your email cannot be changed</small>
                    </div>

                    <div className='form-group mb-3'>
                        <label>Full Name</label>
                        <input type='text' name="name" onChange={handleInput} value={textInput.name} className='form-control' ></input>
                        <small className="text-danger">{textInput.error_list?.name}</small>
                    </div>

                    <div className='form-group mb-3'>
                        <button type='submit' className='btn btn-primary w-100'>Update profile</button>
                    </div>
                </form>
            </div>
        </div>

    );
}


export default Profile;