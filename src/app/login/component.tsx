import {useState} from 'react';
import {User, Lock, LogIn} from 'lucide-react';
import {BrutalistButton} from '@/components/ui/BrutalistButton';
import {Logo} from '@/components/ui/Logo';
import {soundManager} from '@/utils/sounds';

type LoginProps = {
  onLogin: (username: string) => void;
};

export function Login({onLogin}: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      soundManager.playSuccess();
      onLogin(username.trim());
    }
  };

  const handleDemoLogin = () => {
    soundManager.playClick();
    onLogin('Demo User');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-3">
            <Logo />
            <h1 className="tracking-tight uppercase">Quiz App</h1>
          </div>
          <p className="text-sm tracking-wide text-gray-600 uppercase">
            Test your knowledge. Track your progress.
          </p>
        </div>

        {/* Login Form */}
        <div className="card">
          <div className="p-8">
            <div className="mb-6 flex gap-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`border-box flex-1 cursor-pointer px-4 py-3 tracking-wide uppercase transition-colors ${
                  isLogin ? 'bg-primary' : 'bg-white'
                }`}>
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`border-box flex-1 px-4 py-3 tracking-wide uppercase transition-colors ${
                  !isLogin ? 'bg-primary' : 'bg-white'
                }`}>
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="mb-2 block text-sm tracking-wide uppercase">
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute top-1/2 left-4 -translate-y-1/2"
                    size={20}
                    strokeWidth={3}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="focus:border-primary border-box w-full bg-white py-4 pr-4 pl-12 tracking-wide uppercase focus:outline-none"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="mb-2 block text-sm tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute top-1/2 left-4 -translate-y-1/2"
                    size={20}
                    strokeWidth={3}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:border-primary border-box w-full bg-white py-4 pr-4 pl-12 tracking-wide uppercase focus:outline-none"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <BrutalistButton
                type="submit"
                variant="primary"
                size="large"
                className="flex w-full items-center justify-center gap-3">
                <LogIn size={24} strokeWidth={3} />
                <span className="tracking-widest uppercase">
                  {isLogin ? 'Login' : 'Sign Up'}
                </span>
              </BrutalistButton>
            </form>
          </div>

          {/* Demo Login */}
          <div className="border-t-4 border-black bg-gray-50 p-6">
            <p className="mb-3 text-center text-sm tracking-wide text-gray-600 uppercase">
              Or try it out:
            </p>
            <button
              onClick={handleDemoLogin}
              className="border-box w-full bg-white px-4 py-3 tracking-wide uppercase transition-colors hover:bg-gray-100">
              Continue as Demo User
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm tracking-wide text-gray-600 uppercase">
          New-Brutalist Quiz Experience
        </p>
      </div>
    </div>
  );
}
