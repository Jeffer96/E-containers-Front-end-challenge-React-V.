import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {ListMovies} from './Components/ListMovies';
import {ListCharacters} from './Components/ListCharacters';
import {CharactersAtMovie} from './Components/CharactersAtMovie';
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
								<Link to="/" className="nav-link active">List Movies</Link>
							</li>
							<li className="nav-item">
								<Link to="/characters" className="nav-link">List Chars</Link>
							</li>
							<li className="nav-item">
								<Link to="/about" className="nav-link">About</Link>
							</li>
						</ul>
					</div>
				</nav>
				<Route path="/" exact component={ListMovies} />
				<Route path="/characters" component={ListCharacters} />
				<Route path="/about" component={About} />
				<Route path="/charsatmovie/:title" component={CharactersAtMovie}/>
			</Router>
		);
	}
}

export default App;
