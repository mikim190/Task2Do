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

const Home = styled.span`
	display: inline-flex;
	margin-left: 200px;
	color: rgb(0, 102, 255); 
	font-family: 'system-ui';
	
`;

const Title = styled.span`
	display: inline-block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
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
			whichTask: '',
			completeTaskIds: [],
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
			.then(records => {
				let data = records.data;
				let finTaskIds = data.filter(each => each.completedAt !== null).map(each => each.id);
				this.setState({
					tasks: data,
					completeTaskIds: finTaskIds
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
	
	handleClick(e,groupName) {
		e.preventDefault();
		this.setState({
			isClicked: !this.state.isClicked,
			whichTask: groupName
		})
	}


	render() {
		
		let click = this.state.isClicked;

		let groupDataByName = this.state.tasks.reduce((obj, each) => {
			if (!obj[each.group]) {
				obj[each.group] = [each]
			} else {
				if (each.completedAt !== null || !each.dependencyIds.length) {
					obj[each.group].push(each)
				} else {
					obj[each.group].unshift(each)
				}
			}
			return obj;
		},{});
		
		let listOfTaskNames = Object.keys(groupDataByName);
		let taskByGroupName = groupDataByName[this.state.whichTask];

		let showTasks;
		
		let tasks = listOfTaskNames.map((each,ind) => 
		<div key={ind}>
				<Icon className="fas fa-caret-right"></Icon><Group onClick={(e) => this.handleClick(e,each)}>{each}</Group>	
				<Status>{(groupDataByName[listOfTaskNames[ind]].filter(each => each.completedAt)).length} OF {groupDataByName[listOfTaskNames[ind]].length} TASKS COMPLETE</Status>	
				<Line></Line>
			</div>
		);


		
		if (!click) {
			showTasks = 
				<Main>
					<Title>Things To Do</Title>
					<Line></Line> 
						{tasks}
				</Main>
		};
		
		if (click) {
			showTasks = 
		
				<Main>
					<Title>{this.state.whichTask}</Title> <Home onClick={(e) => this.handleClick(e)}>ALL GROUPS</Home>
					<TaskList updateRecord={this.updateRecord} showTask={taskByGroupName} finTaskIds={this.state.completeTaskIds}/>	
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