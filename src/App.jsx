import './App.css';
import TopNavContainer from './frontend/top-nav-container'
import Footer from './frontend/footer'
import SideBar from './frontend/sidebar';

function App() {

  return (
    <div className="App">
      <header className="App-header">   
        <TopNavContainer/>
        <SideBar/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
