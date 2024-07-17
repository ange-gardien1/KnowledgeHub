import React from 'react';

const InformationSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-20 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center">What is Knowledge Hub?</h2>
      <div className="max-w-3xl mx-auto mt-10">
        <p className="text-lg">
          Is your company like others where 50% or more of knowledge workers' time is spent on manual tasks that could be automated? If so, this eBook is for you!
        </p>
        <p className="mt-4 text-lg">
          This eBook will provide insight on how you should automate work associated with document creation, workflow management, and collaboration...
        </p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mx-auto">Learn More</button>
      </div>
    </div>
  );
}

export default InformationSection;
