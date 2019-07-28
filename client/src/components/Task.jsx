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


class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      lockedTask: undefined,
		}
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		
	}

	handleCheckboxChange(){
			this.setState({ 
			checked: !this.state.checked,
		})
  }
  
  // componentDidUpdate(prevProps) {
  //   if (prevProps.indeterminate !== this.props.indeterminate) {
  //     this.selector.indeterminate = this.props.indeterminate;
  //   }
  // }


  render() {
    
    let text = this.state.checked ? <strike>{this.props.data.task}</strike> : this.props.data.task;
		
    return (
      <div >
		 		<Container>
		 			<Box type="checkbox" onChange={this.handleCheckboxChange} />
		 			<Label >{text}</Label> 
		 		</Container>
		 		<Line></Line>
		 	</div>
    )
  }
}


export default Task;
