import React, { Component } from 'react';

class Message extends Component {
  
  render() {
    const {
      content,
      username,
      notification,
      nameColour,
      image
    } = this.props.message;
    const styles = {
      color: "#" + nameColour
    };
    return (
      <li>
        <div className="message">
          <span className="message-username" style={styles}>{username}</span>
          <span className="message-content">{content}</span>
        </div>
        <img src={image} alt={image} />
      </li>
    );
  }

}

export default Message;