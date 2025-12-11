import {useState} from 'react';
import {User, Lock, LogIn, Check, CircleX} from 'lucide-react';
import {Button} from '@/components/ui/Button';
import {Logo} from '@/components/ui/Logo';
import {soundManager} from '@/utils';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/InputGroup';

type LoginProps = {
  onLogin: (username: string) => void;
};

export function Login({onLogin}: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
              <Button
                onClick={() => setIsLogin(true)}
                className={`border-box flex-1 cursor-pointer px-4 py-3 tracking-wide uppercase transition-colors ${
                  isLogin ? 'bg-primary' : 'bg-white'
                }`}>
                Login
              </Button>

              <Button
                onClick={() => setIsLogin(false)}
                className={`border-box flex-1 px-4 py-3 tracking-wide uppercase transition-colors ${
                  !isLogin ? 'bg-primary' : 'bg-white'
                }`}>
                Sign Up
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <InputGroup label="Username">
                  <InputGroupInput
                    name="username"
                    id="username"
                    placeholder="Enter username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <InputGroupAddon>
                    <User size={20} strokeWidth={3} />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              {/* Password Input */}
              <div>
                <InputGroup label="Password">
                  <InputGroupInput
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroupAddon>
                    <Lock size={20} strokeWidth={3} />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              {/* Confirm password Input */}
              {!isLogin && (
                <div>
                  <InputGroup
                    label="Confirm Password"
                    helpText="Please confirm your password">
                    <InputGroupInput
                      placeholder="Confirm password"
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <InputGroupAddon>
                      <Lock size={20} strokeWidth={3} />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      {confirmPassword &&
                        (password === confirmPassword ? (
                          <Check size={20} strokeWidth={3} color="green" />
                        ) : (
                          <CircleX size={20} strokeWidth={3} color="red" />
                        ))}
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" variant="primary" size="full">
                <LogIn size={24} strokeWidth={3} />
                <span className="tracking-widest uppercase">
                  {isLogin ? 'Login' : 'Sign Up'}
                </span>
              </Button>
            </form>
          </div>

          {/* Demo Login */}
          <div className="border-t-4 border-black bg-gray-50 p-6">
            <p className="mb-3 text-center text-sm tracking-wide text-gray-600 uppercase">
              Or try it out:
            </p>
            <Button
              variant="secondary"
              className="uppercase"
              size="full"
              onClick={handleDemoLogin}>
              Continue as Demo User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
