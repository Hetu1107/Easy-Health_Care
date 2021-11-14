import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('/');

const chat_doctors = [
    {
        no: 1,
        name: 'Dr Hetu Patel',
        qualifications: 'Secondary Physician',
    },
    {
        no: 2,
        name: 'Dr. Natik Patil',
        qualifications: 'MBBS Pathologist',
    },
    {
        no: 3,
        name: 'Dr. Zaid Bhimala',
        qualifications: 'MD Surgery Expert',
    },
];

function PrivateChat (props) {
    const joinRoom = async (roomId, name) => {
        socket.emit('room-check', roomId);
        let full = 0;
        await new Promise((resolve, reject) => {
            socket.on('check', (users) => {
                if (users[roomId] < 2 || !users[roomId]) {
                    full = 1;
                }
                resolve(true);
            });
        }).then(async () => {
            if (full == 0) {
                window.alert('room full');
            } else {
                const account = props.account;
                if (account === '0x34c9C9F9191b0c215F8654064BDF2A35aa755e8D') {
                    props.history.push({
                        pathname: '/chat',
                        state: { roomId, userId: name },
                    });
                } else {
                    props.history.push({
                        pathname: '/chat',
                        state: { roomId, userId: 'Guest' },
                    });
                }
            }
        });
    };

    return (
        <div className = "Private_Chat_Div">
            {chat_doctors.map((res) => {
                return (
                    <div
                        onClick = {() => joinRoom(res.no, res.name)}
                        className = "Private_Chat_Div_box"
                    >
                        <div>
                            <h2>Room : {res.no}</h2>
                            <h3>Name : {res.name}</h3>
                        </div>
                        <div>
                            <h3>Qualifications : {res.qualifications}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default withRouter(PrivateChat);
