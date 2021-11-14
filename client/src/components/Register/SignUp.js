import React, { useEffect, useState } from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';

function SignUp (props) {
    const [name, setName] = useState('');
    const [last, setlast] = useState('');
    const [age, setAge] = useState('');
    const [blood, setBlood] = useState('');
    const [contact, setContact] = useState();
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
        .register(name+last, age, blood, contact)
        .send({ from: props.account })
        .once('confirmation', () => {})
        .then(() => {
            console.log('done');
        });
    };

    return (
        <div className = "signup_form">
            <Form noValidate validated = {validated} id = "sign-up">
                <Row className = "mb-3">
                    <Form.Group as = {Col} md = "4" controlId = "validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type = "text"
                            value = {name}
                            onChange = {(e) => setName(e.target.value)}
                            placeholder = "First name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as = {Col} md = "4" controlId = "validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type = "text"
                            value = {last}
                            onChange = {(e) => setlast(e.target.value)}
                            placeholder = "Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as = {Col} md = "4" controlId = "validationCustomUsername">
                        <Form.Label>Mobile No.</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type = "number"
                                placeholder = "Mobile No."
                                value = {contact}
                                onChange = {(e) => setContact(e.target.value)}
                                aria-describedby = "inputGroupPrepend"
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className = "mb-3">
                    <Form.Group as = {Col} md = "6" controlId = "validationCustom03">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type = "number" value = {age}
                                      onChange = {(e) => setAge(e.target.value)} placeholder = "age" required/>
                        <Form.Control.Feedback type = "invalid">
                            Please Provide A valid Age.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as = {Col} md = "3" controlId = "validationCustom04">
                        <Form.Label>Blood Group</Form.Label>
                        <Form.Control type = "text" value = {blood}
                                      onChange = {(e) => setBlood(e.target.value)}
                                      placeholder = "Blood Group exp [B+]..." required/>
                    </Form.Group>
                </Row>
                <Button onClick = {Register} className = "firebase">Sign-up With Blockchain</Button>
            </Form>
        </div>
    );
}

export default SignUp;
