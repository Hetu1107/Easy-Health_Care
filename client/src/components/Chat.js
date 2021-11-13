import React, { useEffect, useState } from 'react'
import '../style/Chat.css'

function Chat() {
    const [chats,setChats] = useState([])
    const [input,setInput] = useState('');

    const Send_chat =(e)=>{
        e.preventDefault();
        setChats([...chats,{name : 'hetu',text : input}]);
        setInput('');
    }
    return (
        <div className="main_chat_component">
            <div className="main_chat_head">
                <h3>Name Of Doc.</h3>
                <button>Exit : <i class="fas fa-door-open"></i></button>
            </div>
            <div className="main_chat_middle">
            {
                chats.map(res=>{
                    return(

                <div className="Chat_box">
                <div>
                    <h4>{res.name}</h4>
                    </div>
                    <div>
                    <h3>{res.text}</h3>
                    </div>
                </div>
                    )
                })
            }
            </div>
            <form className="main_chat_form" onSubmit={(e)=>Send_chat(e)}>
                <input type="text" placeholder="type here..." value={input} onChange={(e)=>setInput(e.target.value)}/>
                <i class="fas fa-paper-plane"></i>
            </form>
        </div>
    )
}

export default Chat
