import MarcoLegal from "@/components/legal/MarcoLegal";

export const metadata = {
  title: "Aviso legal · Papaupa",
  description: "Aviso legal y condiciones de uso del sitio web de Papaupa Retro Fusión Food.",
};

export default function AvisoLegalPage() {
  return (
    <MarcoLegal titulo="Aviso legal" actualizado="junio de 2026">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de los
        usuarios los datos identificativos del titular de este sitio web.
      </p>

      <h2>1. Datos del titular</h2>
      <ul>
        <li>
          <strong>Titular / razón social:</strong> <span className="ph">[RAZÓN SOCIAL O NOMBRE DEL TITULAR]</span>
        </li>
        <li>
          <strong>NIF / CIF:</strong> <span className="ph">[NIF / CIF]</span>
        </li>
        <li>
          <strong>Nombre comercial:</strong> Papaupa Retro Fusión Food
        </li>
        <li>
          <strong>Domicilio:</strong> Calle de los Molinos 16, 18009 Granada (barrio del Realejo)
        </li>
        <li>
          <strong>Teléfono:</strong> +34 958 99 18 44
        </li>
        <li>
          <strong>Correo electrónico:</strong> <span className="ph">[EMAIL DE CONTACTO]</span>
        </li>
        <li>
          <strong>Sitio web:</strong> papaupa.espanias.com
        </li>
        <li>
          <strong>Datos registrales (si aplica):</strong> <span className="ph">[REGISTRO MERCANTIL, TOMO, FOLIO, HOJA — solo si es sociedad]</span>
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web tiene por objeto dar a conocer el restaurante Papaupa, su carta y sus
        servicios (reservas, pedidos para recoger, eventos), así como facilitar el contacto con el
        establecimiento. La utilización del sitio atribuye la condición de usuario e implica la
        aceptación de las presentes condiciones.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El usuario se compromete a hacer un uso adecuado y lícito del sitio web y de sus contenidos,
        absteniéndose de emplearlos con fines ilícitos, lesivos de derechos de terceros o que puedan
        dañar, inutilizar o sobrecargar el sitio. El titular podrá retirar o suspender el acceso a
        quienes incumplan estas condiciones.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio (textos, fotografías, ilustraciones —incluida la mascota Don
        Patacón—, logotipos, diseño y código) son titularidad del titular o de terceros que han
        autorizado su uso, y están protegidos por la normativa de propiedad intelectual e
        industrial. Queda prohibida su reproducción, distribución o transformación sin autorización
        expresa.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular no se responsabiliza de los posibles errores u omisiones de los contenidos ni de
        los daños derivados del uso del sitio. La información sobre carta, precios y horarios puede
        variar; los datos definitivos se confirman en el propio establecimiento. El sitio puede
        contener enlaces a páginas de terceros (redes sociales, mapas, pasarelas de pago) sobre cuyo
        contenido el titular no ejerce control.
      </p>

      <h2>6. Legislación aplicable y jurisdicción</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para la resolución de
        controversias, las partes se someten a los juzgados y tribunales de Granada, salvo que la
        normativa de consumidores y usuarios disponga otro fuero.
      </p>

      <p>
        Véase también nuestra <a href="/privacidad">política de privacidad</a> y nuestra{" "}
        <a href="/cookies">política de cookies</a>.
      </p>
    </MarcoLegal>
  );
}
