import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-blue-600 text-white text-center py-20 px-4 md:px-20">
      <h1 className="text-4xl font-bold"> Welcome to KnowledgeHub!</h1>
      <p className="mt-4 text-lg">Empowering Teams, Streamlining Knowledge - Welcome to KnowledgeHub!</p>
      <button className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">Schedule a Demo</button>
    </div>
  );
}

export default HeroSection;
