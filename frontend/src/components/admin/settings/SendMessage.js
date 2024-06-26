import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

import { useHistory } from "react-router-dom";
import { getPermission } from "../../../util";
import { Context } from "../../../contexts/globalContext";

function SendMessage(){
    const { globalValues } = React.useContext(Context);
    const history = useHistory();
    const [textInput, setTextInput] = useState({
        title: '',
        message: '',
        type: 'bulk_email'
    });

    const handleInput = (e) => {
        e.persist();
        setTextInput({ ...textInput, [e.target.name]: e.target.value });
    };

    const handleSendMessage = (e) => {        
        e.preventDefault();

        
        axios.post('/api/send-bulk-email', textInput).then((res) => {
            if(res?.data.status === 200){
                Swal.fire('Success!', 'Message sent successfully', 'success').then(() => {
                    history.push('/admin/dashboard');
                });
            } else {
                Swal.fire('Error!', res?.data.errors, 'error');
            }
            
        });
        
    };

    return (
        <div className="container mt-5">
            <div className="text-muted mb-4 pb-4 border-bottom">
                <b>Messages</b> to users |
            </div>
            <div className="bg-light card card-body col-md-6">
               

                <form onSubmit={handleSendMessage}>
                    <p className='alert alert-info'>
                        Messages here will be sent across to Every User of this Application
                    </p>
                    
                    <div className='form-group mb-3'>
                        <label>Title</label>
                        <input type='text' disabled={!getPermission(globalValues.permissions, 'create_messages')} name="title" onChange={handleInput} value={textInput.title} className='form-control' required ></input>
                    </div>
                    
                    <div className='form-group mb-3'>
                        <label>Message body</label>
                        <textarea type='float' disabled={!getPermission(globalValues.permissions, 'create_messages')} name="message" style={{height: 300}} onChange={handleInput} required value={textInput.amount} className='form-control' ></textarea>
                    </div>

                    <div className='form-group mb-3'>
                        <button type='submit' disabled={!getPermission(globalValues.permissions, 'create_messages')} className='btn btn-primary w-100'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>

    );
}


export default SendMessage;