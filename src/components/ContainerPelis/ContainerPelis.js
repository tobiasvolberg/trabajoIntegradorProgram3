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
        .then(data => this.setState({
            peliculas: data.results
        }))
        .catch(error => console.log(error))
    }

    eliminarPelicula(id){
        const peliculasFiltradas = this.state.peliculas.filter(peliculas => peliculas.id !== id)
        console.log(peliculasFiltradas);
        this.setState({
            peliculas: peliculasFiltradas
        })
    }

    render(){
        return(
            <div className='containerPelis'>
                {this.state.peliculas.slice(0,10).map((peliculas, index) => {
                    return(
                 <Pelis 
                 title={peliculas.title}
                 poster_path={peliculas.poster_path}
                 overview={peliculas.overview}
                 key={index}
                 id={peliculas.id}
                 release_date={peliculas.release_date}
                 vote_average={peliculas.vote_average}
                 original_language={peliculas.original_language}
                 eliminarPelicula={(id) => this.eliminarPelicula(id)}
                 />   
                    )
                })}

            </div>
        )
    }
}