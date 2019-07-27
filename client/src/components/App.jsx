import React, { Component } from 'react';
import data from '../../../public/data.js';
import Checkbox from './Checkbox.jsx';
import styled from 'styled-components';

const Main = styled.div`
	margin-left: 50px;
	color: rgb(120, 120, 120);
	font-family: 'system-ui';
`;

const Group = styled.h4`
	display: inline-block;
	margin-left: 30px;
	margin-bottom: 1px;
	margin-top: 30px;
	color: rgb(0, 0, 0); 
	
`;

const Line = styled.div`
	border: 1px solid rgb(180, 180, 180);
	width: 500px;
	margin-top: 20px;
`;

const Status = styled.p`
	margin-left: 40px;
	margin-top: 1px;
	color: rgb(180, 180, 180);
	font-family: 'system-ui';
`;

const Icon = styled.i`
	display: inline-flex;
	vertical-align: -9px; 
`;



class App extends React.Component {
  constructor() {
		super();
		
		this.state = {
			tasks: data,
			isClicked: false,
			whichTask: 0,
			totalComplete: 0
		}
		this.handleClick = this.handleClick.bind(this);
	
	}
	
	handleClick(e,key) {
		e.preventDefault();
		this.setState({
			isClicked: !this.state.isClicked,
			whichTask: key
		})
	}


	render() {
		let click = this.state.isClicked;

		let convertDataToObj = this.state.tasks.reduce((obj, each) => {
			if (!obj[each.group]) {
				obj[each.group] = [each]
			} else {
				obj[each.group].push(each)
			}
			return obj;
		},{});

		let taskNames = Object.keys(convertDataToObj);

		let showTasks;
		
		let tasks = taskNames.map((each,ind) => 
		<div key={ind}>
				<Icon className="fas fa-caret-right"></Icon><Group onClick={(e) => this.handleClick(e,ind)}>{each}</Group>	
				<Status>0 OF {(this.state.tasks.filter(task => task.group === taskNames[ind])).length} TASKS COMPLETE</Status>	
				<Line></Line>
			</div>
		);

		
		if (!click) {
			showTasks = 
				<Main>
					<h1>Things To Do</h1>
					<Line></Line> 
						{tasks}
				</Main>
		};
		
		if (click) {
			showTasks = 
				<Main>
					<h1>{taskNames[this.state.whichTask]}</h1>
					<Checkbox showTask={this.state.tasks.filter(task => task.group === taskNames[this.state.whichTask])}/>	
				</Main>
		};
	
		return (
			<div>
				{showTasks}
			
			</div>
		)
	}

};


export default App;