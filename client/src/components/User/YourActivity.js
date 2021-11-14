import React, { useEffect, useState } from "react";

function YourActivity(props) {
  const [token, setToken] = useState(0);
  const [time, setTime] = useState(0);
  const [f, setF] = useState(0);
  const [currentToken, setCurrentToken] = useState(0);

  useEffect(async () => {
    const t = await props.hospital.methods?.tokenStart().call();
    const currentToken = await props.hospital.methods?.patients(t).call();
    if (currentToken) {
      setCurrentToken(currentToken[0]);
    }
    const total = await props.hospital.methods?.tokenNum().call();
    let num = 0;
    let flag = 0;
    for (let i = t; i <= total; i++) {
      const user = await props.hospital.methods?.patients(i).call();
      if (user[2] === props.account) {
        setToken(user[0]);
        num = user[0];
        setTime(user[1] / 100);
        flag = 1;
        setF(1);
      }
    }
    if (flag === 1) {
      let time = 0;
      for (let i = t; i < num; i++) {
        const user = await props.hospital.methods?.patients(i).call();
        time += user[1] / 100;
      }
      setTime(time);
    }
  }, []);

  return (
    <>
      {f === 1 ? (
        <div className="appointment_page_user">
          return (
          <div className="appointment_box">
            <div className="appointment_admin_top">
              <div>
                <h2>
                  Your Token No. :<span> {token}</span>
                </h2>
                <h2>Derma - care clinic</h2>
              </div>
              <div>
                <h3>
                  Your Turn Can be in : <span>{time} minutes</span>
                </h3>
              </div>
              <div className="appointment_admin_top">
                <div>
                  <h2>
                    Current token number: <span>{currentToken}</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          );
        </div>
      ) : null}
    </>
  );
}

export default YourActivity;
