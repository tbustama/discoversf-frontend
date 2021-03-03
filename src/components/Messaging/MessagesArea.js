import React from "react";
import NewMessageForm from "./NewMessageForm";
import { Toast } from "react-bootstrap";
const MessagesArea = ({ conversation: { id, title, messages }, user }) => {
  return (
    <div className="messagesArea">
      <h2>{title}</h2>
      <ul id="toast-container">{orderedMessages(messages, user)}</ul>
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
    let style = user.id === message.user.id ? "toasty" : null;
    return (
      <Toast id={style}>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{message.user.username}</strong>
          <small>{newTime.join(" ")}</small>
        </Toast.Header>
        <Toast.Body style={{ background: "rgba(48,46,46)" }}>
          {message.text}
        </Toast.Body>
      </Toast>
    );
  });
};
