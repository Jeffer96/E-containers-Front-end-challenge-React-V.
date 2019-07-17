import * as React from "react";
import loading from "../Support/Img/loading.gif";
import {Character} from "./Character";
import {Link} from "react-router-dom";
import Select from 'react-select';


export class ListCharacters extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            chars : [],
            loading : true,
            optionsFilter : []
        };
        this.getCharsList = this.getCharsList.bind(this);
        this.getFilms = this.getFilms.bind(this);
        this.filterBy = this.filterBy.bind(this);
    }

    componentDidMount() {
        this.setState({loading:true});
        fetch("https://swapi.co/api/people/")
            .then((data)=>{
                return data.json();
            }).then ((jsonData)=>{
                this.setState({chars : jsonData.results});
                console.log(this.state.chars);
                this.setState({loading:false});
            }).catch((error)=>{
                console.log(error);
            this.setState({loading:false});
        })
    }

    getFilms(collection){
        return collection? collection.map(function(film,i){
            return <li key={i}>film</li>;
        }) : null;
    }

    getCharsList(){
        return this.state.chars.map(function(charAt, i){
            return (
                <Character character = {charAt} key = {i}/>
            );
        });
    }

    filterBy(e){
        var val = e.target.value;
        if (val=="eye_color"){
            this.setState({optionsFilter : [
                    { value: 'blue', label: 'Azul' },
                    { value: 'yellow', label: 'Amarillo' },
                    { value: 'red', label: 'rojo' },
                    { value: 'black', label: 'negro' }
                ]
            });
        }else if (val=="gender"){
            this.setState({optionsFilter : [
                    { value: 'male', label: 'Hombre' },
                    { value: 'female', label: 'Mujer' },
                    { value: 'n/a', label: 'N/A' }
                ]
            });
        }else if (val=="movie"){
            this.setState({optionsFilter : [
                    { value: 'A new Hope', label: 'A new Hope' },
                    { value: 'The Phantom Menace', label: 'The Phantom Menace' }
                ]
            });
        }
    }

    filterSelected(){

    }

    render(){
        return(
            <div>
                <div id="loadingLayout" style={{display: this.state.loading ? "block" : "none"}}>
                    <img src = {loading} alt="Loading"/>
                </div>
                <h3>Personajes </h3>
                <div id="controlBar">
                    <select onChange={this.filterBy}>
                        <option value={"eye_color"}>Color de ojos</option>
                        <option value={"movie"}>Pelicula</option>
                        <option value={"gender"}>Genero</option>
                    </select>
                    <Select className="selectDyn" options={this.state.optionsFilter}/>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nombre del personaje</th>
                        <th>Color de ojos</th>
                        <th>Genero </th>
                        <th>Peliculas</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getCharsList()}
                    </tbody>
                </table>
            </div>
        );
    }
}