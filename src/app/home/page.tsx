// src/app/home/page.tsx
import React from 'react';
import Image from 'next/image';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="w-full bg-gray-900 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-2xl font-extrabold">Knowledge Hub</div>
          <nav className="space-x-6">
            <a href="/signin" className="hover:text-blue-400 transition">Sign Up</a>
            <a href="/signin" className="hover:text-blue-400 transition">Log In</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <section className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-20 rounded-xl shadow-lg mb-12">
          <h1 className="text-5xl font-bold mb-4">Transform Your Work, Effortlessly</h1>
          <p className="text-xl mb-8">Knowledge Hub offers the tools you need to accelerate your work, ensure safety, and collaborate seamlessly.</p>
          <div className="space-x-4">
            <a href="/signin">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition">Get Started</button>
            </a>
            <a href="/resources">
              <button className="bg-white text-blue-600 py-3 px-6 rounded-full border border-blue-600 hover:bg-blue-50 transition">Explore Resources</button>
            </a>
          </div>
        </section>

        <section className="relative mt-16 flex justify-center items-center mb-16">
          <div className="relative w-full max-w-4xl h-96">
            <video
              className="absolute inset-0 object-cover w-full h-full rounded-xl shadow-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className="flex flex-col items-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Features You&apos;ll Love</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <h3 className="text-xl font-semibold mb-4">Seamless Integration</h3>
              <p>Integrate with your existing tools effortlessly and streamline your workflow.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <h3 className="text-xl font-semibold mb-4">Enhanced Security</h3>
              <p>Keep your data safe with state-of-the-art security measures.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <h3 className="text-xl font-semibold mb-4">Collaborative Tools</h3>
              <p>Work together with your team using our robust collaboration features.</p>
            </div>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <p className="text-lg mb-4">“Knowledge Hub has revolutionized the way we work. The tools are incredibly intuitive and efficient.”</p>
              <p className="font-semibold">Jane Doe</p>
              <p className="text-gray-600">Product Manager, Tech Corp</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs">
              <p className="text-lg mb-4">“A must-have for any team. The integration was seamless, and the collaboration tools are top-notch.”</p>
              <p className="font-semibold">John Smith</p>
              <p className="text-gray-600">Developer, Creative Solutions</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2024 Knowledge Hub, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
