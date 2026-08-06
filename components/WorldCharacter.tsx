const characters: Record<string, (size: number) => React.ReactNode> = {
  "Wizard Academy": (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <polygon points="24,4 16,20 32,20" fill="#7F77DD" />
      <rect x="13" y="20" width="22" height="4" rx="2" fill="#A89FE8" />
      <polygon points="24,8 25,11 28,11 25.5,13 26.5,16 24,14.5 21.5,16 22.5,13 20,11 23,11" fill="#FFD93D" />
      <circle cx="24" cy="30" r="9" fill="#FBBF8C" />
      <circle cx="21" cy="29" r="1.8" fill="#1A1744" />
      <circle cx="27" cy="29" r="1.8" fill="#1A1744" />
      <circle cx="21.6" cy="28.4" r="0.6" fill="white" />
      <circle cx="27.6" cy="28.4" r="0.6" fill="white" />
      <path d="M21 33 Q24 36 27 33" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M15 38 Q15 46 24 47 Q33 46 33 38 L29 36 L24 38 L19 36 Z" fill="#7F77DD" />
    </svg>
  ),
  "Space Station": (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="20" r="13" fill="#E8E4FF" />
      <circle cx="24" cy="20" r="13" stroke="#7F77DD" strokeWidth="2" fill="none" />
      <path d="M15 17 Q24 26 33 17" fill="#4ECDC4" opacity="0.6" />
      <path d="M15 17 Q24 26 33 17" stroke="#3C3489" strokeWidth="1.5" fill="none" />
      <circle cx="21" cy="19" r="1.8" fill="#1A1744" />
      <circle cx="27" cy="19" r="1.8" fill="#1A1744" />
      <circle cx="21.6" cy="18.4" r="0.6" fill="white" />
      <circle cx="27.6" cy="18.4" r="0.6" fill="white" />
      <path d="M20 23 Q24 26 28 23" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M13 31 Q13 42 24 44 Q35 42 35 31 L31 29 L24 31 L17 29 Z" fill="#A89FE8" />
      <rect x="9" y="30" width="4" height="8" rx="2" fill="#7F77DD" />
      <rect x="35" y="30" width="4" height="8" rx="2" fill="#7F77DD" />
    </svg>
  ),
  "Detective Agency": (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="18" r="10" fill="#FBBF8C" />
      <rect x="14" y="10" width="20" height="4" rx="2" fill="#3C3489" />
      <rect x="17" y="6" width="14" height="6" rx="2" fill="#3C3489" />
      <circle cx="20" cy="18" r="2" fill="#1A1744" />
      <circle cx="28" cy="18" r="2" fill="#1A1744" />
      <circle cx="20.7" cy="17.3" r="0.7" fill="white" />
      <circle cx="28.7" cy="17.3" r="0.7" fill="white" />
      <path d="M20 22 Q24 25 28 22" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 28 Q14 38 24 40 Q34 38 34 28 L30 26 L24 28 L18 26 Z" fill="#3C3489" />
      <circle cx="36" cy="34" r="5" stroke="#7F77DD" strokeWidth="2" fill="none" />
      <line x1="39.5" y1="37.5" x2="43" y2="41" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  "Jungle Explorer": (size) => (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="26" r="10" fill="#FBBF8C" />
      <path d="M14 20 Q24 12 34 20" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="13" y="20" width="22" height="3" rx="1.5" fill="#A0522D" />
      <circle cx="21" cy="25" r="2" fill="#1A1744" />
      <circle cx="27" cy="25" r="2" fill="#1A1744" />
      <circle cx="21.7" cy="24.3" r="0.7" fill="white" />
      <circle cx="27.7" cy="24.3" r="0.7" fill="white" />
      <path d="M20 29 Q24 33 28 29" stroke="#1A1744" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 35 Q14 44 24 46 Q34 44 34 35 L30 33 L24 35 L18 33 Z" fill="#1D9E75" />
      <rect x="30" y="30" width="5" height="4" rx="1.5" fill="#3C3489" />
      <rect x="36" y="30" width="5" height="4" rx="1.5" fill="#3C3489" />
      <line x1="35" y1="32" x2="36" y2="32" stroke="#7F77DD" strokeWidth="1.5" />
    </svg>
  ),
};

export function WorldCharacter({ world, size = 64 }: { world: string; size?: number }) {
  const render = characters[world] ?? characters["Wizard Academy"];
  return <>{render(size)}</>;
}
