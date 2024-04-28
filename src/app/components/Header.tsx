import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import routes from '../../statics/routes/routes.json';

const { Brand } = Navbar;

function  Header() {
  const history = useRouter();

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Brand>Playlist Generator</Brand>
        <Nav className="me-auto">
          <Button
            variant="dark"
            size="sm"
            onClick={() => history.push(routes.HOME)}
          >
            Home
          </Button>
          {true ? (
            <Button
              variant="dark"
              size="sm"
              onClick={() => history.push(routes.LOGIN)}
            >
              Login
            </Button>
          ) : (
            <>
              <Button
                variant="dark"
                size="sm"
                onClick={() => history.push(routes.PROFILE)}
              >
                Profile
              </Button>
              <Button
                variant="dark"
                size="sm"
                onClick={() => history.push(routes.TRACKS)}
              >
                Tracks
              </Button>
              <Button variant="dark" size="sm" onClick={() => console.log('Logout')}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
