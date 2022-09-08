import React, { useState } from 'react'
import {  Col, Button, Form, Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router'

const UpdateTweet = () => {

    let navigate = useNavigate()
    let location = useLocation()
    let index = useState()
    let [tweet, setTweet] = useState('')
    let [showUpdate, setShowUpdate] = useState(true)
    const handleClose = () => navigate('/success',{state:{userName:location.state.name}});

    function changeTweet() {
        index = location.state.tweetId
        console.log(index)
        if(tweet!==''){
        fetch(`${location.state.name}/update/${index}`, {
            method: 'PUT',
            headers: {
                'Authorization':`Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                discription:tweet
            })
        }).then((res) => {
            if (res.status === 200) {
                alert("Tweet successfully Updated")
                setShowUpdate(false)
                //location.state.updatelist;
                //console.log(location.state.name)
                navigate('/success',{state:{userName:location.state.name}})
            } else {
                alert("try again!!")
            }
        })
    }
        console.log(tweet)
    }

    return (
        <div>
            <Modal show={showUpdate}>
                <ModalHeader>
                    <ModalTitle>Update Tweet</ModalTitle>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label className='p-2'>Previous Tweet</Form.Label>
                            <Form.Control disabled className='p-2' type='text' placeholder={location.state.tweetContent}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='p-2'>Enter new Tweet</Form.Label>
                            <Form.Control className='p-2' type="text" name="newTweet" placeholder="Enter new Tweet" onChange={e => setTweet(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <center>
                        <Col><Button type='submit' onClick={changeTweet}>Update</Button></Col>
                    </center>
                </ModalFooter>


            </Modal>
        </div>

    )
}

export default UpdateTweet