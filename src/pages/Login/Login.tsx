import Button from 'react-bootstrap/Button';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // Utils
  const navigate = useNavigate();

  // Handlers
  function onLogIn() {
    window.localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  }

  // Render
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
      <Button onClick={onLogIn}>Log In</Button>
    </div>
  );
};

export default Login;

