export default function CivicLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hexagon */}
      <path
        d="M20 2L36.5 11V29L20 38L3.5 29V11L20 2Z"
        stroke="#FF9D00"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Eye outer */}
      <ellipse cx="20" cy="20" rx="9" ry="6" stroke="#FF9D00" strokeWidth="1.2" fill="none" />
      {/* Pupil */}
      <circle cx="20" cy="20" r="3" fill="#FF9D00" />
      {/* Iris ring */}
      <circle cx="20" cy="20" r="5" stroke="rgba(255,157,0,0.4)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}