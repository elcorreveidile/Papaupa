# Papaupa · Traspaso para el siguiente agente

Documento de continuidad. Léelo entero antes de tocar código.
Web del restaurante **Papaupa Retro Fusión Food** (Realejo, Granada).

---

## 0) Reglas y contexto que NO se ven en el código

- **Proyecto SORPRESA**: se desarrolla para presentárselo al dueño (**Paco**), que **no lo sabe**.
  → **NO enviar emails/SMS/WhatsApp reales a Paco** durante el desarrollo. Las reseñas que
  llegan NO le avisan por email (solo aparecen en su panel). El aviso real se añade al lanzar.
- **Sin Instagram**: no se puede conectar la cuenta real (sorpresa). El feed de IG queda fuera;
  se sustituirá por una **galería estática** con las fotos de `files/imgs/`.
- **Bilingüe ES/EN** en toda la web pública (el panel `/admin` es solo en español).
- **Identidad**: estética **retro años 70**, cálida. Mascotas **Don Patacón** (Paco) y
  **La Patacona** (Margarita, su pareja colombiana, cocinera). Paleta y tipografías ya decididas
  (no cambiar sin pedirlo). El dueño escribe en español; háblale en español, directo.
- **`AGENTS.md`** (en la raíz) avisa: este Next tiene cambios de ruptura respecto a versiones
  anteriores; **lee `node_modules/next/dist/docs/` antes de escribir código de Next** si dudas.

---

## 1) Stack

| Capa | Tecnología |
|---|---|
| Framework | **Next.js 16.2** (App Router) + React 19 + TypeScript |
| Estilos | **Tailwind CSS v4** (config CSS-first en `app/globals.css` con `@theme`; **no hay `tailwind.config.js`**) |
| BD | **PostgreSQL (Neon)** · ORM **Drizzle** (driver `postgres` / postgres.js) |
| Auth | **Magic link passwordless** (sin contraseñas, sin NextAuth): JWT con `jose` |
| Email | **Brevo** (API REST) — magic links |
| SMS | **LabsMobile** (API REST) — magic links |
| Imágenes (pendiente) | **Vercel Blob** |
| Gestor | **pnpm** (¡no uses `npm i`! falla por `workspace:`; ver Gotchas) |
| Deploy | **Vercel** (proyecto `papaupa`, dominio `papaupa.espanias.com`) |

Arrancar: `pnpm install && pnpm dev` → http://localhost:3000

---

## 2) Variables de entorno (`.env.local`, gitignored)

```
DATABASE_URL=postgresql://...neon.../...?sslmode=require   # Neon (pooled)
AUTH_SECRET=...            # secreto JWT (openssl rand -base64 32)
APP_URL=http://localhost:3000   # SOLO fallback; la URL real se autodetecta (lib/url.ts)
BREVO_API_KEY=...          # email magic link
BREVO_SENDER_EMAIL=...     # remitente verificado en Brevo
BREVO_SENDER_NAME=Papaupa
LABSMOBILE_USERNAME=...    # SMS
LABSMOBILE_TOKEN=...
SMS_SENDER=Papaupa
# BLOB_READ_WRITE_TOKEN=...  # PENDIENTE: para subir imágenes (Vercel Blob)
```

En **Vercel** (proyecto `papaupa`): la integración de **Neon** ya inyecta `DATABASE_URL`
(+ muchas `POSTGRES_*`/`PG*`/`NEON_*` que sobran). Hay que **añadir a mano** las propias de la
app: `AUTH_SECRET`, `BREVO_*`, `LABSMOBILE_*`, `SMS_SENDER` (Production + Preview). **NO** poner
`APP_URL`. El dominio `papaupa.espanias.com` hay que asignarlo en Settings → Domains.

---

## 3) Base de datos (Drizzle)

Esquema en `lib/db/schema.ts`: `usuarios` (rol `admin`|`superadmin`), `magic_tokens`,
`eventos`, `resenas` (estado `pendiente`|`aprobada`|`rechazada`), `newsletter`.

Comandos (cargan `DATABASE_URL` del entorno; drizzle-kit NO lee `.env.local` solo, exporta la var):
```
export DATABASE_URL="$(grep -E '^DATABASE_URL=' .env.local | sed 's/^DATABASE_URL=//')"
pnpm db:generate   # genera migración desde el schema
pnpm db:migrate    # la aplica
pnpm db:seed       # usuarios (Paco/Javier) + eventos y reseñas de ejemplo (idempotente)
pnpm db:studio     # GUI de Drizzle
```
Para cambiar el schema: edita `schema.ts` → `db:generate` → `db:migrate`.

---

## 4) Autenticación (magic link)

- `lib/auth/session.ts`: firma/verifica JWT (`jose`, HS256, 7d) — **edge-safe** (lo usa el middleware).
- `lib/auth/server.ts`: `getSession()` / `requireSession()` (Server Components y Server Actions).
- `lib/auth/magic.ts`: crea/consume tokens (hash SHA-256 en `magic_tokens`, caduca 15 min).
- `lib/email/brevo.ts` y `lib/sms/labsmobile.ts`: envío real; **fallback dev** = log + (en email)
  devuelve `devUrl` en la respuesta de `/api/auth/request` SOLO si no hay credenciales.
- Rutas: `/api/auth/request` (POST {email, canal:'email'|'sms'}), `/verify` (GET ?token), `/logout`.
- `middleware.ts` protege `/admin/*` (excepto `/admin/login`) y redirige `/`→`/inicio` si ya hay cookie de visita.
- **Roles**: `admin` (Paco, `papauparetrofusionfood@gmail.com`) y `superadmin` (Javier, `informa@blablaele.com`).
- **La URL base se autodetecta** de la petición (`lib/url.ts`, cabecera `x-forwarded-host`):
  localhost en dev, dominio real en producción. No hardcodear.

> ⚠️ **Login en dev con Brevo ya configurado**: como hay clave de Brevo, `/api/auth/request`
> **envía email real y NO devuelve `devUrl`**. Para entrar sin tocar el correo, genera un token
> con un script temporal que llame a `crearMagicLink(usuarioId,'email')` e imprime
> `http://localhost:3000/api/auth/verify?token=...`; navega a esa URL. (Bórralo después.)

---

## 5) Mapa de rutas

| Ruta | Qué es |
|---|---|
| `/` | **Puerta**: primera visita única → minijuego "¿¿Pasas marica??" → al ganar/Entrar → **vídeo-intro** (`/video/intro.mp4`) → `/inicio`. Visitas repetidas: cookie `papaupa_visited` → middleware redirige a `/inicio`. (`components/landing/LandingSplash.tsx`, `VideoIntro.tsx`) |
| `/inicio` | Home: `Header` + `Hero` (claim) + `Contacto` (Google Maps embed) + pie |
| `/menu` | Carta + **take away por WhatsApp** (`components/menu/MenuTakeaway.tsx`, datos en `lib/menu.ts`) |
| `/juegos` | 3 minijuegos responsive (`PatioJuegos` → `JuegoEsquiva`/`Tartazo`/`Besito`) |
| `/eventos` | Público, lee de BD (`EventosLista`) |
| `/visitas` | Libro de visitas: reseñas aprobadas + formulario (`VisitasCliente`) → `POST /api/resenas` (queda `pendiente`) |
| `/admin/login` | Pide magic link (Email/SMS) |
| `/admin` | Dashboard (route group `app/admin/(panel)/`, layout con `requireSession`) |
| `/admin/eventos` | CRUD eventos (crear/publicar-ocultar/borrar) — Server Actions |
| `/admin/visitas` | Moderar reseñas (aprobar/rechazar/borrar) — Server Actions |
| `/sello`, `/mascotas` | **TEMPORALES** de revisión de diseño → **borrar antes de producción** |

Componentes de marca: `components/marca/SelloECR.tsx` (sello multi-barrio ECR/ECZ) y
`SimboloQPQ.tsx` (moneda). Identidad visual en `components/layout/LogoMark.tsx`, mascotas en
`components/landing/DonPatacon.tsx` y `DonaPatacona.tsx`.

---

## 6) i18n

`lib/i18n.tsx`: `<LanguageProvider>` (envuelve la app en `app/layout.tsx`), hook `useLang()` con
`t(es, en)` y `<LangToggle/>`. **Español por defecto**, recordado en `localStorage` (`papaupa_lang`).
Patrón: `const { lang, t } = useLang();` y `{t("Hola","Hi")}`. Datos de menú/eventos llevan campos
`*En` (p. ej. `nombreEn`). El panel `/admin` va solo en español.

---

## 7) Estado: hecho vs. pendiente

**Hecho:** puerta+juego+vídeo, home (hero/claim/contacto/mapa), menú+take away (WhatsApp), 3 juegos
responsive, bilingüe + menú hamburguesa, identidad (logo/favicon/fondos/sello ECR+QPQ), backend
(Neon + magic link email/SMS + admin), **Eventos** (público + CRUD), **Libro de visitas** (público
+ moderación).

**Pendiente (prioridad sugerida):**
1. **Reservas** — el nav la enlaza (`#reservas`) pero no existe. Formulario → BD (falta tabla
   `reservas`) + aviso (WhatsApp/email) + verlas en el admin.
2. **Completar Eventos**: **editar** evento + **subir imagen** (Vercel Blob). **Foto opcional** en reseñas.
3. **Sección "Nosotros"** (Paco + **Margarita**) — la narrativa, hoy solo insinuada en el hero.
4. **Galería de fotos** con `files/imgs/` (sustituye al feed de Instagram).
5. **Newsletter** (alta en el pie → Brevo). Tabla ya creada.
6. **Sello ECR** en el pie de Papaupa (es negocio adherido) → enlazar al directorio de espanias.
7. **Despliegue**: conectar repo↔Vercel, variables, dominio, primera publicación.
8. **Limpieza**: borrar `/sello` y `/mascotas` (`app/sello/`, `app/mascotas/`).

> 2 y 4 necesitan **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`).

---

## 8) Gotchas (importantes)

- **Juegos**: el bucle usa `requestAnimationFrame`; en una pestaña en segundo plano el navegador lo
  pausa → en capturas headless los personajes no se mueven. **No es un bug**; en pestaña activa van.
- **Tailwind v4 / Lightning CSS**: **no metas `calc()` dentro de `rgba()`** (descarta la regla
  entera). Los fondos de página usan la clase `.fondo` con variable CSS `--fondo-img` por página.
- **`librsvg`/`rsvg-convert` NO renderiza `<textPath>`** (ni con `xlink:href`). Para exportar el
  sello a PNG usa **resvg** (`@resvg/resvg-js` en una carpeta aislada). SVGs en `files/marca/`.
- **pnpm, no npm**: `npm i` falla (`workspace:`). Para herramientas puntuales, instala en un dir
  temporal aparte.
- **`Date.now()` / `Math.random()`** SÍ se pueden usar en el runtime de la app (la restricción de
  esas funciones es solo para los scripts de orquestación, no para el código de Next).
- **Server Actions del admin** llevan `await requireSession()` al principio (defensa).
- `.env.local` está **gitignored**: nunca lo subas. Los secretos van en Vercel a mano.

---

## 9) Ecosistema (contexto) y ECR/kupeku

Papaupa es un **subdominio "pending"** de **espanias.com** (catálogo de proyectos de la agencia
**Por 2 Duros**). Hay un sistema aparte, **Economía Circular Realejo (ECR / moneda QPQ)**: ver
`files/ecr-anuncio-briefs.md` (modelo de precios, copy ES/EN y briefs para los agentes de
espanias y por2duros) y los componentes/SVGs de marca en `components/marca/` y `files/marca/`.
**Eso es para los repos de espanias/por2duros, no para Papaupa** (salvo poner el sello en el pie).

---

## 10) Flujo de trabajo

- `pnpm build` antes de cambios grandes. Push a `main` = lo que desplegará Vercel cuando se conecte.
- Material de referencia (briefing, carta, fotos, vídeo, transcripción de la carta) en `files/`.
- Confirma con Javier antes de: borrar archivos, cambiar dependencias, tocar la identidad visual
  o el contenido de `files/*`, o desplegar.
