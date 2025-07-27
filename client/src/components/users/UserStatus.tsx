// components/UserStatus.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ייבוא useAuth

export const UserStatus: React.FC = () => {
  const { isLoggedIn, username, isLoadingAuth } = useAuth(); // שימוש ב-useAuth
  const navigate = useNavigate();

  const handleUserStatusClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); // שנה את '/login' לנתיב האמיתי של עמוד ההתחברות שלך
    }
  };

  if (isLoadingAuth) { // שימוש ב-isLoadingAuth מהקונטקסט
    return (
      <div className="fixed top-4 right-4 bg-white text-gray-900 rounded-xl shadow-lg px-4 py-2 flex items-center space-x-3">
        Loading user status...
      </div>
    );
  }

  return (
    <div
      className={`
        fixed top-4 right-4 bg-white text-gray-900 rounded-xl shadow-lg px-4 py-2 flex items-center space-x-3
        ${!isLoggedIn ? 'cursor-pointer hover:bg-gray-100 transition-colors duration-200' : ''}
      `}
      onClick={handleUserStatusClick}
    >
      <img
        src={isLoggedIn
          ? "https://api.dicebear.com/7.x/thumbs/svg?seed=" + (username || 'user')
          : "https://api.dicebear.com/7.x/thumbs/svg?seed=guest"}
        alt="User avatar"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <div className="font-semibold text-sm">
          {isLoggedIn ? `Welcome, ${username}` : 'Welcome, Guest'}
        </div>
        <div className="text-xs text-gray-500">
          {isLoggedIn ? 'Logged in' : 'Not logged in'}
        </div>
      </div>
    </div>
  );
};