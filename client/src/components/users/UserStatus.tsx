import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const UserStatus: React.FC = () => {
  const { isLoggedIn, username, isLoadingAuth } = useAuth();
  const navigate = useNavigate();

  const isGuest = !isLoggedIn || !username;

  const handleUserStatusClick = () => {
    if (isGuest) {
      navigate('/login');
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="fixed top-4 right-4 bg-white text-gray-900 rounded-lg shadow-md px-3 py-1.5 flex items-center space-x-2 text-xs w-auto max-w-[150px]">
        Loading user status...
      </div>
    );
  }

  return (
    <div
      className={`
        fixed top-4 right-4 bg-white text-gray-900 rounded-lg shadow-md px-3 py-1.5 flex items-center space-x-2 max-w-[180px]
        ${isGuest ? 'cursor-pointer hover:bg-gray-100 transition-colors duration-200' : ''}
      `}
      onClick={isGuest ? handleUserStatusClick : undefined}
      title={isGuest ? 'Click to login' : undefined}
      role={isGuest ? 'button' : undefined}
      tabIndex={isGuest ? 0 : undefined}
      onKeyDown={(e) => {
        if (isGuest && (e.key === 'Enter' || e.key === ' ')) {
          handleUserStatusClick();
        }
      }}
    >
      <img
        src={
          isGuest
            ? "https://api.dicebear.com/7.x/thumbs/svg?seed=guest"
            : "https://api.dicebear.com/7.x/thumbs/svg?seed=" + username
        }
        alt="User avatar"
        className="w-8 h-8 rounded-full flex-shrink-0"
      />
      <div className="truncate">
        <div className="font-semibold text-xs truncate">
          {isGuest ? 'Hello Guest' : `Welcome, ${username}`}
        </div>
        <div className="text-[10px] text-gray-500 truncate">
          {isGuest ? 'Not logged in' : 'Logged in'}
        </div>
      </div>
    </div>
  );
};
