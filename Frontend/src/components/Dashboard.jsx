import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrainerDashboard = () => {
  // State for videos data
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: '',
    file: null,
    thumbnail: null
  });

  // Tech-related thumbnail images
  const thumbnails = {
    'React Hooks Deep Dive': 'https://media.licdn.com/dms/image/v2/D5612AQGL5HA2rkQVZA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1723493424387?e=2147483647&v=beta&t=MIj620gq3TszHZwpzUUdSsJizuX5orbAoOR018Zqdvw',
    'Advanced JavaScript Patterns': 'https://www.bacancytechnology.com/qanda/wp-content/uploads/2023/10/Detect-URLs-in-text-with-JavaScript.png',
    'Tailwind CSS Masterclass': 'https://miro.medium.com/v2/resize:fit:1400/1*__f27S-qQF2CAASt5bOwqg.png',
    'Node.js Performance Optimization': 'https://stackdiary.com/wp-content/uploads/2022/04/The-Most-Popular-Node.js-Frameworks-3.png',
    'Python Data Analysis': 'https://digitalfloats.com/wp-content/uploads/2023/08/Python-for-data-analysis.jpg',
    'Docker for Developers': 'https://t3.ftcdn.net/jpg/04/65/03/14/360_F_465031489_FuYsUYZRSw8Ca6pF8OAonyIrvbD9njK6.jpg',
    'AWS Fundamentals': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZmADBnf5Q9bAS2CDrkYObuXyiSW6I_CH6Ag&s'
  };

  // Mock data with tech-related content
  useEffect(() => {
    const mockVideos = [
      {
        id: 1,
        title: 'React Hooks Deep Dive',
        uploadDate: '2023-05-15',
        views: 2245,
        likes: 189,
        dislikes: 5,
        rating: 4.8,
        thumbnail: thumbnails['React Hooks Deep Dive'],
        duration: '42:15',
        category: 'frontend'
      },
      {
        id: 2,
        title: 'Advanced JavaScript Patterns',
        uploadDate: '2023-06-02',
        views: 1876,
        likes: 145,
        dislikes: 3,
        rating: 4.7,
        thumbnail: thumbnails['Advanced JavaScript Patterns'],
        duration: '35:20',
        category: 'frontend'
      },
      {
        id: 3,
        title: 'Tailwind CSS Masterclass',
        uploadDate: '2023-06-10',
        views: 1543,
        likes: 132,
        dislikes: 2,
        rating: 4.9,
        thumbnail: thumbnails['Tailwind CSS Masterclass'],
        duration: '28:45',
        category: 'frontend'
      },
      {
        id: 4,
        title: 'Node.js Performance Optimization',
        uploadDate: '2023-06-18',
        views: 1120,
        likes: 98,
        dislikes: 4,
        rating: 4.6,
        thumbnail: thumbnails['Node.js Performance Optimization'],
        duration: '39:10',
        category: 'backend'
      }
    ];
    setVideos(mockVideos);
  }, []);

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (editingVideo) {
      setEditingVideo({
        ...editingVideo,
        [name]: files[0]
      });
    } else {
      setNewVideo({
        ...newVideo,
        [name]: files[0]
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingVideo) {
      setEditingVideo({
        ...editingVideo,
        [name]: value
      });
    } else {
      setNewVideo({
        ...newVideo,
        [name]: value
      });
    }
  };

  // Handle video upload
  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      if (editingVideo) {
        // Update existing video
        const updatedVideos = videos.map(video => 
          video.id === editingVideo.id ? editingVideo : video
        );
        setVideos(updatedVideos);
        setEditingVideo(null);
      } else {
        // Add new video
        const uploadedVideo = {
          id: videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1,
          title: newVideo.title,
          description: newVideo.description,
          category: newVideo.category,
          uploadDate: new Date().toISOString().split('T')[0],
          views: 0,
          likes: 0,
          dislikes: 0,
          rating: 0,
          thumbnail: newVideo.thumbnail ? URL.createObjectURL(newVideo.thumbnail) : thumbnails[newVideo.title] || 'https://source.unsplash.com/random/300x200/?technology',
          duration: '00:00'
        };
        
        setVideos([uploadedVideo, ...videos]);
      }
      
      // Reset form
      setNewVideo({
        title: '',
        description: '',
        category: '',
        file: null,
        thumbnail: null
      });
      setUploading(false);
    }, 1000);
  };

  // Handle edit video
  const handleEdit = (video) => {
    setEditingVideo({ ...video });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete video
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter(video => video.id !== id));
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingVideo(null);
    setNewVideo({
      title: '',
      description: '',
      category: '',
      file: null,
      thumbnail: null
    });
  };

  // Calculate analytics data
  const totalVideos = videos.length;
  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const averageRating = videos.length > 0 
    ? (videos.reduce((sum, video) => sum + video.rating, 0) / videos.length).toFixed(1)
    : 0;

  // Chart data for views (green theme)
  const viewsChartData = {
    labels: videos.map(video => video.title),
    datasets: [
      {
        label: 'Views',
        data: videos.map(video => video.views),
        borderColor: '#10b981', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  // Chart data for ratings (green theme)
  const ratingsChartData = {
    labels: videos.map(video => video.title),
    datasets: [
      {
        label: 'Rating',
        data: videos.map(video => video.rating),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // emerald-500 with opacity
        borderColor: '#10b981',
        borderWidth: 1
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Ratings chart specific options
  const ratingsChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Green theme */}
      <header className="bg-emerald-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Trainer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium">Welcome, Trainer</span>
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <span className="text-lg">T</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Analytics Overview */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Analytics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
              <h3 className="text-gray-500 font-medium">Total Videos</h3>
              <p className="text-3xl font-bold text-emerald-600">{totalVideos}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
              <h3 className="text-gray-500 font-medium">Total Views</h3>
              <p className="text-3xl font-bold text-emerald-600">{totalViews}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
              <h3 className="text-gray-500 font-medium">Average Rating</h3>
              <p className="text-3xl font-bold text-emerald-600">{averageRating}</p>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2 text-gray-700">Views Over Time</h3>
            <div className="h-64">
              <Line data={viewsChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2 text-gray-700">Video Ratings</h3>
            <div className="h-64">
              <Bar data={ratingsChartData} options={ratingsChartOptions} />
            </div>
          </div>
        </section>

        {/* Upload/Edit Video Form */}
        <section className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {editingVideo ? 'Edit Video' : 'Upload New Video'}
          </h2>
          <form onSubmit={handleUpload}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Video Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingVideo ? editingVideo.title : newVideo.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={editingVideo ? editingVideo.category : newVideo.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="frontend">Frontend Development</option>
                  <option value="backend">Backend Development</option>
                  <option value="devops">DevOps</option>
                  <option value="datascience">Data Science</option>
                  <option value="mobile">Mobile Development</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={editingVideo ? editingVideo.description : newVideo.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Video File</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:border-emerald-400 transition-colors">
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                    id="video-upload"
                    required={!editingVideo}
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    {(editingVideo && editingVideo.file) || newVideo.file ? (
                      <span className="text-emerald-600">
                        {(editingVideo && editingVideo.file?.name) || newVideo.file?.name}
                      </span>
                    ) : (
                      <>
                        <p className="mb-2">Click to select video</p>
                        <p className="text-sm text-gray-500">MP4, MOV, or AVI (Max 500MB)</p>
                        {editingVideo && (
                          <p className="text-sm text-gray-500 mt-2">Current: {editingVideo?.title || 'No file selected'}</p>
                        )}
                      </>
                    )}
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Thumbnail Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center hover:border-emerald-400 transition-colors">
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    {(editingVideo && editingVideo.thumbnail) || newVideo.thumbnail ? (
                      typeof ((editingVideo && editingVideo.thumbnail) || newVideo.thumbnail) === 'string' ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={(editingVideo && editingVideo.thumbnail) || newVideo.thumbnail} 
                            alt="Current thumbnail" 
                            className="h-16 w-24 object-cover mb-2"
                          />
                          <span className="text-emerald-600">Change thumbnail</span>
                        </div>
                      ) : (
                        <span className="text-emerald-600">
                          {(editingVideo && editingVideo.thumbnail?.name) || newVideo.thumbnail?.name}
                        </span>
                      )
                    ) : (
                      <>
                        <p className="mb-2">Click to select thumbnail</p>
                        <p className="text-sm text-gray-500">JPG or PNG (Recommended 1280x720)</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                disabled={uploading}
                className={`px-6 py-2 rounded text-white font-medium ${uploading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-700'} transition-colors`}
              >
                {uploading ? 'Processing...' : editingVideo ? 'Update Video' : 'Upload Video'}
              </button>
              {editingVideo && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Video History */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Videos ({videos.length})</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upload Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {videos.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={video.thumbnail} alt="Thumbnail" className="h-12 w-20 object-cover rounded" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{video.title}</div>
                        <div className="text-sm text-gray-500">{video.duration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {video.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {video.uploadDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-900">{video.views}</div>
                        <div className="text-sm text-gray-500">
                          {video.likes} likes • {video.dislikes} dislikes
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{video.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(video)}
                          className="text-emerald-600 hover:text-emerald-900 mr-3"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(video.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TrainerDashboard;