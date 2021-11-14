import React, { useEffect, useState } from "react";
import "../style/Chat.css";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

const socket = io("/");

function Chat(props) {
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit(
      "join-room",
      props.location.state.roomId,
      props.location.state.userId
    );
    socket.on("user-connected", (userId, user) => {
      console.log("user joined", userId, user);
    });
  }, []);

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChats((chats) => [...chats, payload]);
    });
  }, []);

  const Send_chat = (e) => {
    e.preventDefault();
    socket.emit("chat", props.location.state.roomId, {
      message: input,
      username: props.location.state.userId,
    });
    setInput("");
  };

  const leaveRoom = (roomId, userId) => {
    socket.emit("leave-room", roomId, userId);
  };

  useEffect(() => {
    socket.on("room-left", (userId) => {
      setChats([])
      props.history.push("/user");
      window.location.reload(true)
    });
  });

  return (
    <div className="main_chat_component">
      <div className="main_chat_head">
        <h3>Name Of Doc.</h3>
        <button
          onClick={() =>
            leaveRoom(props.location.state.roomId, props.location.state.userId)
          }
        >
          Exit : <i className="fas fa-door-open"></i>
        </button>
      </div>
      <div className="main_chat_middle">
        {chats.map((res) => {
          return (
            <div className="Chat_box">
              <div>
                <h4>{res.username}</h4>
              </div>
              <div>
                <h3>{res.message}</h3>
              </div>
            </div>
          );
        })}
      </div>
      <form className="main_chat_form" onSubmit={Send_chat}>
        <input
          type="text"
          placeholder="type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <i class="fas fa-paper-plane"></i>
      </form>
    </div>
  );
}

export default withRouter(Chat);
