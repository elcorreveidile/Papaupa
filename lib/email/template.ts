/**
 * Plantillas de email de Papaupa con la identidad de marca.
 * HTML basado en tablas + estilos en línea (máxima compatibilidad con clientes
 * de correo). Las fuentes de marca no cargan en email: usamos Georgia (serif)
 * y Arial (sans) como equivalentes seguros.
 */

const CREMA = "#f5ecd7";
const CREMA_BORDE = "#e3d8bb";
const MOSTAZA = "#f2b705";
const MARRON = "#3b2415";
const TERRACOTA = "#a23818";

type LayoutOpts = {
  base: string; // URL absoluta del sitio (para el logo)
  preheader?: string; // texto de vista previa (oculto)
  cuerpo: string; // HTML del contenido principal
};

/** Envoltorio de marca: cabecera con logo, tarjeta central y pie. */
export function emailLayout({ base, preheader = "", cuerpo }: LayoutOpts): string {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light only">
  <title>Papaupa</title>
</head>
<body style="margin:0;padding:0;background-color:#ece4cf;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#ece4cf;font-size:1px;line-height:1px;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ece4cf;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:480px;background-color:#fffdf7;border:1px solid ${CREMA_BORDE};border-radius:18px;overflow:hidden;">
          <!-- Cabecera -->
          <tr>
            <td align="center" style="background-color:${CREMA};padding:28px 24px 18px;">
              <img src="${base}/apple-icon.png" width="68" height="68" alt="Papaupa" style="display:block;border-radius:16px;border:0;outline:none;">
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:bold;font-style:italic;color:${MARRON};padding-top:12px;letter-spacing:.5px;">Papaupa</div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;color:${TERRACOTA};text-transform:uppercase;padding-top:4px;">Retro Fusión Food</div>
            </td>
          </tr>
          <!-- Filete arcoíris -->
          <tr>
            <td style="height:5px;line-height:5px;font-size:0;background-color:${MOSTAZA};background-image:linear-gradient(90deg,#e74c3c,#f39c12,#f2b705,#27ae60,#2980b9,#8e44ad);">&nbsp;</td>
          </tr>
          <!-- Cuerpo -->
          <tr>
            <td style="padding:30px 30px 8px;font-family:Arial,Helvetica,sans-serif;color:${MARRON};font-size:16px;line-height:1.6;">
              ${cuerpo}
            </td>
          </tr>
          <!-- Pie -->
          <tr>
            <td style="padding:22px 30px 28px;font-family:Arial,Helvetica,sans-serif;color:#9a8c70;font-size:12px;line-height:1.6;border-top:1px solid ${CREMA_BORDE};">
              <strong style="color:${MARRON};">Papaupa · Retro Fusión Food</strong><br>
              Calle de los Molinos 16, Realejo · Granada
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Botón de marca (pill amarillo). */
function boton(url: string, texto: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
    <tr>
      <td align="center" bgcolor="${MOSTAZA}" style="border-radius:999px;">
        <a href="${url}" style="display:inline-block;padding:14px 30px;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;color:${MARRON};text-decoration:none;border-radius:999px;">${texto}</a>
      </td>
    </tr>
  </table>`;
}

/** Email de acceso al panel (magic link). Devuelve HTML + texto plano. */
export function magicLinkEmail({
  nombre,
  url,
  base,
}: {
  nombre: string;
  url: string;
  base: string;
}): { html: string; text: string } {
  const cuerpo = `
    <p style="margin:0 0 14px;">Hola <strong>${nombre}</strong>,</p>
    <p style="margin:0 0 20px;">Pulsa el botón para entrar al panel de Papaupa:</p>
    ${boton(url, "Entrar al panel →")}
    <p style="margin:20px 0 6px;font-size:13px;color:#9a8c70;">Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
    <p style="margin:0 0 18px;font-size:13px;word-break:break-all;"><a href="${url}" style="color:${TERRACOTA};">${url}</a></p>
    <p style="margin:0;font-size:13px;color:#9a8c70;">El enlace caduca en 15 minutos. Si no has pedido tú el acceso, ignora este correo.</p>
  `;

  const html = emailLayout({
    base,
    preheader: "Tu enlace de acceso al panel de Papaupa (caduca en 15 min).",
    cuerpo,
  });

  const text = `Papaupa · Acceso al panel

Hola ${nombre},

Entra al panel con este enlace (caduca en 15 minutos):
${url}

Si no has pedido tú el acceso, ignora este correo.

Papaupa · Retro Fusión Food
Calle de los Molinos 16, Realejo · Granada`;

  return { html, text };
}
