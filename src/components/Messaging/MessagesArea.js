import React from "react";
import { useRef, useEffect } from "react";
import NewMessageForm from "./NewMessageForm";
import { Toast, OverlayTrigger, Popover } from "react-bootstrap";
const MessagesArea = ({
  conversation: { id, title, messages, users },
  user,
}) => {
  const messageRef = useRef();
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.lastElementChild.scrollIntoView({
        behavior: "auto",
      });
    }
  });
  let otherUser = users.find((u) => u.id !== user.id);
  return (
    <div className="messagesArea">
      <div className="chat__header">
        <h4>
          To:{" "}
          <span className="chat__name">
            {title.split(",").filter((name) => name !== user.full_name)[0]}
          </span>
        </h4>
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom"
          overlay={
            <Popover className="forumCard">
              <Popover.Title as="h3" className="forumCard__header">
                <div
                  className="avatar-circle"
                  style={{ flex: "0.25", maxHeight: "53px" }}
                >
                  <span className="initials">
                    {otherUser.full_name.split(" ")[0][0]}
                    {otherUser.full_name.split(" ")[1][0]}
                  </span>
                </div>
                <div id="otherUser__name">{otherUser.username}</div>
              </Popover.Title>
              <Popover.Content className="forumCard__body">
                <strong>Bio:</strong> <br></br>
                {otherUser.bio}
              </Popover.Content>
            </Popover>
          }
          className="userDetails"
        >
          <strong className="details">Details</strong>
        </OverlayTrigger>
      </div>

      <ul id="toast-container" ref={messageRef}>
        <div></div>
        {orderedMessages(messages, user)}
      </ul>

      <NewMessageForm conversation_id={id} user={user} />
    </div>
  );
};

export default MessagesArea;

// helpers

const orderedMessages = (messages, user) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return sortedMessages.map((message) => {
    let time = new Date(message.created_at);
    let newTime = time.toString().split(" ");

    newTime.splice(5, 4, "PST");
    newTime.splice(0, 1);
    let style = user.id === message.user.id ? "toasty" : "received";
    return (
      <Toast id={style} className="message__box">
        {/* <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{message.user.username}</strong>
          <small>{newTime.join(" ")}</small>
        </Toast.Header> */}
        <Toast.Body style={{ borderRadius: "25px" }}>{message.text}</Toast.Body>
        <small>{newTime.join(" ")}</small>
      </Toast>
    );
  });
};
