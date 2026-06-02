import React from 'react';

interface CustomLessonIconProps {
  iconId: string;
  className?: string;
  size?: number;
}

export const CustomLessonIcon: React.FC<CustomLessonIconProps> = ({
  iconId,
  className = '',
  size = 48
}) => {
  const normId = iconId.toLowerCase().trim();

  // Custom premium inline SVGs
  switch (normId) {
    case 'letter_a':
      return (
        <svg id="svg-letter-a" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          <path d="M50 20 L30 75 M50 20 L70 75 M37 58 L63 58" stroke="#D4A017" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M68 62 L78 74" stroke="#10B981" strokeWidth="4" strokeLinecap="round" fill="none" />
          <text x="66" y="80" fill="#10B981" fontSize="24" fontFamily="monospace" fontWeight="black">a</text>
        </svg>
      );

    case 'letter_b':
      return (
        <svg id="svg-letter-b" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          <path d="M35 20 L35 80 M35 20 C50 20 65 28 65 37 C65 46 50 50 35 50 C50 50 70 54 70 65 C70 76 50 80 35 80" stroke="#D4A017" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="68" y="82" fill="#10B981" fontSize="24" fontFamily="monospace" fontWeight="black">b</text>
        </svg>
      );

    case 'letter_c':
      return (
        <svg id="svg-letter-c" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          <path d="M70 32 C65 24 55 20 45 20 C30 20 20 32 20 50 C20 68 30 80 45 80 C55 80 65 76 70 68" stroke="#D4A017" strokeWidth="8" strokeLinecap="round" fill="none" />
          <text x="65" y="80" fill="#10B981" fontSize="24" fontFamily="monospace" fontWeight="black">c</text>
        </svg>
      );

    case 'letter_d':
      return (
        <svg id="svg-letter-d" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          <path d="M35 20 L35 80 M35 20 C60 20 75 32 75 50 C75 68 60 80 35 80" stroke="#D4A017" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="68" y="80" fill="#10B981" fontSize="24" fontFamily="monospace" fontWeight="black">d</text>
        </svg>
      );

    case 'apple':
      return (
        <svg id="svg-apple" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <path d="M50 35 C42 22 18 25 18 48 C18 72 38 85 50 85 C62 85 82 72 82 48 C82 25 58 22 50 35 Z" fill="#EF4444" />
          {/* Leaf & Stem */}
          <path d="M50 35 Q50 15 56 12" stroke="#B8860B" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M54 22 C64 16 72 26 54 22 Z" fill="#10B981" />
          <circle cx="34" cy="44" r="5" fill="#FFFFFF" opacity="0.4" />
        </svg>
      );

    case 'ball':
      return (
        <svg id="svg-ball" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="40" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
          {/* Sports stripes */}
          <path d="M14 34 C30 40 70 40 86 34" fill="none" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
          <path d="M14 66 C30 60 70 60 86 66" fill="none" stroke="#FBBF24" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="50" r="14" fill="#EF4444" />
        </svg>
      );

    case 'cat':
      return (
        <svg id="svg-cat" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.08" />
          {/* Ears */}
          <polygon points="25,48 15,20 40,40" fill="#D4A017" />
          <polygon points="75,48 85,20 60,40" fill="#D4A017" />
          {/* Inner ears */}
          <polygon points="26,44 19,26 35,38" fill="#FCA5A5" />
          <polygon points="74,44 81,26 65,38" fill="#FCA5A5" />
          {/* Face */}
          <ellipse cx="50" cy="58" rx="30" ry="24" fill="#F59E0B" />
          {/* Eyes */}
          <circle cx="38" cy="52" r="5" fill="#1A1A1A" />
          <circle cx="39" cy="50" r="1.5" fill="#FFFFFF" />
          <circle cx="62" cy="52" r="5" fill="#1A1A1A" />
          <circle cx="63" cy="50" r="1.5" fill="#FFFFFF" />
          {/* Nose & Mouth */}
          <polygon points="50,60 46,56 54,56" fill="#EF4444" />
          <path d="M50 60 Q46 66 42 63 M50 60 Q54 66 58 63" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <line x1="22" y1="58" x2="10" y2="56" stroke="#1A1A1A" strokeWidth="2" />
          <line x1="22" y1="62" x2="11" y2="64" stroke="#1A1A1A" strokeWidth="2" />
          <line x1="78" y1="58" x2="90" y2="56" stroke="#1A1A1A" strokeWidth="2" />
          <line x1="78" y1="62" x2="89" y2="64" stroke="#1A1A1A" strokeWidth="2" />
        </svg>
      );

    case 'dog':
      return (
        <svg id="svg-dog" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.08" />
          {/* Drooping ears */}
          <path d="M22 34 C12 34 16 64 24 64 Z" fill="#B45309" />
          <path d="M78 34 C88 34 84 64 76 64 Z" fill="#B45309" />
          {/* Head */}
          <ellipse cx="50" cy="50" rx="28" ry="24" fill="#D97706" />
          {/* Snout */}
          <ellipse cx="50" cy="58" rx="14" ry="11" fill="#FEF3C7" />
          {/* Nose */}
          <polygon points="50,54 44,48 56,48" fill="#1A1A1A" />
          <line x1="50" y1="54" x2="50" y2="61" stroke="#1A1A1A" strokeWidth="2.5" />
          {/* Eyes */}
          <circle cx="39" cy="42" r="4.5" fill="#1A1A1A" />
          <circle cx="61" cy="42" r="4.5" fill="#1A1A1A" />
          {/* Tongue */}
          <path d="M47 61 C47 67 53 67 53 61 Z" fill="#EF4444" />
        </svg>
      );

    case 'num_1':
      return (
        <svg id="svg-num-1" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#FEF3C7" stroke="#D4A017" strokeWidth="4" />
          <path d="M44 34 Q49 32 52 24 L52 74 M40 74 L64 74" stroke="#0F6B4B" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'num_2':
      return (
        <svg id="svg-num-2" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#E0F2FE" stroke="#0284C7" strokeWidth="4" />
          <path d="M32 36 C32 24 45 18 53 26 C59 32 55 42 42 54 L30 68 L68 68" stroke="#0F6B4B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'num_3':
      return (
        <svg id="svg-num-3" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="42" fill="#E0F5EE" stroke="#10B981" strokeWidth="4" />
          <path d="M32 26 L64 26 L45 44 C54 44 64 48 64 60 C64 72 50 74 38 68" stroke="#0F6B4B" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );

    case 'color_red':
      return (
        <svg id="svg-col-red" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="38" fill="#EF4444" stroke="#DC2626" strokeWidth="3" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#EF4444" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />
          <path d="M35 35 Q50 25 65 35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      );

    case 'color_blue':
      return (
        <svg id="svg-col-blue" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="38" fill="#3B82F6" stroke="#2563EB" strokeWidth="3" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />
          <path d="M35 35 Q50 25 65 35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.4" />
        </svg>
      );

    case 'color_yellow':
      return (
        <svg id="svg-col-yellow" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="38" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
          <circle cx="50" cy="50" r="45" fill="none" stroke="#FBBF24" strokeWidth="2" opacity="0.3" strokeDasharray="5,5" />
          <path d="M35 35 Q50 25 65 35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
      );

    case 'cow':
      return (
        <svg id="svg-cow" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#FFEFEF" />
          {/* Horns */}
          <path d="M36 32 C26 22 28 8 32 6 Q31 16 39 28" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
          <path d="M64 32 C74 22 72 8 68 6 Q69 16 61 28" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
          {/* Ears */}
          <ellipse cx="26" cy="38" rx="14" ry="6" fill="#F9A8D4" transform="rotate(-30 26 38)" />
          <ellipse cx="74" cy="38" rx="14" ry="6" fill="#F9A8D4" transform="rotate(30 74 38)" />
          {/* Face */}
          <ellipse cx="50" cy="48" rx="24" ry="28" fill="#FFFFFF" stroke="#0F6B4B" strokeWidth="3" />
          {/* Black patches */}
          <path d="M34 26 C30 36 44 40 40 48" fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 26 C68 34 58 40 64 48" fill="none" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
          {/* Eyes */}
          <circle cx="40" cy="42" r="3.5" fill="#1A1A1A" />
          <circle cx="60" cy="42" r="3.5" fill="#1A1A1A" />
          {/* Pink Snout */}
          <ellipse cx="50" cy="64" rx="20" ry="12" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2" />
          {/* Nostrils */}
          <circle cx="44" cy="64" r="3" fill="#DB2777" />
          <circle cx="56" cy="64" r="3" fill="#DB2777" />
        </svg>
      );

    case 'goat':
      return (
        <svg id="svg-goat" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.08" />
          {/* Horns */}
          <path d="M42 22 Q40 8 36 2" fill="none" stroke="#6B7280" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M58 22 Q60 8 64 2" fill="none" stroke="#6B7280" strokeWidth="4.5" strokeLinecap="round" />
          {/* Head & Ears */}
          <ellipse cx="18" cy="42" rx="12" ry="5" fill="#D1D5DB" transform="rotate(-15 18 42)" />
          <ellipse cx="82" cy="42" rx="12" ry="5" fill="#D1D5DB" transform="rotate(15 82 42)" />
          <polygon points="36,25 64,25 58,74 42,74" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="43" cy="42" r="3" fill="#1A1A1A" />
          <circle cx="57" cy="42" r="3" fill="#1A1A1A" />
          {/* Beard */}
          <polygon points="46,74 54,74 50,88" fill="#F3F4F6" />
        </svg>
      );

    case 'sheep':
      return (
        <svg id="svg-sheep" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#F0FDFC" />
          {/* Fluffy body bubbles */}
          <circle cx="36" cy="42" r="16" fill="#F3F4F6" />
          <circle cx="64" cy="42" r="16" fill="#F3F4F6" />
          <circle cx="50" cy="58" r="18" fill="#F3F4F6" />
          <circle cx="50" cy="36" r="16" fill="#FFFFFF" />
          {/* Head */}
          <ellipse cx="50" cy="48" rx="11" ry="15" fill="#1A1A1A" />
          <ellipse cx="40" cy="42" rx="8" ry="3" fill="#1A1A1A" transform="rotate(-20 40 42)" />
          <ellipse cx="60" cy="42" rx="8" ry="3" fill="#1A1A1A" transform="rotate(20 60 42)" />
          {/* Face eyes */}
          <circle cx="47" cy="46" r="1.5" fill="#FFFFFF" />
          <circle cx="53" cy="46" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'daddy':
      return (
        <svg id="svg-daddy" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          {/* Head outline */}
          <circle cx="50" cy="44" r="22" fill="#FDBA74" />
          <path d="M30 40 Q50 32 70 40" stroke="#1A1A1A" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* Glass / eyes */}
          <circle cx="42" cy="44" r="4" fill="#1A1A1A" />
          <circle cx="58" cy="44" r="4" fill="#1A1A1A" />
          <path d="M46 44 L54 44" stroke="#1A1A1A" strokeWidth="2" />
          {/* Smile */}
          <path d="M44 54 Q50 58 56 54" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Shoulders / suit */}
          <path d="M22 80 C26 70 38 64 50 64 C62 64 74 70 78 80 Z" fill="#1E3A8A" />
          <polygon points="50,64 45,74 55,74" fill="#FFFFFF" />
          <polygon points="50,74 47,80 53,80" fill="#EF4444" />
        </svg>
      );

    case 'mommy':
      return (
        <svg id="svg-mommy" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          {/* Curly hair back */}
          <circle cx="34" cy="38" r="14" fill="#B45309" />
          <circle cx="66" cy="38" r="14" fill="#B45309" />
          <circle cx="50" cy="28" r="16" fill="#B45309" />
          {/* Head */}
          <circle cx="50" cy="45" r="21" fill="#FDBA74" />
          {/* Eyes & rosy cheeks */}
          <circle cx="42" cy="44" r="3.5" fill="#1A1A1A" />
          <circle cx="58" cy="44" r="3.5" fill="#1A1A1A" />
          <circle cx="34" cy="49" r="3" fill="#F472B6" opacity="0.6" />
          <circle cx="66" cy="49" r="3" fill="#F472B6" opacity="0.6" />
          {/* Smile */}
          <path d="M42 54 Q50 61 58 54" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Dress shoulders */}
          <path d="M24 80 C28 72 38 66 50 66 C62 66 72 72 76 80 Z" fill="#EC4899" />
          <circle cx="50" cy="72" r="4" fill="#FBBF24" />
        </svg>
      );

    case 'baby':
      return (
        <svg id="svg-baby" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.1" />
          <circle cx="50" cy="48" r="22" fill="#FED7AA" />
          {/* Nursery Baby Cap */}
          <path d="M28 44 C28 24 72 24 72 44 Z" fill="#60A5FA" />
          <circle cx="50" cy="25" r="5" fill="#FFFFFF" />
          {/* Large cartoon eyes */}
          <circle cx="42" cy="46" r="4" fill="#1A1A1A" />
          <circle cx="43" cy="44" r="1" fill="#FFFFFF" />
          <circle cx="58" cy="46" r="4" fill="#1A1A1A" />
          <circle cx="59" cy="44" r="1" fill="#FFFFFF" />
          {/* Cute Pacifier */}
          <circle cx="50" cy="58" r="6" fill="#FBBF24" />
          <path d="M50 58 Q50 66 44 65" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'eye':
      return (
        <svg id="svg-eye" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <path d="M15 50 C26 28 74 28 85 50 C74 72 26 72 15 50 Z" stroke="#0F6B4B" strokeWidth="6" strokeLinejoin="round" fill="none" />
          <circle cx="50" cy="50" r="16" fill="#0F6B4B" />
          <circle cx="50" cy="50" r="10" fill="#3B82F6" />
          <circle cx="53" cy="47" r="3.5" fill="#FFFFFF" />
        </svg>
      );

    case 'nose':
      return (
        <svg id="svg-nose" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#FEFBF6" />
          <path d="M50 25 C50 25 44 54 41 62 C37 70 50 72 50 72 C50 72 63 70 59 62 C56 54 50 25 50 25 Z" fill="#FDBA74" stroke="#D4A017" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="44" cy="65" rx="3.5" ry="2" fill="#4B5563" />
          <ellipse cx="56" cy="65" rx="3.5" ry="2" fill="#4B5563" />
        </svg>
      );

    case 'mouth':
      return (
        <svg id="svg-mouth" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <path d="M22 46 Q50 35 78 46 Q78 72 50 72 Q22 72 22 46 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M26 48 Q50 48 74 48" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M34 48 Q50 58 66 48" fill="#FFFFFF" />
        </svg>
      );

    case 'milk':
      return (
        <svg id="svg-milk" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <rect x="32" y="32" width="36" height="48" rx="6" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="3" />
          <polygon points="32,32 50,14 68,32" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="3" strokeLinejoin="round" />
          {/* Blue Cow Logo & text */}
          <rect x="38" y="44" width="24" height="20" fill="#3B82F6" rx="2" />
          <path d="M42 54 L46 50 L50 54 L54 50" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="56" r="3" fill="#FBBF24" />
        </svg>
      );

    case 'bread':
      return (
        <svg id="svg-bread" width={size} height={size} viewBox="0 0 100 100" className={className}>
          {/* Loaf outline */}
          <path d="M25 44 C25 24 75 24 75 44 L75 75 C75 80 70 82 50 82 C30 82 25 80 25 75 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="3.5" strokeLinejoin="round" />
          <path d="M30 45 C30 30 70 30 70 45 L70 70 C70 75 66 77 50 77 C34 77 30 75 30 70 Z" fill="#FEF3C7" />
          {/* Toasty marks */}
          <line x1="40" y1="40" x2="44" y2="60" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="40" x2="54" y2="60" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="40" x2="64" y2="60" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'water':
      return (
        <svg id="svg-water" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#EFF6FF" />
          <path d="M50 16 C50 16 22 52 22 66 C22 80 34 84 50 84 C66 84 78 80 78 66 C78 52 50 16 50 16 Z" fill="#60A5FA" stroke="#2563EB" strokeWidth="4" strokeLinejoin="round" />
          <path d="M42 58 C42 58 34 68 38 74" stroke="#EFF6FF" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
      );

    case 'please':
      return (
        <svg id="svg-please" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#FFEFEB" />
          <path d="M50 35 C42 16 12 25 12 50 C12 75 50 90 50 90 C50 90 88 75 88 50 C88 25 58 16 50 35 Z" fill="#F87171" stroke="#EF4444" strokeWidth="2" />
          <polygon points="50,40 54,49 64,49 56,55 59,65 50,59 41,65 44,55 36,49 46,49" fill="#FFF5F5" />
        </svg>
      );

    case 'thanks':
      return (
        <svg id="svg-thanks" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#E8F9EE" />
          <path d="M46 72 L26 72 C22 72 20 70 20 66 L20 46 C20 42 22 40 26 40 L38 40 M38 40 C38 30 44 14 52 14 C58 14 60 22 56 32 L56 40 L80 40 C84 40 86 44 84 48 L78 72 C76 76 72 78 68 78 L46 78 Z" fill="#10B981" stroke="#047857" strokeWidth="3.5" strokeLinejoin="round" />
        </svg>
      );

    case 'sorry':
      return (
        <svg id="svg-sorry" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#FEF3C7" stroke="#D4A017" strokeWidth="3.5" />
          <circle cx="36" cy="42" r="4.5" fill="#1A1A1A" />
          <circle cx="64" cy="42" r="4.5" fill="#1A1A1A" />
          {/* Sad mouth curve */}
          <path d="M38 64 Q50 52 62 64" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Little teardrop */}
          <path d="M32 48 Q28 58 31 61 Q34 61 34 56 C34 52 32 48 32 48 Z" fill="#3B82F6" />
        </svg>
      );

    case 'hello':
      return (
        <svg id="svg-hello" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#E0F2FE" />
          {/* Elegant waving hand vector */}
          <path d="M40 76 L34 54 C32 48 36 44 41 45 L42 58 M42 58 L42 32 C41 26 47 24 49 28 L51 52 M51 52 L52 26 C52 20 58 20 59 26 L60 52 M60 52 L61 28 C61 23 67 23 68 28 L68 52 M68 52 L70 34 C71 29 76 30 76 35 L71 78" stroke="#D4A017" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <path d="M31 76 Q18 64 30 68" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'goodbye':
      return (
        <svg id="svg-goodbye" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#FEE2E2" />
          <path d="M40 76 L30 52 C28 46 34 42 38 45 L40 58 M40 58 V30 C40 24 48 24 48 30 V52 M48 52 V26 C48 20 56 20 56 26 V52 M56 52 V28 C56 22 64 22 64 28 V52 M64 52 V34 C64 28 72 28 72 34 V74" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" fill="none" transform="rotate(-15 50 50)" />
          {/* Motion waves */}
          <path d="M78 30 C84 35 84 45 78 50" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'book':
      return (
        <svg id="svg-book" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <rect x="20" y="24" width="60" height="52" rx="4" fill="#0F6B4B" stroke="#D4A017" strokeWidth="3" />
          <path d="M50 24 L50 76" stroke="#D4A017" strokeWidth="4" />
          {/* Page lines */}
          <line x1="28" y1="36" x2="42" y2="36" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
          <line x1="28" y1="44" x2="42" y2="44" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
          <line x1="28" y1="52" x2="38" y2="52" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
          <line x1="58" y1="36" x2="72" y2="36" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
          <line x1="58" y1="44" x2="72" y2="44" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
          <line x1="58" y1="52" x2="68" y2="52" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        </svg>
      );

    case 'pencil':
      return (
        <svg id="svg-pencil" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <g transform="rotate(45 50 50)">
            <rect x="42" y="16" width="16" height="50" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
            <rect x="42" y="10" width="16" height="6" fill="#F472B6" />
            <rect x="42" y="16" width="16" height="4" fill="#D1D5DB" />
            <polygon points="42,66 58,66 50,86" fill="#FED7AA" stroke="#D97706" strokeWidth="1.5" />
            <polygon points="47,76 53,76 50,86" fill="#1A1A1A" />
          </g>
        </svg>
      );

    case 'teacher':
      return (
        <svg id="svg-teacher" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.08" />
          {/* Blackboard */}
          <rect x="18" y="18" width="64" height="34" rx="4" fill="#064E3B" stroke="#D4A017" strokeWidth="2" />
          <line x1="26" y1="28" x2="38" y2="28" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          <line x1="26" y1="36" x2="44" y2="36" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          {/* Ustaz Avatar */}
          <circle cx="50" cy="62" r="14" fill="#FED7AA" />
          {/* Cap */}
          <path d="M40 54 Q50 44 60 54 Z" fill="#0F6B4B" />
          <rect x="48" y="44" width="4" height="8" fill="#D4A017" />
          {/* Glasses */}
          <circle cx="45" cy="61" r="2.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
          <circle cx="55" cy="61" r="2.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
          {/* Clothes */}
          <path d="M32 84 C36 76 42 74 50 74 C58 74 64 76 68 84 Z" fill="#0F6B4B" />
        </svg>
      );

    default:
      // High-quality modern fallback envelope/shield vector
      return (
        <svg id="svg-fallback" width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0F6B4B" opacity="0.08" />
          <path d="M50 20 L78 32 L78 58 C78 74 66 84 50 88 C34 84 22 74 22 58 L22 32 Z" fill="none" stroke="#D4A017" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <polygon points="50,38 54,47 64,47 56,53 59,63 50,57 41,63 44,53 36,47 46,47" fill="#D4A017" />
        </svg>
      );
  }
};
