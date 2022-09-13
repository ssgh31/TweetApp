import { FaMoneyCheck, FaUserSecret } from "react-icons/fa";
import {
  Container,
  Card,
  Row,
  Col,
  Modal,
  Table,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";
import { url } from "./Url";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
let comments = [];
const MytweetList = (props) => {
  let [comment, setComments] = useState(comments);
  let [showComment, setShowComment] = useState(false);
  let [Reply, setReply] = useState("");
  let [likeButton, setlikeButon] = useState("primary");
  let [likedisable, setlikeDisable] = useState(false);
  let [likecount, setlikecount] = useState(0);
  const location = useLocation();
  const event = new Date(props.tweet.date);
  let month=event.toLocaleString('en-US',{month:'long'})
  let tweetdate=event.toLocaleString('en-US',{day:'2-digit'})
  let year=event.getFullYear()
  let todaydate=new Date();
  let Day=""
  if(todaydate.getDate()>tweetdate)
  {
    Day=todaydate.getDate()-tweetdate+" days Ago"
  }
  else{
    Day="Todays Post";
  }
  const hideShowComment = () => setShowComment(false);
  let buttondiable = false;
  let today = new Date();
  if (location.pathname==='/success') {
    buttondiable = false;
  } else {
    buttondiable = true;
  }

  //delete handlar
  function DeletHandler() {
    console.log(props.tweet.id);
    props.deletTweet(props.tweet.username, props.tweet.id);
  }

  //update Handler
  function UpdateHandler() {
    props.updateTweet(props.tweet.username, props.tweet.id, props.tweet.descip);
  }

  //CommentHandler
  function CommentHandler() {
    fetch(`${url}/getallreply/${props.tweet.id}`, {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        if(res.status===404)
        {
          setShowComment(true);
          alert("No Comment found");
        }
        else{
        return res.json().then((data) => {
          comment = data;
       
          setComments(comment);
          setShowComment(true);
        });
        }
      })
    console.log(comment);
  }

  //replyHandler
  function replyHandler(e) {
    e.preventDefault();
    fetch(`${url}/${location.state.userName}/reply/${props.tweet.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        reply: Reply,
      }),
    }).then((res) => {
      if (res.status == 200) {
        CommentHandler();
      }
    });
  }

  //Handle Like
  function handleLike(e) {
    e.preventDefault();
    fetch(`${url}/${location.state.userName}/like/${props.tweet.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        fetchallLikes();
        setlikeButon("error");
        setlikeDisable(true);
      }
    });
  }

  //Fetch All Like
  function fetchallLikes() {
    fetch(`${url}/${location.state.userName}/getallLike/${props.tweet.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        likecount = data.count
        setlikecount(likecount);
        console.log(location.state.userName)
        console.log(data.userLiked)
        if(data.userLiked)
        {
          setlikeButon("error");
        }
        setlikeDisable(data.userLiked);
      });
  }
  useEffect(() => {
    fetchallLikes();
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <FaUserSecret className="m-1" />
                <b>{props.tweet.username} {event.getHours()}hr : {event.getMinutes()}mi</b>
              </Card.Header>
              <Card.Body>
                <Card.Text key={props.tweet.id}>{props.tweet.descip}</Card.Text>
              </Card.Body>
              <Card.Footer>Tweet Post Time : {Day} ({tweetdate} {month} {year})</Card.Footer>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  "& > *": {
                    m: 1,
                  },
                }}
              >
                <ButtonGroup
                  variant="outlined"  
                  aria-label="outlined button group"
                >
                  <Button
                    color="warning"
                    onClick={DeletHandler}
                    disabled={buttondiable}
                  >
                    {" "}
                    <DeleteForeverIcon />
                  </Button>
                  <Button onClick={UpdateHandler} disabled={buttondiable}>
                    Update your Tweet!!{" "}
                  </Button>
                  <Button onClick={CommentHandler}>
                    <CommentRoundedIcon />
                  </Button>
                </ButtonGroup>
                <Fab
                  aria-label="like"
                  size="small"
                  onClick={handleLike}
                  disabled={likedisable}
                >
                  <FavoriteIcon color={likeButton}></FavoriteIcon>
                  {likecount}
                </Fab>
              </Box>
            </Card>
          </Col>
        </Row>
        <Modal show={showComment}>
          <ModalHeader>
            <Button onClick={hideShowComment}>
              <CloseFullscreenIcon />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>UserName</th>
                  <th>Reply</th>
                  <th>Time Published</th>
                </tr>
              </thead>
              {comment.map((reply, k) => (
                <tr>
                  <td>{reply.userName}</td>
                  <td>{reply.reply}</td>
                  <td>{reply.date[0]+"/"+reply.date[1]+"/"+reply.date[2]}</td>
                </tr>
              ))}
            </Table>
          </ModalBody>
          <ModalFooter>
            <input
              type="text"
              placeholder="Tweet your reply"
              onChange={(e) => setReply(e.target.value)}
            />
            <Button onClick={replyHandler}>
              Reply
              <SendIcon />
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};
export default MytweetList;