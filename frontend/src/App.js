
import './App.css';

import SignIn from './components/Authentication/SignIn';
import SignUp2 from './components/Authentication/SignUp2'
import SignUp1 from './components/Authentication/SignUp1'
import Navbar from './components/Navbar/Navbar'
import Posts from './components/Posts/posts'
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
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/signup1' element={<SignUp1 />} />
            <Route exact path='/signup2' element={<SignUp2 />} />
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
