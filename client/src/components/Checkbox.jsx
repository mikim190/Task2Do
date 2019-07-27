import React, { Component } from 'react';
import styled from 'styled-components';

const Main = styled.div`
	margin-left: 10px;
	color: rgb(120, 120, 120);
	font-family: 'system-ui';
`;
const Group = styled.h4`
	display: inline-block;
	margin-left: 30px;
	margin-top: 30px;
	color: rgb(0, 0, 0); 	
`;
const Group1 = styled.h4`
	display: inline-block;
	margin-left: 30px;
	margin-top: 30px;
	color: rgb(180, 180, 180); 	
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

class Checkbox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: false
		}
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		
	}

	handleCheckboxChange(){
		
		this.setState({ 
			checked: !this.state.checked 
		})
	}

	render() {
		const tasks = this.props.showTask;
	
		let style = {
			textDecoration: this.state.checked ? 'line-through' : 'none',
		};
		
		let task = tasks.map((each,ind) => 
			<div key={ind}>
				<Container>
					<input type="checkbox" onChange={this.handleCheckboxChange}></input> 
					<Group style={style}>{each.task}</Group>
				</Container>
				<Line></Line>
			</div>
		);
		
		return (
			<Main>
				<Line></Line>
				{/* <Container>
					<Icon className="fas fa-lock"></Icon><Group1 style={style}>Locked Task</Group1>
				</Container> */}
				{task}
					
			</Main>
		)
	}
}

export default Checkbox

