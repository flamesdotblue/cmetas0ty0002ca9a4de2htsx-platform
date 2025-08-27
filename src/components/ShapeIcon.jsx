export default function ShapeIcon({ type, color = '#ff3b30', className = '' }) {
  // Render large, simple, friendly shapes with rounded corners
  switch (type) {
    case 'circle':
      return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r="40" fill={color} />
        </svg>
      );
    case 'square':
      return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden>
          <rect x="20" y="20" width="60" height="60" rx="12" fill={color} />
        </svg>
      );
    case 'triangle':
      return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden>
          <polygon points="50,15 88,85 12,85" fill={color} />
        </svg>
      );
    case 'star':
      return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden>
          <polygon
            points="50,10 61,38 90,38 66,56 75,85 50,68 25,85 34,56 10,38 39,38"
            fill={color}
          />
        </svg>
      );
    case 'heart':
      return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden>
          <path
            d="M50 84s-30-18-30-38c0-10 8-18 18-18 6 0 11 3 14 8 3-5 8-8 14-8 10 0 18 8 18 18 0 20-30 38-30 38z"
            fill={color}
          />
        </svg>
      );
    case 'diamond':
      return (
        <svg className={className} viewBox="0 0 100 100" aria-hidden>
          <polygon points="50,10 85,50 50,90 15,50" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}
