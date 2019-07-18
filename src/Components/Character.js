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
                <td>{this.props.index + 1}</td>
                <td>{this.props.character.name}</td>
                <td>{this.props.character.eye_color}</td>
                <td>{this.props.character.gender}</td>
                <td>
                    <ul>
                        {this.props.filmsMap.map((data,i)=>{
                            //let cond = this.props.character ? this.props.character.films.includes(data.title) : false;
                            if (this.props.character.films.includes(data.url) ){
                                return (<li style={{cursor : "pointer"}} key={i} onClick={()=>this.props.openCrwl(data.title,data.epid,data.crwl)}>{data.title}</li>);
                            }else{
                                return null;
                            }
                        })}
                    </ul>
                </td>
            </tr>
        );
    }
}