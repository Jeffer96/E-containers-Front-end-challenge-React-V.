
import React from 'react';
import '../Support/Styles/common.css';

export class OpeningCrawl extends React.Component{
    render(){
        return(
            <section className="sectionCrawl">
                <div id="animatedText">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.episode}</h2>
                    <p>{this.props.contentText}</p>
                </div>
                <div id="shadow"></div>
            </section>
        );
    }
}