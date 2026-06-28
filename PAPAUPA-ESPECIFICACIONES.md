# 🍌 PAPAUPA - Especificaciones Técnicas Completas

**Proyecto:** Papaupa Retro Fusión Food  
**Cliente:** Paco (gerente) en Realejo, Granada  
**Fecha Creación:** Junio 2024  
**Estado:** Ready for Development

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Especificaciones de Diseño](#especificaciones-de-diseño)
4. [Estructura de Proyecto](#estructura-de-proyecto)
5. [Funcionalidades](#funcionalidades)
6. [Instrucciones de Desarrollo](#instrucciones-de-desarrollo)
7. [Integración Brevo (Email)](#integración-brevo)
8. [Integración Instagram API](#integración-instagram-api)
9. [Admin Panel](#admin-panel)
10. [Checklist Pre-Launch](#checklist-pre-launch)

---

## 🎯 Resumen Ejecutivo

**Papaupa** es un restaurante colombiano-mediterráneo ubicado en el Realejo (Granada) que necesita:
- **Landing page** interactivo con Don Patacón preguntando "¿¿PASAS MARICA??"
- **Web principal** con menú, reservas, galería, libro de visitas e integración Instagram
- **Admin panel** privado para Paco (gestión de reservas, eventos, reseñas)
- **Email marketing** vía Brevo
- **Escalabilidad** hacia tienda online (v.2)

**Público objetivo:**
- Jóvenes urbanos
- Familias
- Turistas
- Comunidad LGBTQ+
- Gente del barrio Realejo

**Tono:** Divertido-irreverente, cálido-familiar, reivindicativo. Sin cursilería.

---

## 🛠️ Arquitectura Técnica

### Stack Confirmado

```
Frontend:           Next.js 15 (App Router)
Styling:            Tailwind CSS + Custom CSS
UI Components:      shadcn/ui (personalizados)
Database:           Neon (PostgreSQL)
ORM:                Drizzle ORM
Authentication:     NextAuth.js (solo admin)
Email:              Brevo (reservas + newsletter + reseñas)
Instagram API:      Instagram Graph API
Maps:               Leaflet (no Google)
Image Storage:      Vercel Blob
Hosting:            Vercel
Domain:             papaupa.com (TBD - configurar DNS)
Environment:        Node.js 18+
Package Manager:    pnpm (recomendado)
```

### Dependencias Principales

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^3.4.0",
    "drizzle-orm": "^0.29.0",
    "drizzle-kit": "^0.20.0",
    "postgres": "^3.4.0",
    "next-auth": "^5.0.0",
    "brevo": "^17.0.0",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.0",
    "zod": "^3.22.0",
    "clsx": "^2.0.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "typescript": "^5.0.0",
    "prettier": "^3.0.0",
    "eslint": "^8.0.0",
    "next-lint": "latest"
  }
}
```

---

## 🎨 Especificaciones de Diseño

### Paleta de Color (CSS Variables)

```css
:root {
  /* Primary */
  --primary: #F4D03F;           /* Amarillo Don Patacón */
  --primary-dark: #E8C91F;      /* Hover state */
  --primary-light: #FBE89C;     /* Backgrounds suaves */
  
  /* Rainbow Accents */
  --red: #E74C3C;               /* Energía, comida */
  --orange: #F39C12;            /* Calidez */
  --green: #27AE60;             /* Fresco, mediterráneo */
  --blue: #2980B9;              /* Confianza */
  --purple: #8E44AD;            /* Diversidad LGBTQ+ */
  
  /* Neutros */
  --dark: #1A1A1A;              /* Texto principal */
  --gray-600: #4A4A4A;          /* Texto secundario */
  --gray-400: #999999;          /* Placeholder, deshabilitado */
  --gray-200: #E8E8E8;          /* Bordes sutiles */
  --light: #FAFAF8;             /* Fondo crema */
  --white: #FFFFFF;             /* Blanco puro */
}
```

### Tipografía

```
Display/Headings (h1-h2-h3):
  Font Family:  Poppins Bold, Space Grotesk Bold (fallback: Trebuchet MS)
  Font Sizes:   h1: 56px (desktop), 32px (móvil)
                h2: 48px (desktop), 28px (móvil)
                h3: 32px (desktop), 24px (móvil)
  Line Height:  1.2
  Font Weight:  700

Body Text:
  Font Family:  Inter (fallback: -apple-system, BlinkMacSystemFont)
  Font Sizes:   16px (desktop), 14px (móvil)
  Line Height:  1.6
  Font Weight:  400

Accent/Citas:
  Font Family:  Playfair Display Italic
  Font Size:    18px
  Font Weight:  400
  Style:        italic
```

### Componentes Visuales

- **Bordes redondeados:** 12-16px (headings), 8px (buttons), 20px (cards grandes)
- **Sombras:** `0 4px 8px rgba(0,0,0,0.1)` (suave); `0 8px 16px rgba(244,208,63,0.2)` (hover)
- **Espaciado:** Sistema 8px (8, 16, 24, 32, 48, 64...)
- **Transiciones:** 0.3s ease (botones, cards), 0.2s ease (pequeños)
- **Líneas divisoras:** Ondulantes en SVG, degradados arcoíris sutilizados

---

## 📁 Estructura de Proyecto

```
papaupa-web/
├── app/
│   ├── layout.tsx                 # Root layout (header, footer, nav)
│   ├── page.tsx                   # Landing + home
│   ├── menu/
│   │   └── page.tsx              # Página menú (si separada)
│   ├── reservas/
│   │   └── page.tsx              # Formulario reservas
│   ├── visitas/
│   │   └── page.tsx              # Libro de visitas + Instagram
│   ├── eventos/
│   │   └── page.tsx              # Eventos y actuaciones
│   ├── contacto/
│   │   └── page.tsx              # Contacto y mapa
│   ├── admin/
│   │   ├── layout.tsx            # Admin layout protegido
│   │   ├── page.tsx              # Dashboard
│   │   ├── reservas/page.tsx      # Gestión reservas
│   │   ├── eventos/page.tsx       # Gestión eventos
│   │   ├── resenas/page.tsx       # Moderación reseñas
│   │   └── configuracion/page.tsx # Settings
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts    # NextAuth config
│   │   ├── reservas/
│   │   │   ├── route.ts           # GET/POST reservas
│   │   │   └── [id]/route.ts      # PUT/DELETE
│   │   ├── resenas/
│   │   │   ├── route.ts           # GET/POST reseñas
│   │   │   └── [id]/route.ts      # PUT/DELETE
│   │   ├── eventos/
│   │   │   ├── route.ts           # GET/POST eventos
│   │   │   └── [id]/route.ts      # PUT/DELETE
│   │   ├── instagram/
│   │   │   └── feed.ts            # GET Instagram feed
│   │   ├── brevo/
│   │   │   ├── reserva.ts         # Email reserva confirmada
│   │   │   ├── resena.ts          # Email nueva reseña
│   │   │   └── newsletter.ts      # Suscripción newsletter
│   │   └── upload/
│   │       └── route.ts           # Upload imágenes (Vercel Blob)
│   └── error.tsx                  # Error page
├── components/
│   ├── landing/
│   │   ├── DonPatacon.tsx         # SVG animado Don Patacón
│   │   └── LandingHero.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── WaveDivider.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Sobre.tsx
│   │   ├── Menu.tsx
│   │   ├── Libro.tsx
│   │   ├── Eventos.tsx
│   │   ├── Reserva.tsx
│   │   ├── Mapa.tsx
│   │   └── Newsletter.tsx
│   ├── forms/
│   │   ├── ReservaForm.tsx
│   │   ├── ResenaForm.tsx
│   │   ├── EventoForm.tsx (admin)
│   │   └── LoginForm.tsx (admin)
│   ├── cards/
│   │   ├── PlatoCard.tsx
│   │   ├── ResenaCard.tsx
│   │   ├── EventoCard.tsx
│   │   └── InstaGrid.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Modal.tsx
│       ├── Rating.tsx
│       ├── DatePicker.tsx
│       └── ImageUpload.tsx
├── lib/
│   ├── db/
│   │   ├── client.ts              # Conexión Neon
│   │   ├── schema.ts              # Drizzle schema
│   │   └── migrations/            # Folder migraciones
│   ├── brevo.ts                   # Cliente Brevo
│   ├── instagram.ts               # Cliente Instagram API
│   ├── auth.ts                    # NextAuth config
│   ├── utils.ts                   # Helpers generales
│   ├── validators.ts              # Zod schemas
│   └── constants.ts               # Config constantes
├── public/
│   ├── images/
│   │   ├── don-patacon.svg       # SVG Don Patacón
│   │   ├── logo.svg
│   │   └── placeholder.png
│   ├── fonts/
│   │   ├── poppins/
│   │   ├── inter/
│   │   └── playfair/
│   └── icons/
│       ├── arepa.svg
│       ├── patacon.svg
│       └── etc.
├── styles/
│   ├── globals.css               # Tailwind + globals
│   ├── variables.css             # CSS variables
│   └── animations.css            # Keyframes custom
├── types/
│   └── index.ts                  # TypeScript types
├── .env.local                    # Variables de entorno (NO COMMITAR)
├── .env.example                  # Ejemplo de .env
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── drizzle.config.ts             # Drizzle ORM config
├── middleware.ts                 # NextAuth middleware
├── package.json
└── README.md
```

---

## ⚙️ Funcionalidades Detalladas

### 1. Landing Page
- **Ruta:** `/` (primera carga)
- **Componente:** Don Patacón animado en SVG
- **Interacción:** Click en "Entra" → scroll suave a `#home`
- **Responsivo:** 100% móvil-first
- **Animations:** Bounce leve, parpadeo ojos Don Patacón
- **Tiempo:** ~2 segundos antes de permitir skip (opcional)

### 2. Home / Página Principal
- **Ruta:** `/` (después del landing, o `#home`)
- **Secciones:**
  1. Hero + CTA
  2. Sobre Papaupa (Paco + filosofía)
  3. Instagram feed integrado (últimas 12 fotos #EnPapaupa)
  4. CTA a menú y reservas
  5. Testimonios cortos

### 3. Menú Completo
- **Ruta:** `/menu`
- **Categorías:** Arepas | Patacones | Ceviche | Bocatas Gourmet | Postres
- **Filtros:** Por categoría, por tipo (vegan, colombiano, mediterráneo)
- **Cada plato:**
  - Foto (Vercel Blob)
  - Nombre
  - Descripción breve (1 línea)
  - Precio
  - Iconos nutricionales (🌱, 🇨🇴, 🌊)
- **Notas:** "Todos los platos se sirven con amor de Paco y su equipo"

### 4. Libro de Visitas
- **Ruta:** `/visitas`
- **Dos partes:**
  
  **A. Reseñas/Reviews:**
  - Grid de tarjetas con usuario + rating + comentario
  - Rating: ⭐ (1-5 stars interactivo)
  - Foto opcional del usuario
  - Fecha de visita
  - Comentario máx 150 caracteres
  - Ordenado: más recientes primero
  - Moderation: Paco aprueba antes de publicar
  
  **B. Instagram Feed:**
  - Grid de 12 últimas fotos con hashtag #EnPapaupa
  - Pull automático cada 6 horas
  - Click = abre Instagram en new tab
  - Fallback: mensaje "Sé el primero en etiquetar"

- **Formulario Reseña (modal):**
  ```
  Nombre (requerido)
  Email (verificación, no mostrado públicamente)
  Foto (opcional, Vercel Blob)
  Rating (⭐ interactivo)
  Comentario (textarea, max 150 chars, contador)
  [x] Autorizo publicación con/sin nombre
  [Enviar] → Brevo email a Paco + confirmación usuario
  ```

### 5. Eventos & Actuaciones
- **Ruta:** `/eventos`
- **Para clientes:** Listado de eventos próximos con:
  - Fecha + Hora
  - Título (concierto, jam session, actuación)
  - Foto/Imagen
  - Descripción breve
  - CTA: "Reservar Mesa" o "Más Info"
  
- **Para admin (Paco):** CRUD completo
  - Crear evento: form simple (título, desc, fecha, hora, imagen, link)
  - Editar evento
  - Eliminar evento
  - Ver reservas por evento

### 6. Sistema de Reservas
- **Ruta:** `/reservas`
- **Formulario:**
  ```
  Nombre (requerido)
  Teléfono (requerido, formato +34...)
  Email (requerido)
  Fecha (date picker, mín. hoy + 1 día)
  Hora (time picker, 13:00-23:00)
  Número de personas (slider 1-20)
  Observaciones (alergias, ocasión especial)
  [x] Acepto condiciones
  [Reservar]
  ```
- **On Submit:**
  - Validación Zod frontend + backend
  - Guardar en DB (tabla `reservas`)
  - Email Brevo a Paco: "Nueva reserva - [Nombre], [Fecha], [Hora], [Pax]"
  - Email confirmación a cliente
  - Respuesta: "Reserva confirmada, pronto nos ponemos en contacto"
- **Admin:** Dashboard con todas las reservas, filtrable por fecha

### 7. Formulario de Contacto
- **Ruta:** `/contacto`
- **Integración Mapa:** Leaflet (Realejo, coordenadas TBD)
- **Info rápida:**
  - Teléfono (clickable: tel:)
  - WhatsApp (clickable: wa.me/)
  - Email
  - Horarios (tabla)
- **Form alternativo (si quieren por web):**
  ```
  Nombre
  Email
  Asunto
  Mensaje
  [Enviar] → Brevo a paco@papaupa.com
  ```

### 8. Newsletter
- **Ubicación:** Footer en cada página
- **Form simple:** Email input + btn "Suscribirse"
- **On Submit:**
  - Validación email
  - Crear contacto en Brevo (lista "Papaupa Newsletter")
  - Email bienvenida automática
  - Brevo campaign monthly (eventos, platos del día, noticias)

### 9. Admin Panel
- **Ruta:** `/admin` (protegido con NextAuth)
- **Login:** email (Paco) + contraseña (generar segura)
- **Dashboard:**
  ```
  [Cards KPI]
  - Reservas próximas (7 días)
  - Total reseñas pendientes
  - Eventos próximos
  - Seguidores Instagram
  
  [Tablas/Grids]
  - Reservas: fecha, hora, pax, teléfono, obs. | Actions: [Ver] [Confirmar] [Cancelar]
  - Eventos: título, fecha, estado | Actions: [Editar] [Eliminar]
  - Reseñas: usuario, rating, comentario | Actions: [Aprobar] [Rechazar] [Moderar]
  
  [Configuración]
  - Editar horarios
  - Editar número teléfono
  - Editar dirección
  - Editar Instagram handle
  - Cambiar contraseña
  ```

---

## 🚀 Instrucciones de Desarrollo

### Paso 1: Setup Inicial

```bash
# Crear proyecto Next.js 15
npx create-next-app@latest papaupa-web --typescript --tailwind --app

# Instalar dependencias adicionales
cd papaupa-web
pnpm install next-auth drizzle-orm postgres drizzle-kit brevo axios date-fns leaflet react-leaflet zod clsx framer-motion

# Configurar Git
git init
git add .
git commit -m "Initial commit"
```

### Paso 2: Variables de Entorno

Crear `.env.local`:
```
# Database (Neon)
DATABASE_URL=postgresql://[user]:[password]@[host]:5432/papaupa

# NextAuth
NEXTAUTH_SECRET=<generate con: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000

# Brevo
BREVO_API_KEY=<clave API Brevo>
BREVO_SENDER_EMAIL=paco@papaupa.com
BREVO_PHONE_PACO=+34958991844

# Instagram
INSTAGRAM_ACCESS_TOKEN=<token long-lived>
INSTAGRAM_BUSINESS_ACCOUNT_ID=<ID cuenta Papaupa>

# Vercel Blob
BLOB_READ_WRITE_TOKEN=<token Vercel Blob>
```

### Paso 3: Base de Datos (Drizzle + Neon)

Crear `lib/db/schema.ts`:

```typescript
import { pgTable, serial, varchar, text, timestamp, integer, boolean, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tabla Usuarios (para admin)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email').unique().notNull(),
  password: varchar('password').notNull(), // bcrypt
  nombre: varchar('nombre').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabla Reservas
export const reservas = pgTable('reservas', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre').notNull(),
  telefono: varchar('telefono').notNull(),
  email: varchar('email').notNull(),
  fecha: timestamp('fecha').notNull(),
  hora: varchar('hora').notNull(), // HH:mm format
  personas: integer('personas').notNull(),
  observaciones: text('observaciones'),
  estado: varchar('estado').default('pendiente'), // pendiente, confirmada, cancelada
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabla Reseñas
export const resenas = pgTable('resenas', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre').notNull(),
  email: varchar('email').notNull(),
  rating: integer('rating').notNull(), // 1-5
  comentario: text('comentario').notNull(),
  fotoUrl: varchar('foto_url'), // Vercel Blob URL
  estado: varchar('estado').default('pendiente'), // pendiente, aprobada, rechazada
  visitaFecha: timestamp('visita_fecha'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabla Eventos
export const eventos = pgTable('eventos', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo').notNull(),
  descripcion: text('descripcion').notNull(),
  fecha: timestamp('fecha').notNull(),
  hora: varchar('hora').notNull(),
  imagenUrl: varchar('imagen_url'),
  enlace: varchar('enlace'), // Link a Instagram, etc
  estado: varchar('estado').default('activo'), // activo, cancelado, pasado
  aforo: integer('aforo'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabla Platos del Menú (opcional, si queremos admin panel para menú)
export const platos = pgTable('platos', {
  id: serial('id').primaryKey(),
  nombre: varchar('nombre').notNull(),
  descripcion: text('descripcion').notNull(),
  categoria: varchar('categoria').notNull(), // arepa, patacon, ceviche, bocata, postre
  precio: decimal('precio', { precision: 6, scale: 2 }).notNull(),
  imagenUrl: varchar('imagen_url'),
  vegetariano: boolean('vegetariano').default(false),
  vegan: boolean('vegan').default(false),
  tipo: varchar('tipo'), // colombiano, mediterráneo, fusion
  createdAt: timestamp('created_at').defaultNow(),
});

// Tabla Newsletter
export const newsletter = pgTable('newsletter', {
  id: serial('id').primaryKey(),
  email: varchar('email').unique().notNull(),
  nombres: varchar('nombres'),
  estado: varchar('estado').default('suscrito'), // suscrito, desuscrito
  createdAt: timestamp('created_at').defaultNow(),
});
```

Crear `drizzle.config.ts`:

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
});
```

Correr migraciones:
```bash
pnpm drizzle-kit generate:pg
pnpm drizzle-kit migrate
```

### Paso 4: Autenticación Admin (NextAuth)

Crear `lib/auth.ts`:

```typescript
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './db/client';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });

        if (!user) return null;
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.nombre,
        };
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

Crear `middleware.ts`:

```typescript
import { auth } from '@/lib/auth';

export async function middleware(request: Request) {
  const session = await auth();
  
  if (request.nextUrl.pathname.startsWith('/admin') && !session) {
    return new Response(null, { status: 307, headers: { Location: '/admin/login' } });
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### Paso 5: API Routes

**`app/api/reservas/route.ts`** (GET/POST):

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { reservas } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { enviarReservaEmail } from '@/lib/brevo';
import { validarReserva } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar con Zod
    const validacion = validarReserva.safeParse(body);
    if (!validacion.success) {
      return NextResponse.json(
        { error: validacion.error.errors },
        { status: 400 }
      );
    }

    const { nombre, telefono, email, fecha, hora, personas, observaciones } = validacion.data;

    // Guardar en DB
    const nuevaReserva = await db.insert(reservas).values({
      nombre,
      telefono,
      email,
      fecha: new Date(fecha),
      hora,
      personas,
      observaciones,
    }).returning();

    // Enviar email con Brevo
    await enviarReservaEmail({
      nombre,
      email,
      telefono,
      fecha,
      hora,
      personas,
    });

    return NextResponse.json(
      { message: 'Reserva confirmada', data: nuevaReserva[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST /api/reservas:', error);
    return NextResponse.json(
      { error: 'Error al crear reserva' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const allReservas = await db.query.reservas.findMany();
    return NextResponse.json(allReservas);
  } catch (error) {
    console.error('Error en GET /api/reservas:', error);
    return NextResponse.json(
      { error: 'Error al obtener reservas' },
      { status: 500 }
    );
  }
}
```

**`app/api/instagram/feed.ts`** (GET):

```typescript
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

    const response = await axios.get(
      `https://graph.instagram.com/v18.0/${accountId}/ig_hashtag_search`,
      {
        params: {
          user_id: accountId,
          fields: 'id,name',
          access_token: accessToken,
        },
      }
    );

    // Luego obtener posts del hashtag
    const hashtagId = response.data.data[0].id;
    const postsResponse = await axios.get(
      `https://graph.instagram.com/v18.0/${hashtagId}/recent_media`,
      {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,timestamp',
          access_token: accessToken,
        },
      }
    );

    const feed = postsResponse.data.data.slice(0, 12);
    
    return NextResponse.json({ feed });
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return NextResponse.json(
      { error: 'Error al obtener feed de Instagram' },
      { status: 500 }
    );
  }
}
```

### Paso 6: Componentes Principales

**`components/landing/DonPatacon.tsx`:**

```typescript
'use client';

export default function DonPatacon() {
  return (
    <svg
      width="180"
      height="200"
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg animate-bounce"
    >
      {/* SVG del mockup anterior */}
      {/* ... */}
    </svg>
  );
}
```

**`components/sections/Menu.tsx`:**

```typescript
'use client';

import { useState, useEffect } from 'react';
import PlatoCard from '@/components/cards/PlatoCard';

type Plato = {
  id: number;
  nombre: string;
  categoria: string;
  precio: string;
  // ...
};

export default function Menu() {
  const [platos, setPlatos] = useState<Plato[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState('arepa');

  useEffect(() => {
    fetch('/api/platos')
      .then(res => res.json())
      .then(data => setPlatos(data));
  }, []);

  const platosFiltrados = platos.filter(p => p.categoria === categoriaActiva);

  return (
    <section id="menu" className="bg-gradient-to-b from-orange-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="heading-display text-4xl mb-12 text-center">
          El Menú
        </h2>

        {/* Tabs */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-4">
          {['arepa', 'patacon', 'ceviche', 'bocata', 'postre'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
                categoriaActiva === cat
                  ? 'bg-yellow-400 text-gray-900 font-bold'
                  : 'bg-white border-2 border-gray-300 hover:border-yellow-400'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {platosFiltrados.map((plato) => (
            <PlatoCard key={plato.id} plato={plato} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 📧 Integración Brevo

### Setup

1. Crear cuenta en Brevo (https://www.brevo.com)
2. Ir a Settings → SMTP & API
3. Generar API key (copiar a `.env.local` → `BREVO_API_KEY`)
4. Crear listas en Brevo:
   - "Reservas" (para confirmaciones)
   - "Papaupa Newsletter" (para suscriptores)

### Crear Cliente Brevo (`lib/brevo.ts`)

```typescript
import brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.ApiClient.instance.authentications['api-key'], process.env.BREVO_API_KEY!);

export async function enviarReservaEmail(datos: {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  personas: number;
}) {
  const sendSmtpEmail = {
    to: [{ email: datos.email, name: datos.nombre }],
    cc: [{ email: process.env.BREVO_SENDER_EMAIL }],
    subject: '✅ Tu reserva en Papaupa está confirmada',
    htmlContent: `
      <h2>¡Hola ${datos.nombre}!</h2>
      <p>Tu reserva ha sido confirmada:</p>
      <ul>
        <li><strong>Fecha:</strong> ${datos.fecha}</li>
        <li><strong>Hora:</strong> ${datos.hora}</li>
        <li><strong>Personas:</strong> ${datos.personas}</li>
      </ul>
      <p>Si necesitas cambios, contacta con nosotros al ${process.env.BREVO_PHONE_PACO}</p>
      <p>¡Te esperamos en Papaupa!</p>
    `,
  };

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email enviado:', result);
  } catch (error) {
    console.error('Error enviando email:', error);
  }
}
```

---

## 📱 Integración Instagram API

### Setup

1. Crear app en Facebook Developer (https://developers.facebook.com)
2. Agregar producto "Instagram Graph API"
3. Conectar cuenta Instagram de Papaupa
4. Generar access token long-lived
5. Copiar a `.env.local`

### Hook para fetch feed (`lib/hooks/useInstagramFeed.ts`)

```typescript
import { useEffect, useState } from 'react';

export function useInstagramFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch('/api/instagram/feed');
        const data = await response.json();
        setPosts(data.feed || []);
      } catch (error) {
        console.error('Error fetching Instagram:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
    // Refrescar cada 6 horas
    const interval = setInterval(fetchFeed, 6 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { posts, loading };
}
```

---

## 🔐 Admin Panel

### Rutas Admin

```
/admin/login              Página de login
/admin                    Dashboard
/admin/reservas           Gestión de reservas
/admin/eventos            Gestión de eventos
/admin/resenas            Moderación de reseñas
/admin/configuracion      Ajustes generales
```

### Componente Login (`app/admin/login/page.tsx`)

```typescript
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Email o contraseña incorrectos');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="heading-display text-3xl mb-6 text-center">
          Papaupa Admin
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-2"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-bold hover:bg-yellow-300"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## ✅ Checklist Pre-Launch

### Antes de lanzar a producción:

- [ ] Dominio `papaupa.com` configurado (DNS → Vercel)
- [ ] Variables de entorno todas configuradas en Vercel
- [ ] Database migrada a Neon (producción)
- [ ] Brevo: listas creadas y emails testeados
- [ ] Instagram API: token configurado y feed funcionando
- [ ] Admin user creado con contraseña segura (bcrypt)
- [ ] Menú completo en BD con imágenes
- [ ] Formularios validados y testeados (frontend + backend)
- [ ] Mapas: coordenadas correctas de Realejo
- [ ] Redes sociales: links correctos en footer
- [ ] HTTPS activado
- [ ] Meta tags (OG, description) para SEO
- [ ] Sitemap generado
- [ ] 404 page customizado
- [ ] Email de prueba enviado desde Brevo
- [ ] Backup automático de BD configurado
- [ ] Logs de error configurados (Sentry o similar)
- [ ] Performance testing (Lighthouse)

---

## 📞 Información de Contacto Papaupa

```
Restaurante: Papaupa Retro Fusión Food
Ubicación:   Realejo, Granada
Teléfono:    +34 958 99 18 44
WhatsApp:    +34 958 99 18 44 (mismo)
Email:       paco@papaupa.com (TBD)
Instagram:   @papauparetrofusionfood
Horarios:    Lunes-Jueves 13-23h | Viernes-Sábado 13-00h | Domingo 13-22h
```

---

## 🎯 Próximos Pasos

1. **Fase 1 (Esta):** Setup base + landing + home + menú + formularios
2. **Fase 2:** Admin panel + integración Brevo completa
3. **Fase 3:** Instagram feed + libro de visitas
4. **Fase 4:** Testing, optimizaciones, deploy producción
5. **Fase 5 (Futura):** Tienda online, delivery, analytics

---

## 📚 Referencias

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [NextAuth.js](https://next-auth.js.org)
- [Brevo API](https://developers.brevo.com)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-graph-api)
- [Leaflet.js](https://leafletjs.com)

---

**Última actualización:** Junio 2026  
**Versión:** 1.0 - Ready for Development  
