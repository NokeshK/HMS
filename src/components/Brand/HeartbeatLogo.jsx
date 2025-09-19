import React from 'react';
import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';

export default function HeartbeatLogo({ size = 24, className = '' }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Heart 
          size={size} 
          className="text-red-500 fill-current animate-pulse" 
        />
        <div className="absolute inset-0">
          <Heart 
            size={size} 
            className="text-red-600 fill-current opacity-30 animate-ping" 
          />
        </div>
      </div>
      <span 
        className="font-bold text-gray-900 dark:text-white"
        style={{ fontSize: `${size * 0.8}px` }}
      >
        MedVault
      </span>
    </div>
  );
}

HeartbeatLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};
