import React, { Component } from 'react';
import data from '../../../public/data.js';
import ListTask from './ListTask.jsx';
import styled from 'styled-components';

const Main = styled.div`
	margin-left: 50px;
	color: rgb(120, 120, 120);
	font-family: medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
`;

const Group = styled.h4`
	display: inline-block;
	margin-left: 30px;
	margin-bottom: 1px;
	margin-top: 40px;
	color: rgb(0, 0, 0); 
`;

const Line = styled.div`
	border: 1px solid rgb(180, 180, 180);
	margin-right: 700px;
	margin-top: 40px;
`;

const Status = styled.p`
	margin-left: 40px;
	margin-top: 1px;
	color: rgb(180, 180, 180);
	font-family: medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
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
			isClicked: 0
		}
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e,value) {
		e.preventDefault();
		this.setState({
			isClicked: value
		})
	}
	
	render() {
		let click = this.state.isClicked;
		let showTasks;

		if (click === 0) {
			showTasks = 
				<Main>
					<h1>Things To Do</h1>
					<Line></Line>
						<Icon className="fas fa-caret-right"></Icon> <Group onClick={(e,value) => this.handleClick(e, 1)}>Task Group 1</Group>
						<Status>1 OF 3 TASKS COMPLETE</Status>
					<Line></Line>
						<Icon className="fas fa-caret-right"></Icon> <Group onClick={(e,value) => this.handleClick(e, 2)}>Task Group 2</Group>
						<Status>0 OF 2 TASKS COMPLETE</Status>
					<Line></Line>

				</Main>
		};

		if (click === 1) {
			showTasks = 
				<div>
					<h1>Task Group 1</h1>
					<ListTask showTask={this.state.tasks.filter(task => task.group === 'Purchases')}/>	
				</div>
		};

		if (click === 2) {
			showTasks = 
			<div>
				<h1>Task Group 2</h1>
				<ListTask showTask={this.state.tasks.filter(task => task.group === 'Build Airplane')}/>				
			</div>
		};
	
		return (
			<div>
		
				{showTasks}
				
			</div>
		)
	}

};


export default App;