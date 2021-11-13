import React from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  const signIn = async () => {
    let flag = 0;
    const account = props.account;
    const userCount = await props.hospital.methods.userCount().call();
    for (let i = 0; i < userCount; i++) {
      const user = await props.hospital.methods.users(i).call();
      if (user[0] === account) {
        flag = 1;
        props.history.push("/user");
      }
    }
    if (flag == 0) {
      window.alert("Sorry, it seems you are not registered");
    }
  };
  return (
    <div>
      <button onClick={signIn}>Sign in with blockchain</button>
    </div>
  );
}

export default withRouter(Login);
