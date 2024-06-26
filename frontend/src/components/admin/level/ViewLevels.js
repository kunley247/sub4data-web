import axios from "axios";
import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";


function ViewLevels(){

    
    const [levelsList, setLevelsList] = useState([]);

    const handleDelete = (e)=>{
        e.preventDefault();
        Swal.fire({

            title: "Are you sure?",
            text: "You will not be able to recover this imaginary level!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((res) => {
            if (res.isConfirmed) {
                
                axios.delete(`api/delete-level/${e.target.dataset.id}`).then(res=>{
                    if(res?.data.status===200){
                        Swal.fire("Deleted!", "Your imaginary level has been deleted.", "success");
                        setLevelsList(levelsList.filter(item=>item.id!==parseInt(e.target.dataset.id)));
                    } else {
                        Swal.fire("Cancelled", "Your imaginary level is safe :)", "error");

                    }
                });
                
            } else {
                Swal.fire("Your imaginary level is safe :)", "Your imaginary level is safe :)", "error");
                
            }
        });
    };

    useEffect(()=>{
        axios.get(`api/view-levels`).then(res=>{
            if(res?.status===200){
                setLevelsList(res?.data.levels);

                $(document).ready(function () {
                    $('table').DataTable();
                });
            }
            
        })
    },[]);

    return(
        <div className="container px-4">
            <div className="card mt-4">
                
                <div className="card-header">
                    <h4>Levels list</h4>
                    <Link to="/admin/add-level" className="btn btn-primary btn-sm float-end">Add level</Link>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Level</th>                                
                                <th>Percentage</th>
                                <th>Status</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            { levelsList.map((item, index)=> (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.level}</td>
                                        <td>{item.percentage}</td>
                                        <td>{item.status ===1 ? 'Shown' : 'Hidden'}</td>
                                        <td>
                                            <button onClick={handleDelete} data-id={item.id} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                        <td>
                                            <Link to={`/admin/edit-level/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewLevels;