import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './logo.png'
import { useNavigate } from 'react-router-dom';
function LandingNav(props) {
  const navigate = useNavigate();
  const handle = () => {
    navigate('/');
  }
  return (
    <Navbar bg={props.bg} sticky="top" expand="lg" style={{height:"60px",position:"fixed",width:"100%"}}>
      <Container>
        <Navbar.Brand onClick={handle}  style={{cursor:"pointer"}}> 
            <img src={logo} alt='logo' className='logo'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link > <Link to="/signup1"  style={{color:"black"}}>Signup</Link></Nav.Link>
            <Nav.Link > <Link to="/signin" style={{color:"black"}}>Login</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandingNav;