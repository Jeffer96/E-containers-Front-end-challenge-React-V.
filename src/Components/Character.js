import React from 'react';

export class Character extends React.Component{

    constructor(props){
        super(props);
        this.getFilms = this.getFilms.bind(this);
    }

    getFilms(){
        var props = this.props.character.films;
        var films = "";
        for (var i=0; i<props.length; i++){
            fetch(props[i]).then( (data)=>{
                return data.json();
            }).then ((datajson)=>{
                films += "<li>"+datajson.url+"</li>";
            }).catch((error)=>{

            })
        }
        return <li>{films}</li>;
    }

    render(){
        return(
            <tr>
                <td>{this.props.character.name}</td>
                <td>{this.props.character.eye_color}</td>
                <td>{this.props.character.gender}</td>
                <td>
                    <ul>
                        {this.getFilms()}
                    </ul>
                </td>
            </tr>
        );
    }
}