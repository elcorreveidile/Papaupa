const BASE = "https://papaupa.espanias.com";

/**
 * Datos estructurados Schema.org (Restaurant) para resultados enriquecidos en
 * Google: nombre, dirección, teléfono, horario, cocina, enlace a la carta…
 *
 * Notas:
 * - Sin `geo` (coordenadas) de momento: Google geocodifica la dirección, que es
 *   exacta. Se pueden añadir coordenadas precisas más adelante.
 * - Sin `aggregateRating`: Google penaliza las valoraciones autoatribuidas que
 *   no provienen del propio sitio, así que no incluimos el 4,4 de Google aquí.
 */
const datos = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${BASE}/#restaurant`,
  name: "Papaupa Retro Fusión Food",
  url: BASE,
  image: `${BASE}/images/fachada.jpg`,
  logo: `${BASE}/apple-icon.png`,
  description:
    "Cocina colombiano-mediterránea casera en el barrio del Realejo (Granada): arepas, ceviches, patacones y pescados.",
  telephone: "+34958991844",
  priceRange: "€€",
  servesCuisine: ["Colombian", "Mediterranean", "Fusion"],
  acceptsReservations: "True",
  hasMenu: `${BASE}/menu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle de los Molinos 16",
    addressLocality: "Granada",
    postalCode: "18009",
    addressRegion: "Granada",
    addressCountry: "ES",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "13:00",
      closes: "23:00",
    },
  ],
  sameAs: ["https://www.instagram.com/papauparetrofusionfood/"],
};

export default function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      // El JSON es estático y de confianza (definido arriba), sin entrada de usuario.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }}
    />
  );
}
