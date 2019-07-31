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

const FinBox = styled.input`
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
  {
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

	handleCheckboxChange (e) {
   
		this.setState({ 
      checked: !this.state.checked,
    })

    this.props.updateRecord({
      completedAt: new Date().toLocaleString(),
      id: e.target.id
    })
  }

  render() {
    
    let taskData = this.props.data;
    let completedTaskIds = this.props.finTaskIds;
    let unLockTask = taskData.dependencyIds.every(id => completedTaskIds.includes(id));
    
    let text = this.state.checked ? <strike>{this.props.data.task}</strike> : this.props.data.task;

    let eachTask = (unLockTask && taskData.completedAt !== null) ? 
      <Container>
        <FinBox id={taskData.id} type="checkbox"/>
        <Label style={{color: 'rgb(0, 0, 0)'}}><strike>{taskData.task}</strike></Label>
      </Container > : 
      (!unLockTask) ?
      <Container>
        <Icon id={taskData.id} className="fas fa-lock"></Icon>  
        <Label style={{color: 'rgb(180, 180, 180)'}}>{taskData.task}</Label>
      </Container> : 
      <Container >
        <Box type="checkbox" id={taskData.id} onChange={(e) => this.handleCheckboxChange(e)}/>
        <Label style={{color: 'rgb(0, 0, 0)'}}>{text}</Label>
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

