import React,{useState,useEffect} from 'react'

function AppointMentAdmin() {
    const DataHospital = [
        {
            name : 'Derma-Care Clinic',
            num : 1,
        },
    ]
 
    return (
        <div className="appointment_page_user">
            {
                DataHospital.map(res=>{
                    return(
                        <div className="appointment_box">
                            <div className="appointment_admin_top">
                                <div>
                                    <h2>onGoing Token No. :<span> {res.num}</span></h2>
                                    <h2>{res.name}</h2>
                                </div>
                                <div>
                                    <h3>Predicted Time For The ongoing patiant is : <span>10 min</span></h3>
                                </div>
                                <div>
                                <h3>Taking Time : <span>00:00</span></h3>
                                </div>
                            </div>
                            <div className="appointment_admin_middle">
                                <button>Change-Token</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AppointMentAdmin
