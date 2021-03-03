import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
class NewMessageForm extends React.Component {
  state = {
    text: "",
    conversation_id: this.props.conversation_id,
    user_id: this.props.user.id,
  };

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      conversation_id: nextProps.conversation_id,
      user_id: nextProps.user.id,
    });
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    this.setState({
      ...this.state,
      user_id: this.props.user.id,
    });
    e.preventDefault();
    let token = localStorage.token;
    fetch(`http://localhost:3000/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(this.state),
    });
    this.setState({ text: "" });
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <InputGroup className="mb-3">
            <FormControl
              aria-describedby="basic-addon2"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <InputGroup.Append>
              <Button variant="outline-light" type="submit">
                Submit
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {/* <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" /> */}
        </form>
      </div>
    );
  };
}

export default NewMessageForm;
