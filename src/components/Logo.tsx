import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  color?: 'default' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'horizontal',
  color = 'default'
}) => {
  const textColor = color === 'white' ? '#FFFFFF' : '#0B3D91';
  const accentColor = '#F47C20';
  
  if (variant === 'icon-only') {
    return (
      <svg 
        viewBox="0 0 64 64" 
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" rx="12" fill="#0B3D91"/>
        <path d="M32 8L48 20V44L32 56L16 44V20L32 8Z" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M32 16L40 22V38L32 44L24 38V22L32 16Z" fill="#F47C20"/>
        <path d="M32 24L36 27V33L32 36L28 33V27L32 24Z" fill="white"/>
        <path d="M32 8V56" stroke="white" strokeWidth="1.5" strokeDasharray="4 2"/>
        <path d="M16 20L48 44" stroke="white" strokeWidth="1" opacity="0.5"/>
        <path d="M48 20L16 44" stroke="white" strokeWidth="1" opacity="0.5"/>
      </svg>
    );
  }

  if (variant === 'vertical') {
    return (
      <svg 
        viewBox="0 0 120 140" 
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Icon */}
        <g transform="translate(28, 0)">
          <rect width="64" height="64" rx="12" fill="#0B3D91"/>
          <path d="M32 8L48 20V44L32 56L16 44V20L32 8Z" stroke="white" strokeWidth="2" fill="none"/>
          <path d="M32 16L40 22V38L32 44L24 38V22L32 16Z" fill="#F47C20"/>
          <path d="M32 24L36 27V33L32 36L28 33V27L32 24Z" fill="white"/>
        </g>
        {/* Text */}
        <text x="60" y="85" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill={textColor} letterSpacing="-0.02em">Linked</text>
        <text x="60" y="105" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" fill={textColor} letterSpacing="-0.02em">Past Due</text>
        <rect x="35" y="110" width="50" height="2" fill={accentColor}/>
        <text x="60" y="130" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill={color === 'white' ? '#FFFFFF' : '#4A4A4A'} letterSpacing="0">Construction</text>
      </svg>
    );
  }

  // Horizontal variant (default)
  return (
    <svg 
      viewBox="0 0 280 64" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Icon */}
      <rect width="64" height="64" rx="12" fill="#0B3D91"/>
      <path d="M32 8L48 20V44L32 56L16 44V20L32 8Z" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M32 16L40 22V38L32 44L24 38V22L32 16Z" fill="#F47C20"/>
      <path d="M32 24L36 27V33L32 36L28 33V27L32 24Z" fill="white"/>
      <path d="M32 8V56" stroke="white" strokeWidth="1.5" strokeDasharray="4 2"/>
      <path d="M16 20L48 44" stroke="white" strokeWidth="1" opacity="0.5"/>
      <path d="M48 20L16 44" stroke="white" strokeWidth="1" opacity="0.5"/>
      
      {/* Text */}
      <text x="80" y="28" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" fill={textColor} letterSpacing="-0.02em">Linked</text>
      <text x="80" y="52" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700" fill={textColor} letterSpacing="-0.02em">Past Due</text>
      <rect x="80" y="58" width="95" height="3" fill={accentColor}/>
      <text x="182" y="52" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill={color === 'white' ? '#FFFFFF' : '#4A4A4A'} letterSpacing="0">Construction</text>
    </svg>
  );
};

export default Logo;