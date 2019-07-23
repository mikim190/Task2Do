import React, { Component } from 'react';
import data from '../../../public/data.js';
import ListTask from './ListTask.jsx';

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
				<div>
					<h1>Things To Do</h1>
					<p onClick={(e,value) => this.handleClick(e, 1)}>Task Group 1</p>
					<p onClick={(e,value) => this.handleClick(e, 2)}>Task Group 2</p>
				</div>
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