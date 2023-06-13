
import './App.css';
import Login from './components/Authentication/Login'
import Signup from './components/Authentication/Signup'
import Navbar from './components/Navbar/Navbar'
import Posts from './components/Posts/Posts'
import Dashboard from './components/Dashboard/Dashboard'
import Chat from './components/Chat/Chat'
import Rooms from './components/Rooms/Rooms'
import Weather from './components/Weather/Weather'
import Assist from './components/Assist/Assist'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        
          <Routes>
            <Route exact path='/posts' element={<Posts />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/chat' element={<Chat />} />
            <Route exact path='/assist' element={<Assist />} />
            <Route exact path='/weather' element={<Weather />} />
            <Route exact path='/rooms' element={<Rooms />} />
          </Routes>
        
      </Router>

    </div>
  );
}

export default App;
