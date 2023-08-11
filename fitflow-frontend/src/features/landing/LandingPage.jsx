import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Welcome to Fitflow</h1>
          <p className="text-lg text-gray-600 mb-8">Achieve your fitness goals from the comfort of your home</p>
          <a href="/trainer/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg">Trainer</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
