import React, { Component } from 'react'
import Pelis from '../Pelis/Pelis'
import FiltroPorNombre from '../FiltroPorNombre/FiltroPorNombre'

export default class ContainerPelis extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculas:[],
            peliculasFiltradas:[]
        }
    }

    componentDidMount(){
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=1')
        .then(response => response.json())
        .then(data => this.setState({
            peliculas: data.results,
            peliculasFiltradas:data.results
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

    filtrarPorNombre(nombreAFiltrar){
        console.log(nombreAFiltrar);
        const arrayFiltrada = this.state.peliculas.filter(
            peliculas => peliculas.title.toLowerCase().includes(nombreAFiltrar.toLowerCase())
        )
        console.log(arrayFiltrada);
        this.setState({
            peliculasFiltradas: arrayFiltrada
        })
    }

    render(){
        return(
            <div className='containerPelis'>
            <FiltroPorNombre filtrarPorNombre={(nombreAFiltrar)=>this.filtrarPorNombre(nombreAFiltrar)}/>
                {this.state.peliculas === []?
                <div class="loader"></div>:
                this.state.peliculasFiltradas.slice(0,10).map((peliculas,index) => {
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
                    eliminarPelicula={(id)=>this.eliminarPelicula(id)}
                      />
                  )  
                })
    
            }
                
            </div>
        )
    }
}