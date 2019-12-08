import React, { Component } from 'react';
class text extends  React.Component{
   constructor(props) {
      super(props);
      this.state = {
        message : 'sample text'
      };
     
   }
   render(){
      const message = this.state.message;
      return(
        <p className = "text-comp"> 
          {message}
        </p>
      );
   }
}
export default text;