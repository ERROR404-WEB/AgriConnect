
import './App.css';
import  Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Navbar from './components/Navbar/Navbar'
function App() {
  return (
    <div className="App">


      <Navbar />
      <Login /> 
      <Signup />

    </div>
  );
}

export default App;
