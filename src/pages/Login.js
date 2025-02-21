/* eslint-disable comma-dangle */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import InputField from '../components/common/InputField/InputField';
import Button from '../components/common/Button/Button';
import { validateForm } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = async () => {
    try {
      const validationErrors = validateForm(values, {
        email: { required: true, email: true },
        password: { required: true },
      });

      if (Object.keys(validationErrors).length > 0) {
        throw new Error('Veuillez remplir tous les champs correctement');
      }

      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error(error.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center">
        <div className="border-r-2 border-gray-600">
          <h1 className="text-6xl font-bold text-center m-20">Back Office</h1>
        </div>
        <div className="m-20 w-96">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
          >
            <InputField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <InputField
              id="password"
              name="password"
              label="Mot de passe"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
