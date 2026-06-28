# Marca ECR · Sello + moneda QPQ

Assets del sistema **Economía Circular** para adjuntar a los agentes (espanias / por2duros)
y para uso impreso.

## Archivos
| Archivo | Uso |
|---|---|
| `sello-ecr-realejo.svg` / `.png` | Sello en **color** (verde `#2f6b4f`) — Realejo |
| `sello-ecr-realejo-negro.svg` / `.png` | Sello **mono negro** — cuño/impresión a 1 tinta |
| `simbolo-qpq.svg` / `.png` | Moneda QPQ en color |
| `simbolo-qpq-negro.svg` / `.png` | Moneda QPQ mono negro |

- **PNG**: 1200 px (sello) / 600 px (moneda), fondo transparente. Listos para usar.
- **SVG**: vectorial, color fijo, **fondo transparente**. Escala a cualquier tamaño.

## Multi-barrio
El sello cambia con el **código** (ECR Realejo, ECZ Zaidín…) y el nombre del barrio.
Para generar otro barrio/color, lo más cómodo es el **componente React**
`components/marca/SelloECR.tsx` (props `codigo`, `barrio`, `color`) del repo de Papaupa
— es lo ideal para pasar a los agentes de espanias/por2duros (lo adaptan a sus fuentes).

## Fuentes / curvas
Los SVG usan **fuentes universales** (Helvetica/Arial para el texto y los rótulos,
Georgia para el código), presentes en cualquier sistema y RIP de impresión → se ven
igual en cualquier editor o navegador.

Para un **cuño físico** que exija el texto **convertido a curvas** estrictas, abre el SVG
en Illustrator/Inkscape y aplica **Objeto → Trazado** (10 s). (Aquí no hay Inkscape para
hacerlo por línea de comandos.)
