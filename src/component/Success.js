import { useLocation, useNavigate } from "react-router";
import Menu from "./NavBar"
import SuccessBody2 from "./SucessBody2";
export default function Success() {
    const location = useLocation();
    let navigate = useNavigate()
    console.log(location)
    if(!location.state){
        navigate('/')
    }
 
    return (
        <div>
            <Menu/>
            <SuccessBody2 props={{ state: { location } }} />
        </div>
    )
}