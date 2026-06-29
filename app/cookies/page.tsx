import MarcoLegal from "@/components/legal/MarcoLegal";

export const metadata = {
  title: "Política de cookies · Papaupa",
  description: "Qué cookies usa el sitio de Papaupa y cómo gestionarlas.",
};

export default function CookiesPage() {
  return (
    <MarcoLegal titulo="Política de cookies" actualizado="junio de 2026">
      <p>
        Una cookie es un pequeño archivo que un sitio web guarda en tu dispositivo. En Papaupa usamos
        las mínimas necesarias para que la web funcione y, solo con tu permiso, cookies de terceros.
        No usamos cookies de publicidad ni de seguimiento.
      </p>

      <h2>1. Cookies técnicas o necesarias (no requieren consentimiento)</h2>
      <p>Imprescindibles para el funcionamiento del sitio. No te identifican personalmente.</p>
      <ul>
        <li>
          <strong>papaupa_visited</strong> — recuerda que ya has entrado para llevarte directo a la
          home (evita repetir la puerta de entrada). Duración: 1 año.
        </li>
        <li>
          <strong>papaupa_session</strong> — mantiene la sesión iniciada en el panel de administración.
          Solo se usa si eres del equipo y accedes al panel.
        </li>
        <li>
          <strong>Almacenamiento local (localStorage):</strong> guardamos tu preferencia de idioma
          (<strong>papaupa_lang</strong>) y tu elección sobre cookies (<strong>papaupa_cookies</strong>).
          No son cookies en sentido estricto y no se envían a ningún servidor.
        </li>
      </ul>

      <h2>2. Cookies de terceros (requieren tu consentimiento)</h2>
      <ul>
        <li>
          <strong>Google Maps</strong> — el mapa de localización solo se carga si aceptas «todas» las
          cookies. Al hacerlo, Google puede instalar cookies propias. Más información en la{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            política de privacidad de Google
          </a>
          . Si no lo aceptas, te ofrecemos un enlace para abrir el mapa en una pestaña nueva.
        </li>
      </ul>

      <h2>3. ¿Cómo gestionar las cookies?</h2>
      <p>
        Cuando entras por primera vez te mostramos un banner para <strong>aceptar todas</strong> o usar{" "}
        <strong>solo las necesarias</strong>. Puedes cambiar tu decisión en cualquier momento borrando
        los datos del sitio en tu navegador, lo que hará que el banner vuelva a aparecer.
      </p>
      <p>
        También puedes configurar o bloquear las cookies desde tu navegador:{" "}
        <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>,{" "}
        <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Firefox</a>,{" "}
        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>{" "}
        o{" "}
        <a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Edge</a>.
      </p>

      <p>
        Para más detalle sobre el tratamiento de tus datos, consulta nuestra{" "}
        <a href="/privacidad">política de privacidad</a>.
      </p>
    </MarcoLegal>
  );
}
