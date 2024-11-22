import React from 'react';
import InputField from './components/InputField';
import Header from './components/Header';
import Button from './components/Button';

const App = () => {
  return (
    <div className="min-h-screen bg-[#0F0D13] flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="prout border-r-2 border-gray-600">
          <h1 className="text-6xl font-bold text-white text-center m-20">
            Back Office
          </h1>
        </div>
        <div className="m-20 w-96">
          <div className="mb-4">
            <InputField id="email" label="Email" type="email" />
          </div>
          <div className="mb-6">
            <InputField id="password" label="Password" type="password" />
          </div>
          <div>
            <Button type="submit">Se connecter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
