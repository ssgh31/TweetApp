import { Button } from "@mui/material"
import { Modal, ModalBody } from "react-bootstrap"
import { useState } from "react"
import { Card, ModalHeader } from "react-bootstrap"
import { FaUserSecret } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom"
import MytweetList from "./MytweetList"

export function ShowUserList(props){
    let[listTweet,setlistTweet]=useState([])
    let[showsTweets,setshowTweet]=useState(false)
    function fetchMyTweets() {
        fetch(`username/${props.users.username}`, {
            method: 'GET',
            headers: { 
            'Authorization':`Bearer ${localStorage.getItem("jwt")}` 
        },
        })
            .then(res => {
                console.log(res)
                return res.json()
            }).catch(err=>{
                console.log(err)
            })
            .then(data => {
                console.log(data)
                listTweet = data
                setlistTweet(listTweet)
                console.log(listTweet)
            })
            console.log(listTweet)
    }
    let navigate=useNavigate()
    let location=useLocation()
    function viewtweet(e)
    {
        e.preventDefault()
        fetchMyTweets();
        setshowTweet(true);
    }
    function hideShowComment(e)
    {
        setshowTweet(false);
    }
    function onDeletehandler(){
        console.log("kya bhai kyu tang kr raha hai ")
      }
      function onUpdateHandler(){}
      function onCommentHandler(){}
    console.log(props.users)
    return(
        <div>
        <Card>
        <Card.Header>
        <>
                    <FaUserSecret className='m-1' />
                            <Card.Text><b>{props.users.firstname} {props.users.lastname}</b></Card.Text>
                </>
        </Card.Header>
        <Card.Body>
                <Card.Link key={props.users.id}>{props.users.username}</Card.Link>
        </Card.Body>
        <Card.Footer>
        <Button onClick={viewtweet}>
        Cick to view All Tweet of {props.users.username}
        </Button>
        </Card.Footer>
        </Card>
        <Modal show={showsTweets}>
        <ModalHeader>
            <Button onClick={hideShowComment}>Close</Button>
            </ModalHeader>
            <ModalBody>
        {
            listTweet.map(function (tweet, index) {
                return (
                    <MytweetList tweet={tweet} 
                    deletTweet={onDeletehandler} 
                    updateTweet={onUpdateHandler} 
                    showComment={onCommentHandler}/>
                )}
            )
        }
        </ModalBody>
        </Modal>
        </div>
    )
}