import React, { Component } from 'react';
import styled from 'styled-components';


const Group = styled.h4`
	display: inline-block;
	margin-left: 30px;
	margin-top: 30px;
	color: rgb(0, 0, 0); 	
`;

const Line = styled.div`
	border: 1px solid rgb(180, 180, 180);
	width: 500px;
	margin-top: 20px;
`;

const Container = styled.div`
	display: block;
	height: 70px;
`;

const Icon = styled.i`
	display: inline-flex;
`;

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
			checked: false,
		}
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		
	}

	handleCheckboxChange(){
			this.setState({ 
			checked: !this.state.checked,
		})
	}


  render() {
    
    let text = this.state.checked ? <strike>{this.props.data.task}</strike> : this.props.data.task;
		
    return (
      <div >
		 		<Container>
		 			<input type="checkbox" onChange={this.handleCheckboxChange} />
		 			<Group >{text}</Group> 
		 		</Container>
		 		<Line></Line>
		 	</div>
    )
  }
}


export default Task;
