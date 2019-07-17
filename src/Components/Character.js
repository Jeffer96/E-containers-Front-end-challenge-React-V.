import React from 'react';

export class Character extends React.Component{

    constructor(props){
        super(props);
        this.state={
            films : [],
        };
    }

    render(){
        return(
            <tr>
                <td>{this.props.character.name}</td>
                <td>{this.props.character.eye_color}</td>
                <td>{this.props.character.gender}</td>
                <td>
                    <ul>
                        {this.props.character.films.map((data,i)=>{
                            return (<li key={i}>{data}</li>);
                        })}
                    </ul>
                </td>
            </tr>
        );
    }
}