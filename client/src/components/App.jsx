import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import styled from 'styled-components';
import axios from 'axios';

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
			tasks: [],
			isClicked: false,
			whichTask: 0,
			totalComplete: 0
		}
		this.handleClick = this.handleClick.bind(this);
		this.getRecords = this.getRecords.bind(this);
		this.updateRecord = this.updateRecord.bind(this);
	}

	componentDidMount() {
		this.getRecords();
	}

	getRecords() {
		axios.get('/data')
			.then(data => {
				this.setState({
					tasks: data.data
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	updateRecord(newData) {
		
		axios.put('/data', newData)
			.then(data => {
				console.log('Update data successfully!', data)
				this.getRecords();
			})
			.catch(err => {
				console.log('Update failed!', err)
			})
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
				if (each.dependencyIds) {
					obj[each.group].unshift(each)
				} else {
					obj[each.group].push(each)
				}
			}
			return obj;
		},{});

	
		let listOfTaskNames = Object.keys(convertDataToObj);
		let eachTaskName = listOfTaskNames[this.state.whichTask];

		let showTasks;
		
		let tasks = listOfTaskNames.map((each,ind) => 
		<div key={ind}>
				<Icon className="fas fa-caret-right"></Icon><Group onClick={(e) => this.handleClick(e,ind)}>{each}</Group>	
				<Status>0 OF {convertDataToObj[listOfTaskNames[ind]].length} TASKS COMPLETE</Status>	
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
					<h1>{eachTaskName}</h1>
					<TaskList updateRecord={this.updateRecord} showTask={convertDataToObj[eachTaskName]}/>	
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