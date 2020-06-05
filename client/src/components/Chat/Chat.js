import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import openSocket from "socket.io-client";

import Avatar from "@material-ui/core/Avatar";
import { Container } from "@material-ui/core";
import { ChatService } from "../../services";
import NewMessage from "./NewMessage";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 15,
    paddingBottom: 50,
    height: "70vh",
  },
  list: {
    marginBottom: theme.spacing(3),
    maxHeight: "100%",
    overflow: "auto",
  },
}));

const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);

  const ChatDomRef = useRef();

  const addMessage = (message) => {
    setMessages((oldMessages) => {
      return oldMessages.concat([message]);
    });

    if (ChatDomRef.current) {
      ChatDomRef.current.scrollTop = ChatDomRef.current.scrollHeight;
    }
  };

  const getMessages = async () => {
    const response = await ChatService.getAllMessages();
    const updatedMessages = [...messages];
    updatedMessages.push(response.data.data.getMessages);
    setMessages(updatedMessages[0]);
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    console.log("messages", messages);
    const socket = openSocket("http://localhost:5000");
    socket.on("messageSent", (data) => {
      // console.log(data);
      addMessage(data.newMessage);
    });
  }, []);
  return (
    <Container>
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Chat
        </Typography>
        <List className={classes.list} ref={ChatDomRef}>
          {messages.map(({ updatedAt, user, message }) => (
            <ListItem button key={updatedAt}>
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.profilePic} />
              </ListItemAvatar>
              <ListItemText
                primary={user ? user.name : "Anonymous"}
                secondary={message}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <NewMessage />
    </Container>
  );
};

export default Chat;
