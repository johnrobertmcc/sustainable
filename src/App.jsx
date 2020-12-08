import './App.css';
import ShowMap from './frontend/map/map';
import TopNavContainer from './frontend/top-nav-container'

function App() {

  return (
    <div className="App">
      <header className="App-header">   
        <TopNavContainer/>
        <ShowMap/>
      </header>
    </div>
  );
}

export default App;
