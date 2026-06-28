type DonPataconProps = {
  className?: string;
  /** Tamaño en px del lado mayor. Por defecto escala con el contenedor. */
  size?: number;
};

/**
 * Don Patacón ® — mascota oficial de Papaupa.
 * Recreación en SVG de la ilustración de marca: patacón estriado con
 * bigote azul, sombrerito retro, guante levantando un patacón arcoíris
 * y zapatillas pride. Sin texto ni fondo, para superponer sobre la fachada.
 */
export default function DonPatacon({ className, size }: DonPataconProps) {
  const O = "#2a1a0f"; // contorno
  const BODY = "#f2b705"; // amarillo patacón
  const NAVY = "#1f3a8a"; // cejas + bigote
  const RED = "#d83a1f"; // nariz + boca

  return (
    <svg
      viewBox="0 0 210 232"
      width={size}
      height={size ? (size * 232) / 210 : undefined}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Don Patacón, la mascota de Papaupa, te saluda"
    >
      {/* ---------- ZAPATILLAS ARCOÍRIS ---------- */}
      <defs>
        <clipPath id="shoeL">
          <ellipse cx="80" cy="210" rx="22" ry="11" />
        </clipPath>
        <clipPath id="shoeR">
          <ellipse cx="130" cy="210" rx="22" ry="11" />
        </clipPath>
      </defs>

      {/* Piernas */}
      <path d="M90 168 L83 200" stroke={O} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M118 168 L125 200" stroke={O} strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Zapatilla izquierda */}
      <g>
        <ellipse cx="80" cy="210" rx="22" ry="12" fill="#fffaf0" stroke={O} strokeWidth="3.5" />
        <g clipPath="url(#shoeL)">
          <rect x="58" y="198" width="9" height="24" fill="#e74c3c" />
          <rect x="67" y="198" width="9" height="24" fill="#f39c12" />
          <rect x="76" y="198" width="9" height="24" fill="#f2b705" />
          <rect x="85" y="198" width="9" height="24" fill="#27ae60" />
          <rect x="94" y="198" width="9" height="24" fill="#2980b9" />
        </g>
        <ellipse cx="80" cy="210" rx="22" ry="12" fill="none" stroke={O} strokeWidth="3.5" />
      </g>

      {/* Zapatilla derecha */}
      <g>
        <ellipse cx="130" cy="210" rx="22" ry="12" fill="#fffaf0" stroke={O} strokeWidth="3.5" />
        <g clipPath="url(#shoeR)">
          <rect x="108" y="198" width="9" height="24" fill="#e74c3c" />
          <rect x="117" y="198" width="9" height="24" fill="#f39c12" />
          <rect x="126" y="198" width="9" height="24" fill="#f2b705" />
          <rect x="135" y="198" width="9" height="24" fill="#27ae60" />
          <rect x="144" y="198" width="9" height="24" fill="#2980b9" />
        </g>
        <ellipse cx="130" cy="210" rx="22" ry="12" fill="none" stroke={O} strokeWidth="3.5" />
      </g>

      {/* ---------- BRAZOS ---------- */}
      {/* Brazo izquierdo, baja con guante */}
      <path d="M48 122 Q34 140 28 156" stroke={O} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Brazo derecho, levantado */}
      <path d="M152 86 Q176 58 188 36" stroke={O} strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* ---------- SOMBRERO RETRO ---------- */}
      <g>
        <ellipse cx="100" cy="38" rx="40" ry="9" fill="#fffaf0" stroke={O} strokeWidth="3" />
        <rect x="72" y="29" width="56" height="11" rx="3" fill="#fffaf0" stroke={O} strokeWidth="3" />
        <rect x="72" y="20" width="56" height="11" fill="#f4a8c2" stroke={O} strokeWidth="3" />
        <path d="M75 21 Q100 9 125 21 L125 22 Q100 11 75 22 Z" fill="#a9d4e8" />
        <rect x="76" y="12" width="48" height="10" rx="4" fill="#a9d4e8" stroke={O} strokeWidth="3" />
        <ellipse cx="100" cy="12" rx="24" ry="5.5" fill="#a9d4e8" stroke={O} strokeWidth="3" />
      </g>

      {/* ---------- CUERPO (patacón estriado) ---------- */}
      <path
        d="M 100.0 34.0 A 8.2 8.2 0 0 1 121.6 37.4 A 8.2 8.2 0 0 1 141.1 47.4 A 8.2 8.2 0 0 1 156.6 62.9 A 8.2 8.2 0 0 1 166.6 82.4 A 8.2 8.2 0 0 1 170.0 104.0 A 8.2 8.2 0 0 1 166.6 125.6 A 8.2 8.2 0 0 1 156.6 145.1 A 8.2 8.2 0 0 1 141.1 160.6 A 8.2 8.2 0 0 1 121.6 170.6 A 8.2 8.2 0 0 1 100.0 174.0 A 8.2 8.2 0 0 1 78.4 170.6 A 8.2 8.2 0 0 1 58.9 160.6 A 8.2 8.2 0 0 1 43.4 145.1 A 8.2 8.2 0 0 1 33.4 125.6 A 8.2 8.2 0 0 1 30.0 104.0 A 8.2 8.2 0 0 1 33.4 82.4 A 8.2 8.2 0 0 1 43.4 62.9 A 8.2 8.2 0 0 1 58.9 47.4 A 8.2 8.2 0 0 1 78.4 37.4 A 8.2 8.2 0 0 1 100.0 34.0 Z"
        fill={BODY}
        stroke={O}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Textura: estrías radiales */}
      <g stroke="#cf9400" strokeWidth="2.4" strokeLinecap="round" opacity="0.55">
        <line x1="100.0" y1="50.0" x2="100.0" y2="40.0" />
        <line x1="116.7" y1="52.6" x2="120.0" y2="43.0" />
        <line x1="131.7" y1="60.3" x2="137.5" y2="52.5" />
        <line x1="143.7" y1="72.3" x2="151.5" y2="66.5" />
        <line x1="151.4" y1="87.3" x2="160.8" y2="84.4" />
        <line x1="154.0" y1="104.0" x2="164.0" y2="104.0" />
        <line x1="151.4" y1="120.7" x2="160.8" y2="123.6" />
        <line x1="143.7" y1="135.7" x2="151.5" y2="141.5" />
        <line x1="131.7" y1="147.7" x2="137.5" y2="155.5" />
        <line x1="116.7" y1="155.4" x2="120.0" y2="165.0" />
        <line x1="100.0" y1="158.0" x2="100.0" y2="168.0" />
        <line x1="83.3" y1="155.4" x2="80.0" y2="165.0" />
        <line x1="68.3" y1="147.7" x2="62.5" y2="155.5" />
        <line x1="56.3" y1="135.7" x2="48.5" y2="141.5" />
        <line x1="48.6" y1="120.7" x2="39.2" y2="123.6" />
        <line x1="46.0" y1="104.0" x2="36.0" y2="104.0" />
        <line x1="48.6" y1="87.3" x2="39.2" y2="84.4" />
        <line x1="56.3" y1="72.3" x2="48.5" y2="66.5" />
        <line x1="68.3" y1="60.3" x2="62.5" y2="52.5" />
        <line x1="83.3" y1="52.6" x2="80.0" y2="43.0" />
      </g>

      {/* ---------- CARA ---------- */}
      {/* Cejas */}
      <path d="M70 84 Q83 75 96 83" stroke={NAVY} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M104 83 Q117 75 130 84" stroke={NAVY} strokeWidth="4.5" strokeLinecap="round" fill="none" />
      {/* Ojos (mirando arriba) */}
      <ellipse cx="84" cy="97" rx="9" ry="11" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      <ellipse cx="116" cy="97" rx="9" ry="11" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      <circle cx="85" cy="93" r="4.5" fill={O} />
      <circle cx="117" cy="93" r="4.5" fill={O} />
      <circle cx="86.5" cy="91.5" r="1.4" fill="#fffaf0" />
      <circle cx="118.5" cy="91.5" r="1.4" fill="#fffaf0" />
      {/* Nariz */}
      <circle cx="100" cy="109" r="4.6" fill={RED} stroke={O} strokeWidth="1.5" />
      {/* Bigote manillar */}
      <path
        d="M100 116 C 90 122 83 127 72 126 C 63 125 59 119 62 113 C 56 120 60 131 73 132 C 85 133 95 127 100 121 Z"
        fill={NAVY}
        stroke={O}
        strokeWidth="1.4"
      />
      <path
        d="M100 116 C 110 122 117 127 128 126 C 137 125 141 119 138 113 C 144 120 140 131 127 132 C 115 133 105 127 100 121 Z"
        fill={NAVY}
        stroke={O}
        strokeWidth="1.4"
      />
      {/* Boca */}
      <path d="M90 127 Q100 137 110 127 Q100 132 90 127 Z" fill={RED} stroke={O} strokeWidth="1.4" />

      {/* ---------- MANOS (guantes) ---------- */}
      {/* Mano izquierda con patacón pequeño */}
      <circle cx="24" cy="160" r="9" fill={BODY} stroke={O} strokeWidth="2.5" />
      <circle cx="28" cy="158" r="7.5" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      {/* Mano derecha levantando patacón arcoíris */}
      <g>
        <circle cx="190" cy="26" r="11" fill={BODY} stroke={O} strokeWidth="2.5" />
        <path d="M190 15 A 11 11 0 0 1 198 34 Z" fill="#e74c3c" opacity="0.9" />
        <path d="M190 18 A 8 8 0 0 1 195 31" stroke="#27ae60" strokeWidth="2" fill="none" />
        <path d="M186 17 A 9 9 0 0 1 193 33" stroke="#8e44ad" strokeWidth="2" fill="none" />
        <circle cx="184" cy="34" r="7.5" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      </g>
    </svg>
  );
}
