# Economía Circular Realejo (ECR) — Anuncio + briefs

Material para lanzar el sistema **ECR / QPQ** en **espanias.com** y **por2duros.com**.
El sello (`SelloECR`) y la moneda (`SimboloQPQ`) están diseñados en el repo de
Papaupa (`components/marca/`); se entregan como SVG/componente a cada agente.

---

## 0) Modelo (cifras de referencia — web estándar, precio normal 2.000 €)

| Forma de pago | Coste | Detalle |
|---|---|---|
| **Contado** (pago único) | **1.800 €** | −10 % sobre el precio normal |
| **A plazos** (sin interés) | **4 × 500 €** = 2.000 € | precio normal fraccionado |
| **QPQ** (kupekus) | **300 € + 1.800 € en QPQ** = 2.100 € | sin descuento; un poco más |

- **1 QPQ = bono de 30 €** (en el futuro, ½ QPQ = 15 €). Al portador, **no caduca**.
- El QPQ es un **método de pago entre el negocio y la agencia** (no se vende al consumidor).
- Canje del bono: **digital** (vale firmado, como los cupones del Mundial) **o impreso con el sello**. Si el servicio cuesta 32/38 €, el resto se abona en metálico.
- Los **complementos** (reservas, tienda, socios, calendario…) ajustan el precio.
- **Multi-barrio**: ECR (Realejo), ECZ (Zaidín)…

---

## 1) Anuncio — Español

> **Tu negocio del Realejo, con web propia. Y paga como mejor te venga.**
>
> En el Realejo nos cuidamos entre vecinos. Por eso ponemos web profesional a tu
> alcance **sin descapitalizarte**: al contado, a plazos sin intereses… o pagando
> con tu propio producto. Bienvenido a la **Economía Circular Realejo**.
>
> **Cómo puedes pagar tu web** *(ejemplo: web estándar, 2.000 €)*
> - 💶 **Al contado:** 1.800 € (10 % de descuento).
> - 🗓️ **A plazos, sin intereses:** 4 × 500 €.
> - ♻️ **Con QPQ (la moneda del barrio):** 300 € + el resto en bonos de tu propio
>   negocio. 1 QPQ = 30 €. Pagas tu web con lo que sabes hacer.
>
> **¿Qué es el QPQ?** La moneda circular del Realejo: un bono de tu negocio que
> vale 30 €, al portador y sin caducidad. Pagas parte de tu web con ellos y esos
> bonos circulan por el barrio. Trueque justo, del siglo XXI.
>
> **El sello ECR.** Tu web lucirá el sello *Economía Circular Realejo*: la señal
> de que formas parte de la red de negocios del barrio que se apoyan entre sí.
>
> **¿Tienes un negocio en el Realejo?** Escríbenos y te montamos tu web.
> **Súmate al ECR.**

## 2) Anuncio — English

> **Your Realejo business deserves its own website. Pay however suits you best.**
>
> In the Realejo we look after our neighbours. That's why we make a professional
> website affordable **without draining your cash**: pay upfront, in interest-free
> instalments… or with your own product. Welcome to the **Realejo Circular Economy**.
>
> **Ways to pay** *(example: standard site, €2,000)*
> - 💶 **Upfront:** €1,800 (10% off).
> - 🗓️ **Interest-free instalments:** 4 × €500.
> - ♻️ **With QPQ (the neighbourhood currency):** €300 + the rest in vouchers from
>   your own business. 1 QPQ = €30. Pay for your site with what you do best.
>
> **What is QPQ?** The Realejo's circular currency: a €30 voucher from your
> business, to the bearer and with no expiry date. Part of your website is paid
> with them, and those vouchers circulate around the neighbourhood.
>
> **The ECR seal.** Your site carries the *Realejo Circular Economy* seal — proof
> that you're part of the local network of businesses that support each other.
>
> **Run a business in the Realejo?** Get in touch and we'll build your site.

---

## 3) BRIEF para el agente de **espanias.com** (Next 15 · Drizzle/Neon · magic link)

**Objetivo:** espanias es el **hogar del ECR** (es el catálogo de negocios locales).

**Construir:**
1. **Página manifiesto** bilingüe `/ecr` (o `/economia-circular`): usa el copy de la
   sección 1/2 de este documento. Explica qué es el ECR, las 3 formas de pago y el QPQ.
   Añade el **sello ECR** y el **símbolo QPQ** (componentes adjuntos).
2. **Directorio ECR**: marca qué proyectos del catálogo están adheridos y a qué barrio.
   - En el esquema Drizzle (`lib/db/schema.ts`), añade a `projects` una columna
     `ecr_barrio` (varchar, nullable; ej. `"ECR"`, `"ECZ"`). La **auto-reparación**
     (`ensure-schema.ts`) ya añade columnas con `ALTER TABLE ... ADD COLUMN IF NOT EXISTS`.
   - En la ficha de cada proyecto adherido, muestra el **sello ECR** (con el código del barrio).
   - Vista/listado **"Directorio ECR · Realejo"** = catálogo filtrado por `ecr_barrio`.
3. **Sello en el pie de las webs adheridas**: el sello va en el footer de cada web de
   cliente (Papaupa, perruquería…), enlazando al directorio ECR de espanias. (Eso se
   hace en cada repo de cliente; espanias solo expone el directorio.)

**Notas de stack:** bilingüe vía `lib/translations.ts`; nada de migraciones manuales
(usa la auto-reparación). Multi-barrio desde el código (`ecr_barrio`).

## 4) BRIEF para el agente de **por2duros.com** (Next 15 · Prisma/Supabase · Stripe)

**Objetivo:** por2duros es la **agencia que vende las webs** → aquí van los **métodos de pago**.

**Construir:**
1. En **precios/servicios**, añade las **3 formas de pago** (contado −10 %, a plazos
   4× sin interés, QPQ) con el copy de la sección 1/2. Usa la tabla del modelo (sección 0).
2. **Sección/landing "Economía Circular Realejo"** que explique el QPQ y **enlace a
   `espanias.com/ecr`**. Incluye el **sello ECR** y el **símbolo QPQ** (adjuntos).
3. **Flujo de cobro (Fase 1, manual):** igual que ya hacéis con Stripe (lo activa el
   admin tras el briefing). Para QPQ: el admin cobra los **300 € por Stripe** y registra
   el acuerdo de **bonos QPQ** (cantidad) en el proyecto.
   - En Prisma, opcional: añadir a `Payment`/`Project` los campos `metodoPago`
     (`CONTADO | PLAZOS | QPQ`), `qpqBonos` (int) y `qpqEur` (int). Sin automatizar canje aún.

**Notas de stack:** Stripe ya está (cobro manual por el admin). Tema Neo-Retro
Industrial. No tocar redirects www en `next.config.js`.

---

## 5) Fase 2 (más adelante, no ahora)
- **Motor de bonos QPQ** reutilizando el patrón de **cupones firmados HMAC** del Mundial
  (`MUNDIAL_COUPON_SECRET`), compartido entre espanias y por2duros, validado
  servidor-a-servidor y de un solo uso. Emitir / canjear / saldo de bonos.
- **Mapa** de negocios ECR por barrio.

## 6) Assets
- **Sello ECR** y **Símbolo QPQ**: componentes en `components/marca/` (repo Papaupa).
  Se entregan a cada agente como **SVG (texto en curvas, para imprenta/cuño) + PNG** y/o
  como componente React para adaptar a su proyecto (ajustar las fuentes a su stack).
