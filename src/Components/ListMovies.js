import React from 'react';
import {Link} from 'react-router-dom';
import loading from '../Support/Img/loading.gif';
import '../Support/Styles/common.css';

export class ListMovies extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			movies : [],
			loading : false
		};
		this.getMoviesList = this.getMoviesList.bind(this);
	}

	componentDidMount(){
		this.setState({loading:true});
		fetch('https://swapi.co/api/films/')
			.then( (data) => {
				return data.json();
			}).then( (jsonData) => {
				this.setState({movies : jsonData.results});
				this.setState({loading:false});
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
					<td><Link to={{pathname:'/characters',charProps:{filter: "movie", idFilter : currentMovie.url}}} >Ver Personajes</Link></td>
				</tr>
			);
		});
	}

	
	render(){
		return(
			<div>
				<div id="loadingLayout" style={{display: this.state.loading ? "block" : "none"}}>
					<img src = {loading} alt="Loading"/>
				</div>
				<h3>Movie List</h3>
				<table className="table table-striped" style={{ marginTop: 20 }} >
					<thead>
					<tr>
						<th>Nombre</th>
						<th># episodio</th>
						<th>Director </th>
						<th>personajes</th>
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
