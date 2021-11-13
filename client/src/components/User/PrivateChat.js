import React from 'react'
import { Link } from 'react-router-dom'

const chat_doctors = [
    {
        no : 1,
        name : 'Dr Hetu Patel',
        qualifications : 'Secondary Physician'
    },
    {
        no : 2,
        name : 'Dr. Natik Patil',
        qualifications :'MBBS Pathologist'
    },
    {
        no : 3,
        name : 'Dr. Zaid Bhimala',
        qualifications : 'MD Surgery Expert'
    }
]
function PrivateChat() {
    return (
        <div className="Private_Chat_Div">
            {
                chat_doctors.map(res=>{
                    return(
                        <div className="Private_Chat_Div_box">
                            <div>
                                <h2>Room : {res.no}</h2>
                                <h3>Name : {res.name}</h3>
                            </div>
                            <div>
                                <h3>Qualifications : {res.qualifications}</h3>
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default PrivateChat
