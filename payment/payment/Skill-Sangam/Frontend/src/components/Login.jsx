import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginType, setLoginType] = useState('trainer');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    githubUsername: '',
    studentPassword: '',
    email: ''
  });
  const [showPassword, setShowPassword] = useState({
    trainer: false,
    student: false
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginType === 'trainer') {
      console.log('Trainer login:', {
        username: formData.username,
        password: formData.password
      });
      // Redirect to trainer dashboard
      navigate('/TrainerDashboard');
    } else {
      console.log('Student login:', {
        username: formData.githubUsername,
        password: formData.studentPassword
      });
      // Redirect to student dashboard
      navigate('/StudentDashboard');
    }
  };

  const togglePasswordVisibility = (type) => {
    setShowPassword(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTrainerRegisterClick = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate('/trainer-register');
    }, 3000);
  };

  const handleStudentSignUpClick = () => {
    navigate('/StudentLogin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-3 px-4 text-center z-50 animate-fade-in">
          Registered successfully! Redirecting to registration page...
        </div>
      )}

      {/* Register Button at Top Right */}
      <button
        onClick={handleTrainerRegisterClick}
        className="absolute top-4 right-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Trainer Register
      </button>

      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Peer Learning Marketplace</h1>
        <p className="text-center text-gray-600 mb-8">Welcome</p>

        {/* Login Type Toggle */}
        <div className="flex border border-gray-200 rounded-lg mb-8 overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-3 font-medium transition-colors ${
              loginType === 'trainer'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setLoginType('trainer')}
          >
            Trainer
          </button>
          <button
            type="button"
            className={`flex-1 py-3 font-medium transition-colors ${
              loginType === 'student'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setLoginType('student')}
          >
            Student
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginType === 'trainer' ? (
            <>
              {/* Trainer Login Form */}
              <div className='flex flex-col'>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Password
                </label>
                <input
                  type={showPassword.trainer ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showTrainerPassword"
                  checked={showPassword.trainer}
                  onChange={() => togglePasswordVisibility('trainer')}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="showTrainerPassword" className="ml-2 text-sm text-gray-700">
                  Show Password
                </label>
              </div>
            </>
          ) : (
            <>
              {/* Student Login Form */}
              <div className='flex flex-col'>
                <label htmlFor="githubUsername" className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Username
                </label>
                <input
                  type="text"
                  id="githubUsername"
                  name="githubUsername"
                  value={formData.githubUsername}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="studentPassword" className="block text-sm font-medium text-gray-700 mb-1 self-start">
                  Password
                </label>
                <input
                  type={showPassword.student ? 'text' : 'password'}
                  id="studentPassword"
                  name="studentPassword"
                  value={formData.studentPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="showStudentPassword"
                  checked={showPassword.student}
                  onChange={() => togglePasswordVisibility('student')}
                  className="h-4 w-4 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="showStudentPassword" className="ml-2 text-sm text-gray-700">
                  Show Password
                </label>
              </div>
              {/* Student Sign Up Section */}
              <div className="text-center mt-4">
                <p className="text-gray-600 mb-2">Don't have an account?</p>
                <button
                  type="button"
                  onClick={handleStudentSignUpClick}
                  className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;