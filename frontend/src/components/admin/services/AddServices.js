import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

function AddServices() {
    const history = useHistory();
    const [productList, setproductList] = useState([]);
    const [errorList, setError] = useState([]);
    const [servicesInput, setservices] = useState({
        product_id: '',
        name: '',
        description: '',
        price: '',
        status: true
    });


    const handleInput = (e) => {
        e.persist();
        setservices({ ...servicesInput, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        
        axios.get(`api/view-product`).then((res) => {
            if (res?.data.status === 200) {
                setproductList(res?.data.product);
            }
            
        });

        return () => {};
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        
        axios.post(`api/store-services`, servicesInput).then((res) => {
            if (res?.data.status === 200) {
                Swal.fire('Success', res?.data.message, 'success').then(() =>{
                    window.location.reload();
                });
            } else if (res?.data.status === 422 ) {
                Swal.fire('All fields are mandatory', '', 'error');
                setError(res?.data.errors);
            }
            else if (res?.data.status === 409 ) {
                Swal.fire('Error', res?.data.message, 'warning');
                setError(res?.data.message);
            }else {
                setError([]);
                Swal.fire('Error', res?.data.message, 'error');
                history.push('admin/view-services');
            }
            
        });
    };

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                
                <div className="card-header">
                    <h4>
                        Add services |
                        <Link to="/admin/view-services" className="btn btn-primary btn-sm float-end">
                            View services
                        </Link>
                    </h4>
                </div>
                <form className="card-body" encType="multipart/form-data" onSubmit={handleSubmit} id="add-services-form">
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
                                    Home
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="otherdetails-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#otherdetails"
                                    type="button"
                                    role="tab"
                                    aria-controls="otherdetails"
                                    aria-selected="false"
                                >
                                    Other details
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div
                                className="tab-pane fade show active"
                                id="home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                            >
                                <div className="form-group mb-3">
                                    <label>Select product</label>
                                    <select
                                        name="product_id"
                                        onChange={handleInput}
                                        value={servicesInput.product_id}
                                        defaultValue={servicesInput.product_id}
                                        className="form-select"
                                    >
                                        <option>Select product</option>
                                        {productList.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>
                                                    {item.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <small className="text-danger">{errorList?.product_id}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleInput}
                                        value={servicesInput.name}
                                        className="form-control"
                                    />
                                    <small className="text-danger">{errorList?.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description (Optional)</label>
                                    <textarea
                                        name="description"
                                        onChange={handleInput}
                                        value={servicesInput.description}
                                        className="form-control"
                                    ></textarea>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="otherdetails"
                                role="tabpanel"
                                aria-labelledby="otherdetails-tab"
                            >
                                <div className="row">
                                    <div className="col-md-4 form-group mb-3">
                                        <label>API service id</label>
                                        <input type="text" onChange={handleInput} name="api_service_id" className="form-control" />
                                        <small className="text-info">Copy this from the API server's end</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Price</label>
                                        <input type="float" onChange={handleInput} name="price" className="form-control" />
                                        <small className="text-danger">{errorList?.price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (Checked=avialable)</label>
                                        <input
                                            type="checkbox"
                                            name="status"
                                            onChange={handleInput}
                                            value={servicesInput.status}
                                            defaultChecked={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                </form>
                <div className="card-footer">
                    <button form='add-services-form' className="btn btn-primary" type="submit">Add service</button>
                </div>
            </div>
        </div>
    );
}

export default AddServices;
