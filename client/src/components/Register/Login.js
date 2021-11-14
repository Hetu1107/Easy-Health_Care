import React,{useState} from "react";
import { withRouter } from "react-router-dom";
import { Form,Row,Col,InputGroup,Button } from "react-bootstrap";

function Login(props) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
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
    // <div>
    //   <button onClick={signIn}>Sign in with blockchain</button>
    // </div>
    <div className="signup_form">
        <Form noValidate validated={validated} onSubmit={handleSubmit} id="sign-up">
        <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="email" required />
        </Form.Group>
        <Form.Group as={Col} md="3">
      <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password..." required />
      </Form.Group>
        </Row>
        <Button type="submit" className="firebase">Login</Button>
      <Button type="submit" md="3" className="firebasemeta">Login As A Guest</Button>
        </Form>
  </div>
  );
}

export default withRouter(Login);
