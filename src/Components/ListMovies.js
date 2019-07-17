import React from 'react';
import {Link} from 'react-router-dom';
//import './styles.css';

export class ListMovies extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			movies : []
		};
		this.getMoviesList = this.getMoviesList.bind(this);
	}

	componentDidMount(){
		fetch('https://swapi.co/api/films/')
			.then( (data) => {
				return data.json();
			}).then( (jsonData) => {
				this.setState({movies : jsonData.results});
				console.log(this.state.movies);
				//console.log(jsonData.results);
			}).catch( (error) => {
				console.log("errror: "+error);
		});
	}

	getMoviesList(){
		return this.state.movies.map(function(currentMovie, i){
			return (
				<tr key={i}>
					<td>{currentMovie.title}</td>
					<td>{currentMovie.episode_id}</td>
					<td>{currentMovie.director}</td>
					<td><Link to="/characters/{currentMovie.title}" >See Characters</Link></td>
				</tr>
			);
		});
	}

	
	render(){
		return(
			<div>
				<h3>Movie List</h3>
				<table className="table table-striped" style={{ marginTop: 20 }} >
					<thead>
					<tr>
						<th>Name</th>
						<th># Episodie</th>
						<th>Director </th>
						<th>Characters</th>
					</tr>
					</thead>
					<tbody>
						{this.getMoviesList()}
					</tbody>
				</table>
			</div>
		);
	}
}
