import React, { Component } from 'react';

class Notification extends Component {
  
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
        <div className="message__system">{notification}</div>
      </li>
    );
  }
  
}

export default Notification;