import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { Loader } from "../Global";

function TransferFund(){
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [textInput, setTextIput] = useState({
        user_id: '',
        email: '',
        amount: ''
    });

    const handleInput = (e) => {
        e.persist();
        setTextIput({ ...textInput, [e.target.name]: e.target.value });
    };

    const handleDebitTransaction = (e) => {        
        e.preventDefault();

        if (textInput.amount === '' || textInput.email === '') {
            swal('Error!', 'Please fill all fields', 'error');
            return;
        }
        if (textInput.amount > 5000) {
            swal('Error!', 'Amount should not be greater than 5,000', 'error');
            return;
        }
           
        setLoading(true);
        axios.get(`/api/verify-email/${textInput.email}`).then((res) => {
            if (res.data.status === 200) {                
                swal({
                    title: res.data.data.name,
                    text: `Are you sure you want to credit this user with ${textInput.amount}`,
                    icon: "warning",
                    buttons: true,
                    dangerMode: true
                }).then((willDelete) => {
                    if (willDelete) {
                        setLoading(true);
                        axios.put(`/api/transfer-fund/`, {...textInput, user_id: res.data.data.user_id}).then((res2) => {
                            if (res2.data.status === 200) {
                                swal('Sucess!', `${res.data.data.name} was successfully credited`,'success').then((result) => {
                                    history.push('/user/dashboard');
                                });
                            } else {
                                swal('Error!', res2.data.errors, 'error');
                            }
                            setLoading(false);
                        });
                    }
                });
            } else {                
                swal('Error!', res.data.errors, 'error');
            }
            setLoading(false);
        });
    };

    return (
        <div className="container mt-5">
            <div className="text-muted h5 mb-4 pb-4 border-bottom">
                <b>Transfer</b> Fund /
            </div>
            <div className="bg-light card card-body col-md-6">
                <Loader isActive={loading} />

                <form onSubmit={handleDebitTransaction}>

                    <div className='form-group mb-3'>
                        <label>User Email</label>
                        <input type='email' name="email" onChange={handleInput} value={textInput.email} className='form-control' ></input>
                    </div>

                    <div className='form-group mb-3'>
                        <label>Amount</label>
                        <input type='float' name="amount" onChange={handleInput} value={textInput.amount} className='form-control' ></input>
                    </div>

                    <div className='form-group mb-3'>
                        <button type='submit' className='btn btn-primary w-100'>Credit User</button>
                    </div>
                </form>
            </div>
        </div>

    );
}


export default TransferFund;