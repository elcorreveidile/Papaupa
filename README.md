# 🍌 Papaupa · Retro Fusión Food

Sitio web del restaurante **Papaupa** (cocina colombiano-mediterránea, barrio del Realejo, Granada).

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Hosting previsto:** Vercel (+ Vercel Blob y Neon/Postgres para la fase de backend)

## Desarrollo

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de producción
```

## Estructura

```
app/
  page.tsx              Puerta de entrada (juego "¿¿Pasas marica??")
  inicio/page.tsx       Home real (Hero + Contacto + mapa)
  juegos/page.tsx       El patio: minijuegos con las mascotas
  icon.svg, favicon.ico, apple-icon.png
components/
  landing/              DonPatacon, DonaPatacona, LandingSplash
  juegos/               PatioJuegos + JuegoEsquiva / JuegoTartazo / JuegoBesito
  layout/               Header, LogoMark
  sections/             Hero, Contacto
files/                  Material de referencia (briefing, imágenes, carta)
```

## Mascotas

- **Don Patacón** — patacón con bigote, recibe en la puerta.
- **La Patacona** — la cocinera; ambos protagonizan el patio de juegos.

## Estado

En desarrollo. Hecho: puerta + juego de entrada, home, contacto con mapa,
zona de juegos jugable, identidad visual (logo + favicon). Pendiente: menú,
take away, reservas y panel de administración (backend con Neon + Brevo).

---

Documentación de producto: ver [`PAPAUPA-ESPECIFICACIONES.md`](./PAPAUPA-ESPECIFICACIONES.md).
