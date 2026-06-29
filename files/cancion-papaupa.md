# La cumbia de Papaupa 🎵

Canción de marca para generar con **Suno** e integrar en la web (reproductor flotante).

## 1) Estilo (campo "Style of Music" en Suno)

```
Cumbia colombiana costeña, alegre y festiva, 95 BPM, acordeón vallenato, gaita, guacharaca y caja, congas, bajo tropical profundo, coros caribeños, voz masculina cálida con sabor, producción retro años 70
```

Variaciones:
- Más vallenato: `cumbia vallenata, acordeón protagonista, caja y guacharaca, voz rasgada`
- Más fiesta/champeta: `cumbia-champeta, picó caribeño, bajo potente, percusión bailable`
- Voz de Margarita: `voz femenina colombiana cálida` (versión a dúo)

## 2) Letra (campo "Lyrics")

```
[Intro]
(acordeón y gaita, ¡ajá!)

[Verso 1]
En el Realejo de Graná, subiendo el callejón,
hay una puerta amarilla que te roba el corazón.
Don Patacón te saluda, con bigote y con sazón,
"¿pasas, marica?" — y ya empieza la función.

[Pre-Coro]
Huele a mar, huele a tierra, huele a casa de verdad,
Margarita en la cocina va removiendo felicidad.

[Coro]
¡Papaupa, Papaupa! sabor colombiano con sal de aquí,
patacón y arepa, ceviche pa' compartir.
¡Papaupa, Papaupa! Paco te recibe, ven a sentir,
el Caribe y el Mediterráneo bailando en Realejo, ¡así!

[Verso 2]
Yuca con su miel de caña, empanada al calor,
ceviche cartagenero pa' enamorarte mejor.
Suena la cumbia bonita, se enciende el comedor,
y hasta Don Patacón se mueve al ritmo del tambor.

[Pre-Coro]
Huele a mar, huele a tierra, huele a casa de verdad,
en Papaupa todo el mundo siempre vuelve a por más.

[Coro]
¡Papaupa, Papaupa! sabor colombiano con sal de aquí,
patacón y arepa, ceviche pa' compartir.
¡Papaupa, Papaupa! Paco te recibe, ven a sentir,
el Caribe y el Mediterráneo bailando en Realejo, ¡así!

[Puente]
(gaita y acordeón)
De Colombia pa'l mundo, del mundo pa' Graná,
en Papaupa todos caben, ¡todos vienen a gozar! (¡eh!)

[Coro Final]
¡Papaupa, Papaupa! sabor colombiano con sal de aquí,
¡Papaupa, Papaupa! retro fusión pa' ser feliz.

[Outro]
Papaupa... retro fusión food...
¡sabrosura, mi hermano! (el acordeón se apaga)
```

## 3) Integración en la web

El reproductor flotante (vinilo retro, esquina inferior izquierda, suena al navegar
por todo el sitio, no arranca solo) ya está montado en
`components/audio/ReproductorCancion.tsx`.

**Para encenderlo cuando tengas el mp3:**
1. Sube el archivo a `public/audio/cumbia-papaupa.mp3`.
2. En `components/audio/ReproductorCancion.tsx`, cambia `CANCION.activa` de `false` a `true`.
3. `git add . && git commit && git push`.

Si el mp3 pesa mucho, se puede servir desde Vercel Blob y cambiar `CANCION.src`.
