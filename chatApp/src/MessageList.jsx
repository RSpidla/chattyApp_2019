import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  
  render() {
    const listMessages = this.props.messages.map(message => {
      if (message.type === 'incomingMessage')
      return (
        <Message
          message={message}  
          key={message.key}
        />
      );
    if (message.type === 'incomingNotification')
      return (
        <Notification
          message={message}  
          key={message.key}
        />
      );
    });
    return (
      <main className="messages">
        <ul>{listMessages}</ul>
      </main>
    );
  }
  
}

export default MessageList;