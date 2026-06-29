import type { MetadataRoute } from "next";

const BASE = "https://papaupa.espanias.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas: { ruta: string; prioridad: number; frecuencia: "weekly" | "monthly" }[] = [
    { ruta: "/inicio", prioridad: 1, frecuencia: "weekly" },
    { ruta: "/menu", prioridad: 0.9, frecuencia: "weekly" },
    { ruta: "/nosotros", prioridad: 0.7, frecuencia: "monthly" },
    { ruta: "/reservas", prioridad: 0.8, frecuencia: "monthly" },
    { ruta: "/galeria", prioridad: 0.6, frecuencia: "weekly" },
    { ruta: "/visitas", prioridad: 0.6, frecuencia: "weekly" },
    { ruta: "/eventos", prioridad: 0.7, frecuencia: "weekly" },
    { ruta: "/juegos", prioridad: 0.4, frecuencia: "monthly" },
    { ruta: "/aviso-legal", prioridad: 0.2, frecuencia: "monthly" },
    { ruta: "/privacidad", prioridad: 0.2, frecuencia: "monthly" },
    { ruta: "/cookies", prioridad: 0.2, frecuencia: "monthly" },
  ];

  return paginas.map((p) => ({
    url: `${BASE}${p.ruta}`,
    changeFrequency: p.frecuencia,
    priority: p.prioridad,
  }));
}
