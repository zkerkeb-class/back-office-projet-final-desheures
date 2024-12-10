import React, { useState } from 'react';
import InputField from './components/InputField';
import Button from './components/Button';
import { useNavigate } from 'react-router-dom';
import ThemeSwitch from './components/ThemeSwitch';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        { email, password }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/backoffice');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="prout border-r-2 border-gray-600">
          <h1 className="text-6xl font-bold text-center m-20">Back Office</h1>
        </div>
        <div className="m-20 w-96">
          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <InputField
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit">Se connecter</Button>
            </div>
          </form>
        </div>
      </div>
      <ThemeSwitch />
    </div>
  );
};

export default App;
