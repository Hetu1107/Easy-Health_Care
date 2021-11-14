import React, { useEffect, useState } from "react";
import { Form,Row,Col,InputGroup,Button } from "react-bootstrap";

function SignUp(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [blood, setBlood] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
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
    // <div>
    //   <div>
    //     Name:
    //     <input
    //       type="text"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     Age:
    //     <input
    //       type="number"
    //       value={age}
    //       onChange={(e) => setAge(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     Blood Group:
    //     <input
    //       type="text"
    //       value={blood}
    //       onChange={(e) => setBlood(e.target.value)}
    //     />
    //   </div>
    //   <button onClick={Register}>Register</button>
    // </div>
    <div className="signup_form">
        <Form noValidate validated={validated} onSubmit={handleSubmit} id="sign-up">
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Mobile No.</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              placeholder="Mobile No."
              aria-describedby="inputGroupPrepend"
              required
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" placeholder="age" required />
          <Form.Control.Feedback type="invalid">
            Please Provide A valid Age.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Blood Group</Form.Label>
          <Form.Control type="text" placeholder="Blood Group exp [B+]..." required /> 
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="email" required />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" md="3">
      <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password..." required />
      </Form.Group>
      <Button type="submit" className="firebase">Sign-up With Blockchain</Button>
      <Button type="submit" md="3" className="firebase">Sign-up With Firebase</Button>
    </Form>
    </div>
  );
}

export default SignUp;
