import React from 'react';
import {Link} from 'react-router-dom';
import loading from '../Support/Img/loading.gif';
import '../Support/Styles/common.css';
import {OpeningCrawl} from "./OpeningCrawl";

export class ListMovies extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			movies : [],
			loading : false,
			currentTitle : "",
			currentIdEpisode : "",
			currentText : "",
			showingCrawl:false
		};
		this.getMoviesList = this.getMoviesList.bind(this);
	}

	componentDidMount(){
		this.setState({
			loading:true
		});
		fetch('https://swapi.co/api/films/')
			.then( (data) => {
				return data.json();
			}).then( (jsonData) => {
				this.setState({
					movies : jsonData.results,
					loading:false
				});
				//console.log(jsonData.results);
			}).catch( (error) => {
				console.log("errror: "+error);
		});
	}

	openCrawl(text, titleMovie, episodeId){
		this.setState({
			currentTitle : titleMovie,
			currentText : text,
			currentIdEpisode : episodeId,
			showingCrawl : true
		});
	}

	getMoviesList(){
		return this.state.movies.map(function(currentMovie, i){
			return (
				<tr key={i}>
					<td>{i+1}</td>
					<td onClick={() => this.openCrawl(currentMovie.opening_crawl, currentMovie.title, currentMovie.episode_id)} className="titleMovie">{currentMovie.title}</td>
					<td>{currentMovie.episode_id}</td>
					<td>{currentMovie.director}</td>
					<td><Link to={{pathname:'/characters',charProps:{filter: "movie", idFilter : currentMovie.url}}} >Ver Personajes</Link></td>
				</tr>
			);
		}.bind(this));
	}

	
	render(){
		return(
			<div>
				<div id="loadingLayout" style={{display: this.state.loading ? "block" : "none"}}>
					<img src = {loading} alt="Loading"/>
				</div>
				<div className="ligthBoxOpeningCrawl" style={{display: this.state.showingCrawl ? "block" : "none"}}>
					<OpeningCrawl title ={this.state.currentTitle} episode ={"Episode" + this.state.currentIdEpisode} contentText = {this.state.currentText}/>
				</div>
				<h3>Movie List</h3>
				<table className="table table-striped" style={{ marginTop: 20 }} >
					<thead>
					<tr>
						<th>#</th>
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
