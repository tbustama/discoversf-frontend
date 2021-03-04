import React from "react";
import { ActionCable } from "react-actioncable-provider";
import NewConversationForm from "./NewConversationForm";
import MessagesArea from "./MessagesArea";
import Cable from "./Cable";

class ConversationsList extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
  };

  componentDidMount = () => {
    fetch(`http://localhost:3000/conversations`)
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
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = (props) => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList" style={{ display: "flex" }}>
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
        <div style={{ flex: "auto" }}>
          <h2>Threads</h2>
          <ul>
            {mapConversations(this.state.conversations, this.handleClick)}
          </ul>
          <NewConversationForm />
        </div>
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
            user={this.props.user}
            style={{ flex: "auto" }}
          />
        ) : null}
      </div>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map((conversation) => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.title}
      </li>
    );
  });
};
