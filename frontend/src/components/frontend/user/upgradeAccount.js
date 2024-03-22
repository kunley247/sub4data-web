import axios from 'axios';
import React from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';



function UpgradeAccount() {
    const history=useHistory();
    const [levelLists, setLevelLists] = React.useState([]);
    const [currentLevel, setCurrentLevel] = React.useState();
    const [selectedLevel, setSelectedLevel] = React.useState();
    
    React.useEffect(() => {
        axios.get(`/api/view-levels`).then((res) => {
            if (res?.data.status === 200) {
                setLevelLists(res?.data.levels);
            } else {
                Swal.fire('Error', res?.data.errors, 'error');
            }            
        });

        axios.get(`api/user`).then((res) => {
            if (res?.status === 200) {
                setCurrentLevel(res?.data.data.level);
            }
        });
    }, []);

    const handleUpgrade = (e) => {
        e.persist();
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure to proceed with your account upgrade?',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then((res) => {
            if (res.isConfirmed) {
                axios.post(`/api/upgrade-user`, {level: selectedLevel}).then((res) => {
                    if ( res?.data.status === 200 ) {
                        Swal.fire('Success', res?.data.message, 'success').then(() => {
                            history.push(`/user/dashboard`);
                        })
                    } else {
                        Swal.fire('Error', res?.data.errors, 'error');
                    }
                });
            }
        });
    };

    return (
        <div className="container mt-5">
            <div className="text-muted mb-4 pb-4 border-bottom">
                <b>Account</b> Upgrade /
            </div>
            <div className="bg-light card card-body col-md-6">
                <ol className="list-group list-group-numbered">
                    { levelLists.map((item, i) => (
                        <div key={i} >
                            <li 
                                className={`
                                    list-group-item d-flex justify-content-between align-items-start
                                    ${currentLevel >= item.level && 'list-group-item-primary'} 
                                    ${selectedLevel === item.level && 'active'} 
                                    ${currentLevel >= item.level && 'disabled'}
                                `}                          
                                onClick={() => {
                                    if (currentLevel < item.level) {
                                        setSelectedLevel(item.level)
                                    }
                                }}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.name}</div>
                                    Upgrade with ₦{item.upgrade_fee} and enjoy ₦{item.percentage}% on every transactions
                                </div>
                            </li>
                            <br />
                        </div>
                    ))}
                </ol>

                <div className="form-group mt-4">
                        <button
                            disabled={!selectedLevel}
                            className="btn btn-primary w-100"
                            onClick={handleUpgrade}
                        >
                            Proceed
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default UpgradeAccount;