import { useState, ChangeEvent, FormEvent } from 'react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: { token: string } = await response.json();
      const { token } = data;

      // Simpan token ke localStorage
      localStorage.setItem('authToken', token);

      console.log('Login successful:', data);

      // Arahkan pengguna ke halaman admin
      window.location.href = '/admin';
    } catch (err) {
      alert('Username atau password salah');
      console.error((err as Error).message);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Username</label>
            <input
              id="username"
              type="text"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="your username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
            >
              <span className="flex items-center justify-center w-6 h-6">
                {showPassword ? 'Hidden' : 'Show'}
              </span>
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-800 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
