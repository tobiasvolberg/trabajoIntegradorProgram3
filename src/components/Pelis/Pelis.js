import React, { Component } from 'react'

export default class Pelis extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <img alt='' src={this.props.poster_path}></img>
                <h1>{this.props.title}</h1>
                <h4>{this.props.overview}</h4>
            </div>
        )
    }
}