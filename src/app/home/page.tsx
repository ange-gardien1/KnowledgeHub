// pages/index.tsx
import React from 'react';
import Image from 'next/image';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 relative">
      <header className="w-full bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-xl font-bold">Knowledge Hub</div>
          <nav className="space-x-4">
            <a href="/signin" className="hover:underline">Sign up</a>
            <a href="/signin" className="hover:underline">Log in</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Get to work, with a lot less work</h1>
        <p className="text-xl mb-8">Knowledge Hub delivers tools that help you move your work forward faster, keep it safe, and let you collaborate with ease.</p>
        <div className="space-x-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Get Started</button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300">Resources</button>
        </div>

        <div className="relative mt-16 flex justify-center items-center">
          <video
            className="absolute inset-0 object-cover w-full h-full z-0"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="relative z-10 flex justify-center space-x-8">
            <div className="relative w-[600px] h-[400px]">
              <Image
                src="https://online.keele.ac.uk/wp-content/uploads/2023/11/02_Computer-systems.jpg"
                alt="Desktop Mockup"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="relative w-[450px] h-[400px]">
              <Image
                src="https://latestmodapks.com/wp-content/uploads/2023/01/Files-1.jpeg"
                alt="Mobile Mockup"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
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
