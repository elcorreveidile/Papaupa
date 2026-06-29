import MarcoLegal from "@/components/legal/MarcoLegal";

export const metadata = {
  title: "Política de privacidad · Papaupa",
  description: "Cómo trata Papaupa tus datos personales conforme al RGPD y la LOPDGDD.",
};

export default function PrivacidadPage() {
  return (
    <MarcoLegal titulo="Política de privacidad" actualizado="junio de 2026">
      <p>
        En Papaupa nos tomamos en serio tu privacidad. Esta política explica cómo tratamos tus datos
        personales conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018, de
        Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> <span className="ph">[RAZÓN SOCIAL O NOMBRE DEL TITULAR]</span>
        </li>
        <li>
          <strong>NIF / CIF:</strong> <span className="ph">[NIF / CIF]</span>
        </li>
        <li>
          <strong>Domicilio:</strong> Calle de los Molinos 16, 18009 Granada
        </li>
        <li>
          <strong>Correo de contacto:</strong> <span className="ph">[EMAIL DE CONTACTO]</span>
        </li>
      </ul>

      <h2>2. ¿Qué datos tratamos y con qué finalidad?</h2>
      <ul>
        <li>
          <strong>Formulario de contacto:</strong> nombre, correo electrónico y mensaje, para atender
          tu consulta y responderte.
        </li>
        <li>
          <strong>Reservas de mesa:</strong> nombre, teléfono, correo (opcional), fecha, hora y nº de
          personas, para gestionar tu reserva.
        </li>
        <li>
          <strong>Pedidos para recoger:</strong> los datos del pedido se envían por WhatsApp desde tu
          propio dispositivo; no se almacenan en nuestros servidores.
        </li>
        <li>
          <strong>Libro de visitas:</strong> nombre, correo (no se publica), valoración, comentario y,
          si la aportas, una foto, para publicar tu reseña previa moderación.
        </li>
        <li>
          <strong>Juegos del patio:</strong> unas iniciales y la puntuación, para el ranking. No
          permiten identificarte.
        </li>
        <li>
          <strong>Newsletter (si te suscribes):</strong> correo electrónico, para enviarte novedades y
          eventos.
        </li>
      </ul>

      <h2>3. Base jurídica</h2>
      <ul>
        <li>
          <strong>Tu consentimiento</strong> (art. 6.1.a RGPD): contacto, libro de visitas y newsletter.
        </li>
        <li>
          <strong>Medidas precontractuales</strong> (art. 6.1.b RGPD): gestión de reservas.
        </li>
        <li>
          <strong>Interés legítimo</strong> (art. 6.1.f RGPD): seguridad del sitio y moderación de
          contenidos.
        </li>
      </ul>

      <h2>4. Plazo de conservación</h2>
      <p>
        Conservamos tus datos el tiempo necesario para la finalidad para la que se recogieron y, en su
        caso, durante los plazos legalmente exigibles. Las reseñas se conservan mientras estén
        publicadas; la suscripción a la newsletter, hasta que te des de baja.
      </p>

      <h2>5. Destinatarios y encargados del tratamiento</h2>
      <p>
        No vendemos tus datos. Para prestar el servicio nos apoyamos en proveedores que actúan como
        encargados del tratamiento con las debidas garantías:
      </p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> — alojamiento del sitio y almacenamiento de imágenes (Vercel Blob).
        </li>
        <li>
          <strong>Neon</strong> — base de datos.
        </li>
        <li>
          <strong>Brevo (Sendinblue)</strong> — envío de correos electrónicos.
        </li>
        <li>
          <strong>LabsMobile</strong> — envío de SMS (acceso al panel de administración).
        </li>
        <li>
          <strong>Google</strong> — mapa de localización (solo si aceptas las cookies de terceros).
        </li>
      </ul>
      <p>
        Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo; en tal caso,
        cuentan con garantías adecuadas (cláusulas contractuales tipo u otros mecanismos previstos por
        el RGPD).
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del
        tratamiento y portabilidad escribiendo a <span className="ph">[EMAIL DE CONTACTO]</span>,
        indicando «Protección de datos» y adjuntando copia de un documento identificativo. Si
        consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia
        Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a accesos
        no autorizados, pérdida o alteración.
      </p>

      <h2>8. Menores</h2>
      <p>
        Este sitio no está dirigido a menores de 14 años. Si eres menor de esa edad, no nos facilites
        datos personales sin el consentimiento de tus padres o tutores.
      </p>

      <p>
        Consulta también nuestra <a href="/cookies">política de cookies</a> y el{" "}
        <a href="/aviso-legal">aviso legal</a>.
      </p>
    </MarcoLegal>
  );
}
