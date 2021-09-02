import React, { Component } from 'react'
import Pelis from '../Pelis/Pelis'

export default class ContainerPelis extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculas:[]
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1')
        .then(response => response.json())
        .then(data => 
            this.setState({
            peliculas: data.results
        }))
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div>
                {this.state.peliculas.map((peliculas, index) => {
                    return(
                 <Pelis 
                 title={peliculas.title}
                 poster_path={peliculas.poster_path}
                 overview={peliculas.overview}
                 key={index}
                 />   
                    )
                })}

            </div>
        )
    }
}