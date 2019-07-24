import React, { Component } from 'react';


class Task extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    return (
      <li>{this.props.value.task}</li>
    )
  }
}


export default Task;
