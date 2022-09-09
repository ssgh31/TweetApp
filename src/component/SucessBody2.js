import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Button, Container, Col, Row, Card } from 'react-bootstrap'
import './../styles/SuccessBody.css'
import PostTweets from "./PostTweets";
import MyTweets from "./MyTweets";
import { url } from "./Url";
let tweets = []
export default function SuccessBody2(props) {
    let [myTweets, setMyTweets] = useState(tweets)
    let location = useLocation();
    let navigate = useNavigate();
    console.log(location)
    function fetchMyTweets() {
        fetch(`${url}/username/${location.state.userName}`, {
            method: 'GET',
            headers: { 
            'Authorization':`Bearer ${localStorage.getItem("jwt")}` 
        },
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                myTweets = data
                setMyTweets(myTweets)
            })
    }
    useEffect(() => {
        console.log(location)
        fetchMyTweets()
        console.log(myTweets);
    },[])
    return (
        <div>
            <Container className='p-4'>
            <PostTweets userName={location.state.userName} updateList={fetchMyTweets}></PostTweets>
            <MyTweets myTweets={myTweets} updateList={fetchMyTweets}></MyTweets>
            </Container>
        </div>
    )
}