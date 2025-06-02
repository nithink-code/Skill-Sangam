import React from 'react';

const StudentDashboard = () => {
  // Sample data
  const streakData = {
    currentStreak: 5,
    longestStreak: 10,
    lastActive: '2023-06-15',
  };

  const purchasedVideos = [
    {
      id: 1,
      title: 'React Hooks Masterclass',
      thumbnail: 'https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffhq29nvkpgs6zz97e62d.jpg',
      description: 'Learn all about React Hooks and how to use them effectively in your applications.',
      progress: 75,
    },
    {
      id: 2,
      title: 'Advanced Tailwind CSS',
      thumbnail: 'https://devonblog.com/wp-content/uploads/2022/06/tailwind-thumb.jpg',
      description: 'Take your Tailwind CSS skills to the next level with advanced techniques.',
      progress: 30,
    },
  ];

  const availableVideos = [
    {
      id: 3,
      title: 'Next.js for Beginners',
      thumbnail: 'https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2F8MbtJ4hTAaOk3KPcptqZ&w=3840&q=75',
      description: 'Get started with Next.js and build server-rendered React applications.',
      price: 29.99,
    },
    {
      id: 4,
      title: 'TypeScript Fundamentals',
      thumbnail: 'https://file-uploads.teachablecdn.com/4c16c4adca0d401bb4295cfbda05ecf1/e1c0e6c521414dbfae2fe1ca931c2f8f',
      description: 'Learn TypeScript from scratch and write more robust JavaScript code.',
      price: 24.99,
    },
    {
      id: 5,
      title: 'GraphQL API Design',
      thumbnail: 'https://nordicapis.com/wp-content/uploads/Making-Your-First-API-in-GraphQL.png',
      description: 'Design and implement efficient GraphQL APIs for your applications.',
      price: 34.99,
    },
    {
      id: 6,
      title: 'AWS Serverless Architecture',
      thumbnail: 'https://learning.workfall.com/learning/blog/wp-content/uploads/2021/11/serverless.png',
      description: 'Build scalable applications using AWS Lambda and other serverless technologies.',
      price: 39.99,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back! Keep up the learning streak.</p>
      </header>

      {/* Streak Section */}
      <section className="mb-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔥 Learning Streak</h2>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm text-gray-500">Current Streak</p>
            <p className="text-4xl font-bold text-green-600">{streakData.currentStreak} days</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Longest Streak</p>
            <p className="text-4xl font-bold text-green-800">{streakData.longestStreak} days</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Last Active</p>
            <p className="text-xl font-medium text-gray-700">{streakData.lastActive}</p>
          </div>
        </div>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-600 h-4 rounded-full" 
            style={{ width: `${(streakData.currentStreak / streakData.longestStreak) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600 text-right">
          {Math.round((streakData.currentStreak / streakData.longestStreak) * 100)}% to beat your record!
        </p>
      </section>

      {/* Purchased Videos Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎓 Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchasedVideos.map(video => (
            <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img className="h-48 w-full object-cover md:w-48" src={video.thumbnail} alt={video.title} />
                </div>
                <div className="p-6">
                  <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">In Progress</div>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900">{video.title}</h3>
                  <p className="mt-2 text-gray-600">{video.description}</p>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${video.progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{video.progress}% completed</p>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Continue Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Videos Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 New Tech Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableVideos.map(video => (
            <div key={video.id} className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition h-full">
              <img className="w-full h-48 object-cover" src={video.thumbnail} alt={video.title} />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{video.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-gray-900">${video.price}</span>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;