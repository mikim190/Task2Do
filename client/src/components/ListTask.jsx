import React, { Component } from 'react';
import Task from './Task.jsx';




class ListTask extends React.Component {
  constructor(props) {
    super(props);
	}
	
	
	render() {
		let data = this.props.showTask;
	
		return (
			
				<ul>
					{data.map((val, id) => 
						<Task key={id} value={val}/>
					)}
				</ul>
		
		)
	}

};


export default ListTask;