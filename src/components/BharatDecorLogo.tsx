import React from 'react';

interface BharatDecorLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  showSubtitle?: boolean;
  subtitleText?: string;
}

export const BharatDecorLogo: React.FC<BharatDecorLogoProps> = ({
  className = 'h-10',
  theme = 'light',
  showSubtitle = false,
  subtitleText = '',
}) => {
  // Unique gradient and clip IDs to avoid collision if multiple logos are rendered on the same page
  const gradientId = `bharat-gold-grad-${theme}`;
  const clipId = `bharat-top-clip-${theme}`;

  return (
    <div className="flex items-center select-none">
      {/* Real Vector Brand Logo matching uploaded asset */}
      <div className={`relative flex items-center ${className}`}>
        <svg
          viewBox="0 0 460 68"
          className="h-full w-auto max-w-full"
          style={{ overflow: 'visible' }}
          aria-label="Bharat Decor Logo"
        >
          <defs>
            {/* Rich Luminous Metallic Gold Gradient matching uploaded brand asset */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F9CC48" />
              <stop offset="25%" stopColor="#EBAB18" />
              <stop offset="55%" stopColor="#F7C93E" />
              <stop offset="80%" stopColor="#D99208" />
              <stop offset="100%" stopColor="#EDB01F" />
            </linearGradient>

            {/* Clipping path for the top lobe of the 'B' monogram */}
            <clipPath id={clipId}>
              <path d="M 6,4 L 38,4 C 48,4 56,10 56,18 C 56,26 48,32 38,32 L 6,32 Z" />
            </clipPath>
          </defs>

          {/* ================= ICON: 'B' MONOGRAM ================= */}
          <g transform="translate(2, 2)">
            {/* Left Vertical Spine */}
            <rect
              x="5"
              y="4"
              width="9.5"
              height="52"
              rx="2.5"
              fill={`url(#${gradientId})`}
            />

            {/* Upper Bowl: Diagonal Hatching Stripes (45-degree angle) */}
            <g clipPath={`url(#${clipId})`}>
              <line x1="5" y1="14" x2="25" y2="-6" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
              <line x1="12" y1="23" x2="35" y2="0" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
              <line x1="21" y1="31" x2="46" y2="6" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
              <line x1="31" y1="38" x2="57" y2="12" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
              <line x1="42" y1="44" x2="68" y2="18" stroke={`url(#${gradientId})`} strokeWidth="4.5" strokeLinecap="round" />
            </g>

            {/* Lower Bowl: Clean Open Outline Contour */}
            <path
              d="M 6,32 L 38,32 C 49,32 58,38 58,46 C 58,54 49,56 38,56 L 6,56"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </g>

          {/* ================= TYPOGRAPHY: "BHARAT DECOR" ================= */}
          <text
            x="76"
            y="43"
            fill={`url(#${gradientId})`}
            fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', 'Montserrat', 'Segoe UI', sans-serif"
            fontSize="30"
            fontWeight="800"
            letterSpacing="0.14em"
            className="transition-colors"
          >
            BHARAT DECOR
          </text>
        </svg>
      </div>
    </div>
  );
};
