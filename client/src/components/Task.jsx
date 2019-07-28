import React, { Component } from 'react';
import styled from 'styled-components';


const Label = styled.label`
  flex-shrink: 0;
  padding: .5rem 1rem;
  color: rgb(0, 0, 0); 	
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: 'system-ui';
`;

const Lock = styled.label`
  flex-shrink: 0;
  padding: .5rem 1rem;
  color: rgb(180, 180, 180); 	
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  font-family: 'system-ui';
`;

const Box = styled.input`
  position: relative;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  appearance: none;
  outline: none; 
  background: white;
  cursor: pointer;
  border: 1px solid rgb(180, 180, 180);
  &::before {
    content: ' ';
    position: absolute;
    top: 50%;
    right: 50%;
    bottom: 50%;
    left: 50%;
    transition: all .1s;
    background: #00ff99;
  }
  &:checked{
    &::before {
      top: 2px;
      right: 2px;
      bottom: 2px;
      left: 2px;
    }
  }
`;

const Line = styled.div`
	border: 1px solid rgb(180, 180, 180);
  width: 500px;
	margin-top: 30px;
`;

const Container = styled.div`
	display: flex;
  align-items: center;
  margin: 20px;
`;

const Icon = styled.i`
	position: relative;
	flex-shrink: 0;
	width: 20px;
	height: 20px;
	background: white;
	cursor: pointer;
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
    
    let eachTask = !this.props.data.dependencyIds.length ? 
        <Container>
          <Box type="checkbox" onChange={this.handleCheckboxChange}/>
          <Label style={{color: 'rgb(0, 0, 0)'}}>{text}</Label>
        </Container> : 
        <Container>
          <Icon className="fas fa-lock"></Icon>  
          <Label style={{color: 'rgb(180, 180, 180)'}}>{text}</Label>
        </Container>
    
    return (
      <div >
		 	  {eachTask}
		 		<Line></Line>
		 	</div>
    )
  }
}


export default Task;

