import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { useNavigate } from 'react-router-dom'

function Header() {

const Navigate = useNavigate();

   // Utils
   const navigate = useNavigate();
   const isLoggedIn: boolean = useIsLoggedIn();
 
   // Handlers
   function onLogOut() {
     window.localStorage.removeItem('isLoggedIn');
     navigate('/');
   }
 


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>ElBuenSabor</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
           
            <Nav.Link onClick={() => Navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => Navigate('/sobrenosotros')}>Sobre nosotros</Nav.Link>

            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                Iniciar sesion
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => Navigate('/Login')}>Administrador</Dropdown.Item>
                <Dropdown.Item onClick={() => Navigate('/Login')}>Cliente</Dropdown.Item>
                <Dropdown.Item href="/Empleado">Empleado</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>      
    
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                ABM Entidades
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => Navigate('/administration')}>Articulo Insumo</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Articulo Manufacturado</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Rubro Articulo Manufacturado</Dropdown.Item>
                <Dropdown.Item onClick={() => Navigate('/rubroArticuloInsumo')}>Rubro Articulo Insumo</Dropdown.Item>
                <Dropdown.Item onClick={() => Navigate('/Factura')}>Factura</Dropdown.Item>
                <Dropdown.Item onClick={() => Navigate('/Cliente')}>Clientes</Dropdown.Item>
                <Dropdown.Item onClick={() => Navigate('/domicilios')}>Domicilio</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;