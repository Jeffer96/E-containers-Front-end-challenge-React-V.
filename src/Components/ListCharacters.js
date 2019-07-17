import * as React from "react";
import loading from "../Support/Img/loading.gif";
import {Character} from "./Character";
import {OpeningCrawl} from "./OpeningCrawl";
import '../Support/Styles/common.css';

export class ListCharacters extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            chars : [],
            loading : true,
            movies : [],
            filterType : "",
            filter : "",
            messageFilter: "",
            showingCrawl : false,
            currentTitle : "",
            currentIdEpisode : "",
            currentText: "",
        };
        this.getCharsList = this.getCharsList.bind(this);
        this.executeFilter = this.executeFilter.bind(this);
        this.getCharListByGender = this.getCharListByGender.bind(this);
        this.getCharListByMovie = this.getCharListByMovie.bind(this);
        this.getCharListByColorEye = this.getCharListByColorEye.bind(this);
        this.filterByColorEyes = this.filterByColorEyes.bind(this);
        this.filterByGender = this.filterByGender.bind(this);
        this.filterByMovie = this.filterByMovie.bind(this);
        this.openCrawl = this.openCrawl.bind(this);
        this.closeCrawl = this.closeCrawl.bind(this);
        this.getCharRow = this.getCharRow.bind(this);

    }

    componentDidMount() {
            this.setState({
                loading:true,
                filterType: this.props.location.charProps ? this.props.location.charProps.filter : "none",
                filter : this.props.location.charProps ? this.props.location.charProps.idFilter : "none"
            });

        fetch("https://swapi.co/api/people/")
            .then((data)=>{
                return data.json();
            })
            .then ((data)=>{
                fetch("https://swapi.co/api/films/")
                    .then((data)=>{
                        return data.json();
                    }).then((moviesData)=>{
                        let moviesInfo = moviesData.results.map(function(movie,i){
                            return {title : movie.title, url : movie.url, crwl : movie.opening_crawl, epid : movie.episode_id};
                        });
                        this.setState({
                            chars : data.results,
                            loading: false,
                            movies : moviesInfo
                        });
                })
            }).catch((error)=>{
                console.log(error);
                this.setState({loading:false});
            });

    }

    getCharsList(){
        return this.state.chars.map(function(charAt, i){
            return this.getCharRow(charAt,i);
        }.bind(this));
    }

    getCharListByColorEye(color){
        return this.state.chars.map(function(charAt, i){
            if (charAt.eye_color===color){
                return this.getCharRow(charAt,i);
            }else{
                return null;
            }
        }.bind(this));
    }

    getCharListByGender(gender){
        return this.state.chars.map(function(charAt, i){
            if (charAt.gender===gender){
                return this.getCharRow(charAt,i);
            }else{
                return null;
            }
        }.bind(this));
    }

    getCharListByMovie(url){
        return this.state.chars.map(function(charAt, i){

            let movies = charAt.films;
            let cond = false;
            for (let i=0; i<movies.length && !cond;i++){
                cond = movies[i]===url;
            }
            if (cond){
                return this.getCharRow(charAt,i);
            }else{
                return null;
            }
        }.bind(this));
    }

    getCharRow(charAt, i){
        return <Character character = {charAt} filmsMap = {this.state.movies} index={i} openCrwl={this.openCrawl} key = {i}/>;
    }

    executeFilter(){

        if (this.state.filterType==="eye_color"){
            return this.getCharListByColorEye(this.state.filter);
        }else if (this.state.filterType==="gender"){
            return this.getCharListByGender(this.state.filter);
        }else if (this.state.filterType==="movie"){
            return this.getCharListByMovie(this.state.filter);
        }else if (this.state.filter==="none"){
            return this.getCharsList();
        }

    }

    filterByColorEyes(e){
        let val = e.target.value;
        this.setState({
            filterType : "eye_color",
            filter : val
        });

    }

    filterByGender(e){
        let val = e.target.value;
        this.setState({
            filterType : "gender",
            filter : val
        });

    }

    filterByMovie(e){
        let val = e.target.value;
        this.setState({
            filterType : "movie",
            filter : val
        });

    }

    openCrawl(title,id,text){
        this.setState({
           currentTitle : title,
           currentIdEpisode : id,
           currentText: text,
           showingCrawl : true
        });
    }

    closeCrawl(){
        this.setState({
            currentTitle : "",
            currentIdEpisode : "",
            currentText: "",
            showingCrawl : false
        });
    }

    render(){
        return(
            <div>
                <div id="loadingLayout" style={{display: this.state.loading ? "block" : "none"}}>
                    <img src = {loading} alt="Loading"/>
                </div>
                <div className="ligthBoxOpeningCrawl" style={{display: this.state.showingCrawl ? "block" : "none"}}>
                    <OpeningCrawl title ={this.state.currentTitle} episode ={"Episode " + this.state.currentIdEpisode} contentText = {this.state.currentText}/>
                    <p onClick={this.closeCrawl}>X</p>
                </div>
                <h3>Personajes </h3>
                <div id="controlBar">
                    <select onChange={this.filterByColorEyes}>
                        <option value={"none"} >Seleccione un color de ojos</option>
                        <option value={"red"} >Rojo</option>
                        <option value={"blue"} >Azul</option>
                        <option value={"yellow"} >Amarillo</option>
                        <option value={"brown"} >Cafe</option>
                    </select>
                    <select onChange={this.filterByGender}>
                        <option value={"none"} >Seleccione un genero</option>
                        <option value={"male"} >Mujer</option>
                        <option value={"female"} >Hombre</option>
                        <option value={"n/a"} >Robot / Mounstro</option>
                    </select>
                    <select onChange={this.filterByMovie}>
                        <option value={"none"} >Seleccione una pelicula</option>
                    </select>
                </div>
                <h1>{this.state.messageFilter}</h1>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del personaje</th>
                        <th>Color de ojos</th>
                        <th>Genero </th>
                        <th>Peliculas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.executeFilter()}
                    </tbody>
                </table>
            </div>
        );
    }
}