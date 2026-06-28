# 🍌 PAPAUPA WEB - Ready to Build with Claude Code

**Estado:** ✅ Especificaciones completas, lista para desarrollo  
**Proyecto:** Restaurante colombiano-mediterráneo, Realejo Granada  
**Cliente:** Paco (gerente)  
**Stack:** Next.js 15 + Tailwind + Drizzle + Neon + Brevo + Instagram API

---

## 🚀 Quick Start (Para Claude Code)

### 1. Crear el proyecto

```bash
npx create-next-app@latest papaupa --typescript --tailwind --app
cd papaupa
pnpm install next-auth drizzle-orm postgres drizzle-kit brevo axios date-fns leaflet react-leaflet zod clsx framer-motion
```

### 2. Copiar estructura de carpetas

Ver sección **"Estructura de Proyecto"** en `PAPAUPA-ESPECIFICACIONES.md` (línea ~250)

### 3. Configurar variables de entorno

Crear `.env.local` con:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=(generar: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
BREVO_API_KEY=...
INSTAGRAM_ACCESS_TOKEN=...
BLOB_READ_WRITE_TOKEN=...
```

### 4. Setup Database

```bash
# Crear schema en lib/db/schema.ts (copiar de especificaciones)
pnpm drizzle-kit generate:pg
pnpm drizzle-kit migrate
```

### 5. Componentes y Pages

Seguir la estructura en `PAPAUPA-ESPECIFICACIONES.md`:
- Crear landing con SVG Don Patacón
- Home con hero + secciones
- Menú interactivo
- Formularios (reserva, reseña, contacto)
- Admin panel protegido

### 6. Iniciar dev server

```bash
pnpm dev
```

Visita `http://localhost:3000` → veras landing con Don Patacón

---

## 📋 Estructura Rápida

```
papaupa/
├── app/
│   ├── layout.tsx               ← Root layout (header, footer)
│   ├── page.tsx                 ← Landing + Home
│   ├── menu/page.tsx            ← Menú completo
│   ├── visitas/page.tsx         ← Libro + Instagram
│   ├── eventos/page.tsx         ← Eventos
│   ├── reservas/page.tsx        ← Formulario reserva
│   ├── contacto/page.tsx        ← Contacto + Mapa
│   ├── admin/                   ← Rutas admin (protegidas)
│   │   ├── login/page.tsx
│   │   ├── page.tsx            ← Dashboard
│   │   └── [...otros]
│   └── api/                     ← API routes
│       ├── reservas/route.ts
│       ├── resenas/route.ts
│       ├── eventos/route.ts
│       ├── instagram/feed.ts
│       └── brevo/*.ts
├── components/                  ← Componentes reutilizables
│   ├── landing/
│   ├── sections/
│   ├── cards/
│   └── ui/
├── lib/
│   ├── db/schema.ts            ← Drizzle schema
│   ├── brevo.ts                ← Cliente Brevo
│   ├── instagram.ts            ← Cliente Instagram
│   ├── auth.ts                 ← NextAuth config
│   └── validators.ts           ← Zod schemas
└── public/                      ← Imágenes, SVG
```

---

## 🎨 Paleta de Color (Copia/Pega)

```css
/* styles/variables.css */
:root {
  --primary: #F4D03F;           /* Amarillo Don Patacón */
  --red: #E74C3C;
  --orange: #F39C12;
  --green: #27AE60;
  --blue: #2980B9;
  --purple: #8E44AD;
  --dark: #1A1A1A;
  --light: #FAFAF8;
}
```

---

## 🔑 Componentes Clave a Crear Primero

**Orden recomendado:**

1. **DonPatacon.tsx** - SVG animado landing (16KB)
2. **Header.tsx** - Nav sticky
3. **Hero.tsx** - Sección principal home
4. **Menu.tsx** - Grid de platos (fetch /api/platos)
5. **ReservaForm.tsx** - Formulario reservas (Zod + fetch POST)
6. **ResenaForm.tsx** - Formulario reseñas (upload imagen + email)
7. **AdminDashboard.tsx** - Tabla de reservas, eventos
8. **MosaicInsta.tsx** - Grid Instagram (fetch cada 6h)

---

## 📊 Base de Datos

### Tablas principales:

- **usuarios** - Admin (email, password bcrypt)
- **reservas** - Booking (nombre, fecha, hora, pax, estado)
- **resenas** - Reseñas (rating 1-5, comentario, foto)
- **eventos** - Actuaciones (fecha, título, imagen, enlace)
- **platos** - Menú (nombre, precio, categoría, foto)
- **newsletter** - Suscriptores (email, estado)

Ver schema completo en `PAPAUPA-ESPECIFICACIONES.md` (línea ~400)

---

## 🔐 Autenticación Admin

- **NextAuth.js** (Credentials provider)
- **Ruta protegida:** `/admin/*`
- **Middleware:** Verificar sesión en rutas admin
- **Crear usuario inicial:** Insertar en BD con `pnpm db:seed` (hacer script)

```bash
# Script seed para crear admin (lib/db/seed.ts)
NODE_OPTIONS='--experimental-specifier-resolution=node' tsx lib/db/seed.ts
```

---

## 📧 Brevo Integration

**3 flujos de email:**

1. **Reserva confirmada** → Cliente + Paco
   - Gatillo: POST `/api/reservas`
   - Template: Resumen reserva

2. **Nueva reseña para moderación** → Paco
   - Gatillo: POST `/api/resenas`
   - Template: "Nueva reseña de [nombre]"

3. **Newsletter** → Brevo campaign
   - Manual desde Brevo dashboard
   - Lista: "Papaupa Newsletter"

**Setup:**
```typescript
// lib/brevo.ts
import brevo from '@getbrevo/brevo';

const api = new brevo.TransactionalEmailsApi();
api.setApiKey(brevo.ApiClient.instance.authentications['api-key'], process.env.BREVO_API_KEY);

export async function enviarEmail(to, subject, html) {
  return api.sendTransacEmail({
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
}
```

---

## 📸 Instagram Integration

**Qué hace:**
- Fetch últimas 12 fotos con hashtag `#EnPapaupa`
- Mostrar en `/visitas` section
- Auto-refresh cada 6 horas
- Fallback: "Sé el primero en etiquetar"

**Setup:**
1. Crear Meta App en https://developers.facebook.com
2. Agregar "Instagram Graph API"
3. Conectar @papauparetrofusionfood
4. Generar access token long-lived
5. Copiar a `.env.local` → `INSTAGRAM_ACCESS_TOKEN`

```typescript
// lib/instagram.ts
const response = await axios.get(
  `https://graph.instagram.com/v18.0/${HASHTAG_ID}/recent_media`,
  { params: { fields: 'id,media_url,caption,permalink', access_token: TOKEN } }
);
```

---

## 🗺️ Mapas (Leaflet, no Google)

```typescript
// components/Mapa.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function Mapa() {
  const position = [37.1864, -3.5948]; // Realejo coords (TBD con Paco)

  return (
    <MapContainer center={position} zoom={15} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>🍌 Papaupa Retro Fusión Food</Popup>
      </Marker>
    </MapContainer>
  );
}
```

---

## 🖼️ Imágenes y Blobs

**Vercel Blob para uploads:**

```typescript
// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  const blob = await put(file.name, file, { access: 'public' });

  return NextResponse.json(blob);
}
```

**Frontend:**
```typescript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
const response = await fetch('/api/upload', { method: 'POST', body: formData });
const { url } = await response.json();
```

---

## ✨ Validación con Zod

```typescript
// lib/validators.ts
import { z } from 'zod';

export const validarReserva = z.object({
  nombre: z.string().min(2),
  telefono: z.string().regex(/^\+34\d{9}$/),
  email: z.string().email(),
  fecha: z.string().min(10),
  hora: z.string().regex(/^\d{2}:\d{2}$/),
  personas: z.number().min(1).max(20),
  observaciones: z.string().optional(),
});

export const validarResena = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  rating: z.number().min(1).max(5),
  comentario: z.string().min(5).max(150),
});
```

**Uso en API:**
```typescript
const validacion = validarReserva.safeParse(body);
if (!validacion.success) {
  return NextResponse.json({ error: validacion.error.errors }, { status: 400 });
}
```

---

## 🎬 Animaciones Recomendadas

- **Landing Don Patacón:** `animate-bounce`
- **Cards menú:** `hover:translate-y-1`
- **Botones:** Transición suave 0.3s, `hover:scale-105`
- **Líneas divisoras:** SVG onda con scroll animation

```css
/* styles/animations.css */
@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.wave-divider {
  animation: wave 3s ease-in-out infinite;
}
```

---

## 🚨 Errores Comunes a Evitar

❌ **NO HACER:**
- Usar Google Maps (usa Leaflet)
- Guardar imágenes en `/public` (usa Vercel Blob)
- Hardcodear precios o datos (guardar en BD)
- Olvidar validación Zod en POST routes
- Exponer API keys en frontend (usar API routes)
- Olvidor CORS si fetch desde frontend

✅ **HACER:**
- Environment variables para todo sensible
- Middleware para rutas protegidas
- Validación frontend + backend
- Error boundaries en Next
- Loading states en formularios
- Fallback images en Instagram feed

---

## 📞 Datos de Contacto (Copiar en config)

```typescript
// lib/constants.ts
export const PAPAUPA = {
  nombre: 'Papaupa Retro Fusión Food',
  telefono: '+34 958 99 18 44',
  email: 'paco@papaupa.com', // TBD
  ubicacion: 'Realejo, Granada',
  instagram: '@papauparetrofusionfood',
  horarios: {
    lunes_jueves: '13:00 - 23:00',
    viernes_sabado: '13:00 - 00:00',
    domingo: '13:00 - 22:00',
  },
};
```

---

## 📈 Roadmap

**Semana 1:** Setup + Landing + Home + Menú  
**Semana 2:** Formularios + API routes + Brevo  
**Semana 3:** Admin panel + Auth  
**Semana 4:** Instagram + Libro de visitas  
**Semana 5:** Testing, fixes, deploy  

---

## 🔗 Links Útiles

- [Mockup Visual](/PAPAUPA-MOCKUP.html) ← Abrir en navegador
- [Especificaciones Completas](/PAPAUPA-ESPECIFICACIONES.md) ← Referencia técnica detallada
- [Next.js Docs](https://nextjs.org/docs)
- [Brevo API](https://developers.brevo.com/docs)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-graph-api)

---

## 💬 Preguntas al Cliente (Paco)

Antes de lanzar producción:

- [ ] ¿Coordenadas exactas de Papaupa en Realejo?
- [ ] ¿Foto de Don Patacón (para SVG)? ¿Registrada?
- [ ] ¿Foto de Paco (sección Sobre)?
- [ ] ¿Fotos de platos principales?
- [ ] ¿Email específico para reservas?
- [ ] ¿Evento inaugural o lanzamiento?
- [ ] ¿Redes sociales a vincular?
- [ ] ¿Contraseña admin segura?

---

**Preparado para:** Claude Code (Anthropic)  
**Última actualización:** Junio 2024  
**Versión:** 1.0 - Go Build It
