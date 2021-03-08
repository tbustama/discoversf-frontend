import React from "react";
import { ActionCable } from "react-actioncable-provider";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
export class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
  };

  componentDidMount = () => {
    let token = localStorage.token;
    fetch(`http://localhost:3000/conversations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((conversations) => this.setState({ conversations: conversations }));
  };

  handleClick = (id) => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation],
    });
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );
    conversation.messages = !conversation.messages.find(
      (m) => m.id === message.id
    )
      ? (conversation.messages = [...conversation.messages, message])
      : conversation.messages;
    this.setState({ conversations });
  };

  render = (props) => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div className="sidebarContainer">
          <h2>Messages</h2>
          <div className="message__list">
            {mapConversations(
              this.state.conversations,
              this.handleClick,
              this.props.user
            )}
          </div>
          {/* <NewConversationForm /> */}
        </div>
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
            user={this.props.user}
            className="messagesArea"
          />
        ) : null}
      </div>
    );
  };
}

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick, user) => {
  return conversations.map((conversation) => {
    let time = new Date(
      conversation.messages.length > 0 &&
        conversation.messages[conversation.messages.length - 1].created_at
    );
    let newTime = time.toString().split(" ");
    newTime.splice(5, 4, "PST");
    newTime.splice(0, 4);
    let conversationUser = conversation.title
      .split(",")
      .filter((name) => name !== user.full_name)[0];
    return (
      <div
        key={conversation.id}
        onClick={() => handleClick(conversation.id)}
        className="sidebarChat"
      >
        <div className="avatar-circle">
          <span className="initials">
            {conversationUser.split(" ")[0][0]}
            {conversationUser.split(" ")[1][0]}
          </span>
        </div>

        <div className="sidebarChat__info">
          <strong style={{ fontSize: "1.1em" }}>{conversationUser}</strong>
          <p>
            {conversation.messages.length > 0 &&
              conversation.messages[conversation.messages.length - 1].text}
          </p>
          <small>{conversation.messages && newTime.join(" ")}</small>
        </div>
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return {
    user: state.UserLogIn.user,
  };
};
export default connect(mapStateToProps)(ConversationsList);
