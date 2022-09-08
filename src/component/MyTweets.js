import { Container}from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MytweetList from "./MytweetList";
let tweets = []
let dummy = []
const MyTweets = (props) => {
    let navigate=useNavigate();
    function onDeletehandler(name,tweetid)
    {
        console.log(name);
        console.log(tweetid);
        let form={name,tweetid}
        // fetch(`${name}/delete/${tweetId}`,{
        // method: 'DELETE',
        // headers: { 
        // 'Authorization':`Bearer ${localStorage.getItem("jwt")}` 
        // },
        // })
        fetch(`/publish`,{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${localStorage.getItem("jwt")}`
                ,'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: name,
                tweetId: tweetid
            })
        })
        .then(res => {
            console.log(res.status);
            props.updateList()
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
    }
    function onUpdateHandler(Name,TweetId,TweetContent)
    {
        navigate("/updateTweet",{state:{tweetId:TweetId,name:Name,updatelist:props.updateList(),tweetContent:TweetContent}})
    }
    function onCommentHandler(tweetid)
    {
        
    }
    return (
        <div>
            <div>

                <Container>
                    {props.myTweets.map(function (tweet, index) {
                        return (
                            <MytweetList tweet={tweet} deletTweet={onDeletehandler} updateTweet={onUpdateHandler} showComment={onCommentHandler}></MytweetList>
                        )
                    })}
                </Container>
            </div>
        </div>
    )
}

export default MyTweets;