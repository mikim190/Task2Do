import React, { Component } from 'react';
import Task from './Task.jsx';
import styled from 'styled-components';

const Main = styled.div`
	margin-left: 10px;
	color: rgb(120, 120, 120);
	font-family: 'system-ui';
`;

const Line = styled.div`
	border: 1px solid rgb(180, 180, 180);
	width: 500px;
	margin-top: 20px;
`;

class TaskList extends React.Component {
	constructor(props) {
		super(props);

	}

	

	render() {
		const data = this.props.showTask;
		
		return (
			<Main>
				<Line></Line>
				{data.map((value, id, allTasks) => 
					<Task key={id} data={value} allData={allTasks} updateRecord={this.props.updateRecord}/> 
				)}
			</Main>
		)
	}
}

export default TaskList;
