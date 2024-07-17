import React from 'react';
import { FaStar, FaClock, FaShieldAlt } from 'react-icons/fa';

const FeatureSection: React.FC = () => {
  return (
    <div className="py-20 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center">Knowledge Hub - The Leading Platform for Knowledge Work Automation</h2>
      <div className="flex flex-col md:flex-row justify-around mt-10 space-y-8 md:space-y-0">
        <div className="text-center">
          <FaStar className="text-6xl mx-auto" />
          <h3 className="text-xl font-bold mt-4">Create & Upload Documents</h3>
        </div>
        <div className="text-center">
          <FaClock className="text-6xl mx-auto" />
          <h3 className="text-xl font-bold mt-4">View Shared Resources</h3>
        </div>
        <div className="text-center">
          <FaShieldAlt className="text-6xl mx-auto" />
          <h3 className="text-xl font-bold mt-4">Ask AI</h3>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
