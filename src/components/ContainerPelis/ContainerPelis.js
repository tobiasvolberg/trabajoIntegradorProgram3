import React, { Component } from 'react'
import Pelis from '../Pelis/Pelis'
import FiltroPorNombre from '../FiltroPorNombre/FiltroPorNombre'

export default class ContainerPelis extends Component {
    constructor(props){
        super(props)
        this.state = {
            peliculas:[],
            peliculasFiltradas:[],
            cargando: true,
            peliculasAgregadas:[],
            paginaActual: 1,
            claseDiv: "containerPelis",
            texto: "Columnas",
            orden: "ASC"
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=${this.state.paginaActual}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
                peliculas: data.results.slice(0,12),
                peliculasFiltradas:data.results.slice(0,12),
                cargando: false,
                peliculasAgregadas:data.results.slice(12,20),
                paginaActual: this.state.paginaActual + 1
            })
        }
        )
        .catch(error => console.log(error))
    }



    eliminarPelicula(id){
        const peliculasFiltradas = this.state.peliculas.filter(peliculas => peliculas.id !== id)
        console.log(peliculasFiltradas);
        this.setState({
            peliculas: peliculasFiltradas,
            peliculasFiltradas: peliculasFiltradas
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

    agregarPeliculas(){
        console.log(this.state.peliculasAgregadas)
        if (this.state.peliculasAgregadas.length <= 0) {
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=e213b0057b8f5a50ca80f34e219debc4&language=en-US&page=${this.state.paginaActual}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    peliculas: [...data.results.slice(0,10), ...this.state.peliculas],
                    peliculasFiltradas: [...data.results.slice(0,10), ...this.state.peliculasFiltradas],
                    cargando: false,
                    peliculasAgregadas:data.results.slice(10,20),
                    paginaActual: this.state.paginaActual + 1
                })
            }
            )
            .catch(error => console.log(error))
        } else {
            this.setState({
                peliculas: [...this.state.peliculas, ...this.state.peliculasAgregadas],
                peliculasFiltradas: [...this.state.peliculasFiltradas, ...this.state.peliculasAgregadas],
                peliculasAgregadas: []
            })
        }
    }

    componentDidUpdate(){
        console.log(this.state.peliculasFiltradas)
    }   
    verColumna(){
        if(this.state.claseDiv === 'containerPelis'){
            this.setState({
                claseDiv: "containerColumna",
                texto: 'Filas'
            })
        }else{
            this.setState({
                claseDiv: 'containerPelis',
                texto:'Columnas'
            })
        }
    }

    ordenar(){
       if(this.state.orden === "ASC"){
        this.setState({
            peliculasFiltradas: this.state.peliculasFiltradas.sort((a,b)=> b.title.localeCompare(a.title)),
            orden: "DESC"
        })
       } else {
        this.setState({
            peliculasFiltradas: this.state.peliculasFiltradas.sort((a,b)=> a.title.localeCompare(b.title)),
            orden: "ASC"
        })
       }
       
        
    }

    render(){
        return(
            <React.Fragment> 
                <div className="botones">
                <button  className='botonColumna' onClick={() => this.verColumna()}>{this.state.texto}</button>
                <button  className='botonOrden' onClick={() => this.ordenar()}> Orden: {this.state.orden}</button>
                <FiltroPorNombre filtrarPorNombre={(nombreAFiltrar)=>this.filtrarPorNombre(nombreAFiltrar)}/>
                </div>
                <div className={this.state.claseDiv}>
            
                    {this.state.cargando ?
                    <div className="loader"></div>:
                    this.state.peliculasFiltradas.length === 0 ?
                        <h1>No se han encontrado resultados, pruebe otra busqueda</h1>:
                        this.state.peliculasFiltradas.map((peliculas,index) => {
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
                            orientacion={this.state.claseDiv}
                        />
                
                     )  
                   })
             }
                </div>
                <button onClick={() => this.agregarPeliculas()}>Agregar Más</button>

            </React.Fragment>
        )
    }
}