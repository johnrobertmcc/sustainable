import './App.css';
import ShowMap from './frontend/map/map';
import SideBar from './frontend/sidebar';

function App() {

  return (
    <div className="App">
        <SideBar/>   
        <ShowMap/>
    </div>
  );
}

export default App;
