import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {ListMovies} from './Components/ListMovies';
import {ListCharacters} from './Components/ListCharacters';
import Logo from './Support/Img/icon.png';
import About from './Components/About';

import {BrowserRouter as Router, Route , Link} from 'react-router-dom';
import React from "react";

class App extends React.Component{

	render(){
		return(
			<Router>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<img src={Logo} width="30" height="30" alt="Go to index" />
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
							aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link to= '/' className="nav-link active">Listado Peliculas</Link>
							</li>
							<li className="nav-item">
								<Link to={{pathname:'/characters' , charProps:{filter: "none",idFilter: "none"}}} className="nav-link">Listado Personajes (Todos)</Link>
							</li>
							<li className="nav-item">
								<Link to="/about" className="nav-link">Acerca de</Link>
							</li>
						</ul>
					</div>
				</nav>
				<Route path="/" exact  component={ListMovies} />
				<Route path="/characters" component={ListCharacters} />
				<Route path="/about" component={About} />
			</Router>
		);
	}
}

export default App;
