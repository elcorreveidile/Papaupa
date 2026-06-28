type DonaPataconaProps = {
  className?: string;
  size?: number;
};

/**
 * La Patacona — mascota femenina de Papaupa: la cocinera colombiana, pareja
 * de Paco. Recreación en SVG a partir de la ilustración de marca: patacón con
 * pelo en llamas azul/rojo (colores de Colombia), pestañas, labios rojos,
 * manos en jarras y zapatillas rojas. Compañera de [Don Patacón].
 */
export default function DonaPatacona({ className, size }: DonaPataconaProps) {
  const O = "#2a1a0f";
  const BODY = "#f2b705";
  const RED = "#d83a1f";

  return (
    <svg
      viewBox="0 0 210 232"
      width={size}
      height={size ? (size * 232) / 210 : undefined}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="La Patacona, la cocinera colombiana de Papaupa"
    >
      {/* ---------- PIERNAS + ZAPATILLAS ROJAS ---------- */}
      <path d="M90 168 L84 196" stroke={O} strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M118 168 L126 196" stroke={O} strokeWidth="8" strokeLinecap="round" fill="none" />
      <g>
        <ellipse cx="80" cy="204" rx="19" ry="11" fill={RED} stroke={O} strokeWidth="3.5" />
        <path d="M64 206 Q80 210 96 206" stroke={O} strokeWidth="2" fill="none" />
      </g>
      <g>
        <ellipse cx="130" cy="204" rx="19" ry="11" fill={RED} stroke={O} strokeWidth="3.5" />
        <path d="M114 206 Q130 210 146 206" stroke={O} strokeWidth="2" fill="none" />
      </g>

      {/* ---------- PELO EN LLAMAS (azul/rojo · Colombia) ---------- */}
      <g transform="translate(34.2 127.9) rotate(250.0)"><ellipse cx="0" cy="-8" rx="8" ry="20" fill="#1f3a8a" stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(30.0 101.6) rotate(272.0)"><ellipse cx="0" cy="-8" rx="8" ry="17" fill={RED} stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(36.1 75.5) rotate(294.0)"><ellipse cx="0" cy="-8" rx="8" ry="20" fill="#1f3a8a" stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(51.4 53.6) rotate(316.0)"><ellipse cx="0" cy="-8" rx="8" ry="17" fill={RED} stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(73.8 39.1) rotate(338.0)"><ellipse cx="0" cy="-8" rx="8" ry="20" fill="#1f3a8a" stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(100.0 34.0) rotate(360.0)"><ellipse cx="0" cy="-8" rx="8" ry="17" fill={RED} stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(126.2 39.1) rotate(382.0)"><ellipse cx="0" cy="-8" rx="8" ry="20" fill="#1f3a8a" stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(148.6 53.6) rotate(404.0)"><ellipse cx="0" cy="-8" rx="8" ry="17" fill={RED} stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(163.9 75.5) rotate(426.0)"><ellipse cx="0" cy="-8" rx="8" ry="20" fill="#1f3a8a" stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(170.0 101.6) rotate(448.0)"><ellipse cx="0" cy="-8" rx="8" ry="17" fill={RED} stroke={O} strokeWidth="2.5" /></g>
      <g transform="translate(165.8 127.9) rotate(470.0)"><ellipse cx="0" cy="-8" rx="8" ry="20" fill="#1f3a8a" stroke={O} strokeWidth="2.5" /></g>

      {/* ---------- CUERPO (patacón) ---------- */}
      <path
        d="M 100.0 34.0 A 8.2 8.2 0 0 1 121.6 37.4 A 8.2 8.2 0 0 1 141.1 47.4 A 8.2 8.2 0 0 1 156.6 62.9 A 8.2 8.2 0 0 1 166.6 82.4 A 8.2 8.2 0 0 1 170.0 104.0 A 8.2 8.2 0 0 1 166.6 125.6 A 8.2 8.2 0 0 1 156.6 145.1 A 8.2 8.2 0 0 1 141.1 160.6 A 8.2 8.2 0 0 1 121.6 170.6 A 8.2 8.2 0 0 1 100.0 174.0 A 8.2 8.2 0 0 1 78.4 170.6 A 8.2 8.2 0 0 1 58.9 160.6 A 8.2 8.2 0 0 1 43.4 145.1 A 8.2 8.2 0 0 1 33.4 125.6 A 8.2 8.2 0 0 1 30.0 104.0 A 8.2 8.2 0 0 1 33.4 82.4 A 8.2 8.2 0 0 1 43.4 62.9 A 8.2 8.2 0 0 1 58.9 47.4 A 8.2 8.2 0 0 1 78.4 37.4 A 8.2 8.2 0 0 1 100.0 34.0 Z"
        fill={BODY}
        stroke={O}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <g stroke="#cf9400" strokeWidth="2.2" strokeLinecap="round" opacity="0.5">
        <line x1="100" y1="50" x2="100" y2="41" />
        <line x1="143.7" y1="72.3" x2="150.5" y2="67" />
        <line x1="154" y1="104" x2="163" y2="104" />
        <line x1="143.7" y1="135.7" x2="150.5" y2="141" />
        <line x1="56.3" y1="135.7" x2="49.5" y2="141" />
        <line x1="46" y1="104" x2="37" y2="104" />
        <line x1="56.3" y1="72.3" x2="49.5" y2="67" />
      </g>

      {/* Mejillas */}
      <ellipse cx="68" cy="112" rx="7" ry="5" fill="#f08a7a" opacity="0.5" />
      <ellipse cx="132" cy="112" rx="7" ry="5" fill="#f08a7a" opacity="0.5" />

      {/* ---------- CARA ---------- */}
      {/* Cejas */}
      <path d="M71 82 Q83 76 95 82" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M105 82 Q117 76 129 82" stroke={O} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Pestañas */}
      <g stroke={O} strokeWidth="2.4" strokeLinecap="round">
        <path d="M72 90 L65 85" />
        <path d="M75 87 L70 81" />
        <path d="M128 90 L135 85" />
        <path d="M125 87 L130 81" />
      </g>
      {/* Ojos */}
      <ellipse cx="84" cy="98" rx="10" ry="12" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      <ellipse cx="116" cy="98" rx="10" ry="12" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      <circle cx="84" cy="99" r="5" fill={O} />
      <circle cx="116" cy="99" r="5" fill={O} />
      <circle cx="86" cy="96.5" r="1.6" fill="#fffaf0" />
      <circle cx="118" cy="96.5" r="1.6" fill="#fffaf0" />
      {/* Nariz */}
      <ellipse cx="100" cy="110" rx="2.6" ry="2" fill={O} />
      {/* Labios rojos */}
      <path
        d="M84 119 Q100 112 116 119 Q117 129 100 133 Q83 129 84 119 Z"
        fill={RED}
        stroke={O}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M88 121 Q100 126 112 121" stroke="#9c2415" strokeWidth="1.8" fill="none" />
      <ellipse cx="94" cy="124" rx="2.4" ry="1.3" fill="#fff" opacity="0.45" />

      {/* ---------- BRAZOS EN JARRAS + GUANTES ---------- */}
      <path d="M52 116 Q34 130 44 146 Q50 152 60 148" stroke={O} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M158 116 Q176 130 166 146 Q160 152 150 148" stroke={O} strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="60" cy="148" r="8" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
      <circle cx="150" cy="148" r="8" fill="#fffaf0" stroke={O} strokeWidth="2.5" />
    </svg>
  );
}
