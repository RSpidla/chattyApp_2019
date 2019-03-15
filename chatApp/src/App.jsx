import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from "uuid/v1";

const ChattyPageLayout = props => {

  return (
    <div>
      <header className="hg__header gradient-light-linear">
        <nav className="navbar">
        <img className="mothership" src="http://localhost:3000/build/mothership.png" alt="Mothership Chat" ></img>
          <a href="/" className="navbar-brand">
            Mothership Chat
          </a>
          <span className="users">{props.numberOfClients} User(s) Online</span>
        </nav>
      </header>
      <MessageList messages={props.messages} />
      <ChatBar
        submitMessage={props.submitMessage}
        changeUser={props.changeUser}
      />
    </div>
  );

};

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      userColour: "",
      currentUser: { name: "" },
      numberOfClients: 0,
      messages: []
    };
    this.webSocket = new WebSocket("ws://localhost:3001/");
    this.submitMessage = this.submitMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  submitMessage = event => {

    if (event.key === "Enter") {
      const key = uuidv1();
      const content = event.target.value;
      let image = "";
      const arr = content.split(" ");
      for (let i of arr) {
        if (i.match(/[^/]+(jpg|png|gif)$/)) {
          image = i;
        }
      }
      const message = {
        nameColour: this.state.userColour,
        type: "incomingMessage",
        key: key,
        username: this.state.currentUser.name,
        content: content,
        image: image
      };
      this.webSocket.send(JSON.stringify(message));
      event.target.value = '';
    }
    
  };

  changeUser = event => {

    if (event.key === "Enter") {
      const key = uuidv1();
      const id = uuidv1();
      const newUsername = event.target.value;
      const currentUser = this.state.currentUser.name;
      const newUserUpdate = {
        nameColour: this.state.userColour,
        type: "incomingNotification",
        newUsername: newUsername,
        id: id,
        key: key,
        notification: `${currentUser} changed their name to ${newUsername}`
      };
      this.setState({
        currentUser: { name: newUsername }
      });
      this.webSocket.send(JSON.stringify(newUserUpdate));
      event.target.value = '';
    }

  };

  componentDidMount() {

    this.webSocket.onopen = () => {
      console.log("Connected to WebSockets Server");
      console.log("_______________");
    };
    this.webSocket.onmessage = event => {
      const parsedData = JSON.parse(event.data);
      console.log("Event:");
      console.log(event);
      console.log("______________________________");
      if (parsedData.counter) {
        const numberOfClients = parsedData.counter;
        this.setState({ numberOfClients: numberOfClients });
        console.log("Number of Clients:");
        console.log(numberOfClients);
        console.log("______________________________");
      } else if (parsedData.userID && parsedData.userColour) {
        const userID = parsedData.userID;
        const userColour = parsedData.userColour;
        this.setState({
          currentUser: { name: `Anonymous User #${userID}` },
          userColour: userColour
        });
        console.log("User ID:");
        console.log(userID);
        console.log("User Colour:");
        console.log(userColour);
        console.log("______________________________");
      } else {
        switch (parsedData.type) {
          case "incomingNotification":
            const notifications = this.state.messages.concat(parsedData);
            this.setState({ messages: notifications });
            break;
          case "incomingMessage":
            const messages = this.state.messages.concat(parsedData);
            this.setState({ messages: messages });
            break;
        }
      }
    };
  }

  render() {
    return (
      <ChattyPageLayout
        numberOfClients={this.state.numberOfClients}
        messages={this.state.messages}
        submitMessage={this.submitMessage}
        changeUser={this.changeUser}
      />
    );
  }

}

export default App;