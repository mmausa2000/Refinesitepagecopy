import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, LogOut, User as UserIcon, UserPlus, Edit3, LogIn } from 'lucide-react';
import { useState } from 'react';
import { CreateAccountModal } from './CreateAccountModal';
import { LoginModal } from './LoginModal';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void; // Callback when user logs out
}

export function AccountModal({ isOpen, onClose, onLogout }: AccountModalProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(true); // Track if user is guest
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAccount = () => {
    console.log('Create/Upgrade Account clicked');
    setShowCreateAccount(true);
  };

  const handleLogin = () => {
    console.log('Login clicked');
    setShowLogin(true);
  };

  const handleAccountCreated = () => {
    // Update to non-guest state with new account data
    setIsGuest(false);
    console.log('Account created successfully! User is now logged in.');
  };

  const handleLoginSuccess = () => {
    // Update to non-guest state
    setIsGuest(false);
    console.log('Login successful!');
  };

  const handleLogout = () => {
    // Reset to guest state
    setIsGuest(true);
    setAvatar(null);
    console.log('Logged out - reverting to guest account');
    onClose();
    // Call the logout callback after closing the modal
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1a2942] border border-white/20 rounded-2xl p-6 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white">Profile</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                    <UserIcon className="w-12 h-12 text-white" />
                  </div>
                )}
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>

              {isGuest ? (
                <>
                  <h3 className="text-white mb-1">@Guest_2de87bcf</h3>
                  <p className="text-gray-400 text-sm">guest_6db3ddd4@quiz.local</p>
                  <span className="mt-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs border border-orange-500/30">
                    Guest Account
                  </span>
                </>
              ) : (
                <>
                  <h3 className="text-white mb-1">@Rabbi_Mali</h3>
                  <p className="text-gray-400 text-sm">rabbi.mali@ubible.com</p>
                </>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-teal-400 text-2xl mb-1">{isGuest ? '1' : '12'}</div>
                <div className="text-gray-400 text-xs">Level</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-teal-400 text-2xl mb-1">{isGuest ? '0' : '156'}</div>
                <div className="text-gray-400 text-xs">{isGuest ? 'XP' : 'Games Played'}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-gray-400 text-sm mb-1">{isGuest ? '11/17/2025' : '01/15/2024'}</div>
                <div className="text-gray-400 text-xs">Member Since</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Guest User Buttons */}
              {isGuest && (
                <>
                  <button
                    onClick={handleCreateAccount}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </button>

                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </button>
                </>
              )}

              {/* Registered User Button */}
              {!isGuest && (
                <button
                  onClick={handleCreateAccount}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 text-teal-400 hover:bg-white/10 border border-white/10 hover:border-teal-500/50 transition-all"
                >
                  <Edit3 className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
              )}

              {/* Logout Button - Always Visible */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20 hover:border-red-500/40 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>

          {/* Create Account Modal */}
          <CreateAccountModal
            isOpen={showCreateAccount}
            onClose={() => setShowCreateAccount(false)}
            onSuccess={handleAccountCreated}
            onSwitchToLogin={() => {
              setShowCreateAccount(false);
              setShowLogin(true);
            }}
          />

          {/* Login Modal */}
          <LoginModal
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSuccess={handleLoginSuccess}
            onSwitchToCreate={() => {
              setShowLogin(false);
              setShowCreateAccount(true);
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}