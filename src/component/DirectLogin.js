import { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate ,useLocation} from "react-router"
import Header from "./Header"
import "../styles/Login.css"
import { url } from "./Url"

export default function DirectLogin() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        let uid = ''
        if(username!=='')
        {
        let form={username,password}
        fetch(`${url}/login`,{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        }).then((response)=>{
            console.log(response)
            if(response.status===200){
                response.text().
                then((body)=>{
                    let jwt1=body;
                    localStorage.setItem("jwt",jwt1);
                    navigate('/success', { state: {userName: username }})
                    // localStorage.setItem("flag","true");
                });
            }
            else{
                 alert('Enter correct credentials or register!!')
            }
        })
           
        }
        else {
            alert("Enter your credentials")
        }
    }
    const redirettoregister = () => {
        navigate("/register")
    }

   
let title=""
if(localStorage.getItem("name")==='')
{
    title="Welcome to tweet app, Login to view tweets from your friends";
}
else{
    title=`Hey ${localStorage.getItem("name")}, You are successfully registered!! Please Login`;
}
    return (
        <div>
            <Header />
            <Container>
                <h4 className="LoginHeader">{title}</h4>
                <Form>
                    <Form.Group>
                        <Form.Label id="username">Username</Form.Label>
                        <Form.Control type="text" aria-labelledby="username" data-testid="username" name="username" placeholder="Enter your username!" onChange={e => setUserName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label id="password">Password</Form.Label>
                        <Form.Control type="password" aria-labelledby="password" data-testid="password" name="password" placeholder="Enter your password!" onChange={e => setPassword(e.target.value)} required='true' />
                    </Form.Group>
                    <div className="regButton">
                        <Button variant="primary" onClick={handleSubmit} formNoValidate>LOGIN</Button>{' '}
                        <Button aria-hidden="true" variant="success" onClick={redirettoregister}>REGISTER</Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}