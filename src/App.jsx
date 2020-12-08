import './App.css';
import ShowMap from './frontend/map/map';
import TopNavContainer from './frontend/top-nav-container'
import Footer from './frontend/footer'

function App() {

  return (
    <div className="App">
      <header className="App-header">   
        <TopNavContainer/>
        <ShowMap/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
