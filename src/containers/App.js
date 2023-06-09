import React, {Component} from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends Component{
	constructor() {
		super()
		this.state = {
			robots:[],
			searchfield: ''
		}
	}
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response =>response.json())
			.then(users => this.setState({robots: users}));
			
		
	}

	onsearchChange = (event) => {
		this.setState({searchfield: event.target.value })
		
	}



	render(){
		const {robots, searchfield} = this.state;
		const fliterRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		if (!robots.length) {
			return <h1> Loading </h1>
		}else{
			return(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<Searchbox searchChange={this.onsearchChange} />
				<Scroll>
					<ErrorBoundry>
						<CardList robots={fliterRobots}/>
				    </ErrorBoundry>
				</Scroll>
			</div>
		   );

		
		
		}
	}
}






export default App;