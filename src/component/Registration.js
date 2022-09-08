import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import "../styles/Registration.css"
import { Form, Button, Container } from 'react-bootstrap';

export default function Registration() {
    let navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const handleSubmit = (data) => {
        data.preventDefault();
        const newErrors = findFormErrors()
        console.log(newErrors)
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            let customerId = Math.floor(Math.random() * (999 - 100 + 1) + 100);

            console.log(form.firstname)
            console.log(JSON.stringify(form))
            fetch(`/signup`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            }).then(response => {
                console.log(response);
                localStorage.setItem("name",form.firstname)
                navigate('/directlogin', { state: {  userName: form.username, name: form.firstName } })
              })
              .catch(error => {
                console.log(error)
              })
        }
    }

    const findFormErrors = () => {
        const { firstname, lastName, password, username,phoneNumber} = form
        const newErrors = {}
        const emailregex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{1,})$/i;
        const nameregex = /^[aA-zZ\s]*$/
        const phone=/^[0-9]/
        if (!firstname || firstname === '') newErrors.firstname = 'cannot be blank!'
        else if (nameregex.test(firstname) === false) newErrors.firstname = 'can contain only letters and spaces'
        if (!lastName || lastName === '') newErrors.lastName = 'cannot be blank!'
        else if (nameregex.test(lastName) === false) newErrors.lastName = 'can contain only letters and spaces'
        if (emailregex.test(username) === false) newErrors.email = "invalid email(should contain a '.' & '@')"
        if (!password || password === '') newErrors.password = 'cannot be blank'
        if(phone.test(phoneNumber)===false) newErrors.phoneNumber='It can contain only Number'
        else if(!phoneNumber || phoneNumber==='') newErrors.phoneNumber='cannot be blank!'
        return newErrors
    }

    return (
        <div>
            <Header />
            <Container>
                <h3 className="Reg-Header">User Registration</h3>

                <Form.Group className="mb-3">
                    <Form.Label id="fname">First Name:</Form.Label>
                    <Form.Control type="text" aria-labelledby="fname" name="fname" placeholder="Firstname" onChange={e => setField('firstname', e.target.value)} isInvalid={!!errors.firstName} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.firstname}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label id="lname">Last Name:</Form.Label>
                    <Form.Control type="text" aria-labelledby="lname" name="lname" placeholder="Lastname" onChange={e => setField('lastName', e.target.value)} isInvalid={!!errors.lastName} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label id="email">Email/UserName</Form.Label><br />
                    <Form.Control type="text" aria-labelledby="email" data-testid="email" name="email" placeholder="Email" onChange={e => setField('username', e.target.value)} isInvalid={!!errors.email} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label id="password">Password</Form.Label><br />
                    <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Password" onChange={e => setField('password', e.target.value)} isInvalid={!!errors.password} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label id="phoneNumber">Phone Number</Form.Label><br />
                    <Form.Control type="text" aria-labelledby="phoneNumber" data-testid="phoneNumber" name="phoneNumber" placeholder="phoneNumber" onChange={e => setField('phoneNumber', e.target.value)} isInvalid={!!errors.phoneNumber} />
                    <Form.Control.Feedback type='invalid' data-testid="nameerr">
                        {errors.phoneNumber}
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="regButton">
                    <Button type='submit' onClick={handleSubmit}>Register</Button>
                </div>
            </Container>
        </div>
    )
}