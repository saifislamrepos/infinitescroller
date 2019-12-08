import React, { Component } from 'react';
class header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message : 'header'
    };
   
  }

  handleClick  () {
    console.log(this)
  }
  render() {
    const message = this.state.message;
    return (
      <header className="component">
        <p className="fs-12">
          {message}
        </p>
    </header>
    );
  }
  
}
export default header;