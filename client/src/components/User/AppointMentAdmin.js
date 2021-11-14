import React, { useState, useEffect } from 'react';
import db from '../../FireBase';

function AppointMentAdmin (props) {
    const DataHospital = [
        {
            name: 'Derma-Care Clinic',
        },
    ];
    const [token, setToken] = useState('');
    const [time, setTime] = useState();

    useEffect(async () => {
        const token = await props.hospital.methods.tokenStart().call();
        setToken(token);
        const current = await props.hospital.methods.patients(token).call();
        const time = current[1];
        setTime(time / 100);
    }, [props.zero]);

    const Start = async (e) => {
        e.preventDefault();
        const token = await props.hospital.methods.tokenStart().call();
        console.log(token);
        setToken(token);
        const current = await props.hospital.methods.patients(token).call();
        const time = current[1];
        setTime(time / 100);
    };

    const NextPatient = async (e) => {
        e.preventDefault();
        let account = props.account;
        let hospital = props.hospital;
        const tokenNum = await hospital.methods.tokenNum().call();
        console.log(tokenNum);
        const tokenStart = await hospital.methods.tokenStart().call();
        if (tokenNum - tokenStart >= 0) {
            await hospital.methods.deleteAppointments(tokenStart).send({ from: account }).on('confirmation', () => {
            }).then(async () => {
                const token = await hospital.methods.tokenStart().call();
                setToken(token);
                const current = await props.hospital.methods.patients(token).call();
                const time = current[1];
                setTime(time / 100);
                props.predicted(time);
                const totalTime = await props.hospital.methods.time().call();
                db.collection('time').doc('BlRD2Dn5dljXLvCdflUz').update({
                    time: totalTime / 100,
                });
            });
        } else {
            window.alert('No Next Patient');
        }

    };

    return (
        <div className = "appointment_page_user">
            {
                DataHospital.map(res => {
                    return (
                        <div className = "appointment_box">
                            <div className = "appointment_admin_top">
                                <div>
                                    <h2>onGoing Token No. :<span> {token}</span></h2>
                                    <h2>{res.name}</h2>
                                </div>
                                <div>
                                    <h3>Predicted Time For The ongoing patiant is : <span>{time}</span></h3>
                                </div>
                                <div>
                                    {/*<h3>Taking Time : <span>00:00</span></h3>*/}
                                </div>
                            </div>
                            <div className = "appointment_admin_middle">
                                <button onClick = {NextPatient}>Next Patient</button>
                            </div>
                            <div className = "appointment_admin_middle">
                                <button onClick = {Start}>Start</button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default AppointMentAdmin;
