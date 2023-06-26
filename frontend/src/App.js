
import './App.css';
import SignIn from './components/Authentication/SignIn';
import SignUp2 from './components/Authentication/SignUp2'
import SignUp1 from './components/Authentication/SignUp1'

import Posts from './components/Posts/Posts'
import Dashboard from './components/Dashboard/Dashboard'
import Chat from './components/Chat/Chat'
import Rooms from './components/Rooms/Rooms'
import Weather from './components/Weather/Weather'
import Assist from './components/Assist/Assist'
import Home from './components/Landing/Home'
import ProtectedRoute from './protectedRoutes';
import ProfileUser from './components/Dashboard/ProfileUser'
import { UserProvider } from './components/UserContext/UserContext'; 

import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom';

import InvestorRoom from './components/Rooms/InvestorRooms';
import Room from './components/Rooms/Room';

function App() {
  console.log(localStorage.getItem("role"));
  return (
    <div className="App">
      <UserProvider>
      <Router>
      
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/posts' element={<ProtectedRoute><Posts /></ProtectedRoute>} />
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/signup1' element={<SignUp1 />} />
            <Route exact path='/signup2' element={<SignUp2 />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/profile' element={<ProfileUser />} />
            <Route exact path='/chat' element={<Chat />} />
            <Route exact path='/assist' element={<Assist />} />
            <Route exact path='/weather' element={<Weather />} />
            <Route exact path='/rooms' element={localStorage.getItem("role")=="Investor" ? <InvestorRoom/>  : <Rooms/> } />
            <Route exact path='/room/:id' element={<Room/>} />
          </Routes>
          
      </Router>

      </UserProvider>
    </div>
  );
}

export default App;
