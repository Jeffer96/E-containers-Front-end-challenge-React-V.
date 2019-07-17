import React from "react";

export class CharactersAtMovie extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            omovie : "",
            listChars : []
        };
    }

    componentDidMount() {
        this.setState({omovie : this.props.match.params.title});
        console.log(this.props.match.params.title);
        //fetch().then().then().catch();
    }

    render(){
        return(
            <h1>{this.state.omovie}</h1>
        );
    }
}