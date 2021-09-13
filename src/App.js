import './App.css';
import ContainerPelis from './components/ContainerPelis/ContainerPelis';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Pelis from './components/Pelis/Pelis';

function App() {
  return (
    <div className="App">
      <Header/>
      <ContainerPelis/>
      <Footer/>
    </div>
  );
}

export default App;
