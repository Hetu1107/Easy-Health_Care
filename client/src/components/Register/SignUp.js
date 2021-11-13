import React, { useEffect, useState } from "react";

function SignUp(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [blood, setBlood] = useState("");
  const Register = async (e) => {
    e.preventDefault();
    await props.hospital.methods
      .register(name, age, blood)
      .send({ from: props.account })
      .once("confirmation", () => {})
      .then(() => {
        console.log("done");
      });
  };

  useEffect(async () => {
    const userCount = await props.hospital?.methods?.userCount().call();
    console.log(userCount);
    for (let i = 0; i < userCount; i++) {
      const user = await props.hospital.methods.users(i).call();
      const detail = {
        account: user[0],
        name: user[1],
        age: user[2],
        blood: user[3],
      };
      console.log(detail);
    }
  }, [props.hospital]);
  return (
    <div>
      <div>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        Blood Group:
        <input
          type="text"
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
        />
      </div>
      <button onClick={Register}>Register</button>
    </div>
  );
}

export default SignUp;
