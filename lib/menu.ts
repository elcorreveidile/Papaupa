// Carta de Papaupa. Datos a partir de files/carta-transcripcion.md (bilingüe).
// Precios de ejemplo (revisar con Paco). `takeaway` marca qué categorías
// se pueden pedir para llevar.

export type Plato = {
  id: string;
  nombre: string;
  nombreEn: string;
  desc?: string;
  descEn?: string;
  precio: number;
  /** Foto del plato (ruta en /public). Opcional. */
  foto?: string;
};

export type Categoria = {
  id: string;
  titulo: string;
  tituloEn: string;
  emoji: string;
  takeaway: boolean;
  platos: Plato[];
};

// Datos iniciales para sembrar la BD la primera vez. A partir de ahí, la carta
// se edita desde el panel (/admin/carta) y se lee de la base de datos.
export const CARTA_SEED: Categoria[] = [
  {
    id: "entrantes",
    titulo: "Entrantes",
    tituloEn: "Starters",
    emoji: "🫓",
    takeaway: true,
    platos: [
      { id: "yuca-frita", nombre: "Yuca frita con ají o con hogao y queso", nombreEn: "Fried yuca with chili or tomato sauce and cheese", precio: 11, foto: "/images/carta/yuca-frita.jpg" },
      { id: "patacones", nombre: "Patacones con ají o con hogao y queso", nombreEn: "Fried green plantains with chili or tomato sauce and cheese", precio: 11, foto: "/images/carta/patacones.jpg" },
      { id: "delicias-campo", nombre: "Delicias de campo con miel de caña", nombreEn: "Fried eggplant with cane honey", desc: "Berenjenas fritas con miel de caña", descEn: "Fried eggplant with cane honey", precio: 12 },
      { id: "arepitas", nombre: "Arepitas Papaupa (8 ud.)", nombreEn: "Papaupa corn breads (8 pcs)", precio: 13 },
      { id: "hummus-arepitas", nombre: "Hummus con arepitas", nombreEn: "Hummus with corn breads", precio: 11 },
      { id: "carimanolas", nombre: "Carimañolas caseras de yuca y queso", nombreEn: "Homemade yuca and cheese croquettes", precio: 10.5 },
      { id: "lagrimas-bacalao", nombre: "Lágrimas de bacalao", nombreEn: "Cod nuggets", precio: 12 },
      { id: "lagrimas-pollo", nombre: "Lágrimas de pollo a las tres salsas", nombreEn: "Chicken nuggets with three sauces", precio: 11 },
      { id: "empanadas", nombre: "Empanadas de verduras o de carne (ud.)", nombreEn: "Vegetable or meat empanadas (each)", precio: 3.6, foto: "/images/carta/empanadas.jpg" },
      { id: "petiscos", nombre: "Petiscos cucuteños", nombreEn: "Cucuteño combo: empanadas, croquettes & cachapas", desc: "Combinado de empanadas, carimañolas y cachapas", descEn: "Empanadas, croquettes and corn omelette", precio: 13.5 },
      { id: "arroz-coco-racion", nombre: "Ración de arroz con coco", nombreEn: "Coconut rice (portion)", precio: 11.5 },
    ],
  },
  {
    id: "ensaladas",
    titulo: "Ensaladas y ceviches",
    tituloEn: "Salads & ceviches",
    emoji: "🥗",
    takeaway: true,
    platos: [
      { id: "ceviche-cartagenero", nombre: "Ceviche cartagenero", nombreEn: "Cartagena-style ceviche", desc: "Langostinos macerados en lima, cebolla roja y cilantro", descEn: "Prawns in lime, red onion and coriander", precio: 14.8, foto: "/images/carta/ceviche-cartagenero.jpg" },
      { id: "ceviche-atun", nombre: "Ceviche de atún", nombreEn: "Tuna ceviche", desc: "Atún fresco, pepino, apio, cherry, lima y soja", descEn: "Fresh tuna, cucumber, celery, cherry tomato, lime and soy", precio: 12.5 },
      { id: "ens-pacifico", nombre: "Ensalada del Pacífico", nombreEn: "Pacific salad", desc: "Lechugas, mango, rábanos, aguacate, cebolla roja y tomate seco", descEn: "Lettuce, mango, radish, avocado, red onion and sundried tomato", precio: 14, foto: "/images/carta/ens-pacifico.jpg" },
      { id: "ens-caribe", nombre: "Ensalada Caribe", nombreEn: "Caribbean salad", desc: "Lechugas, endivias, langostinos, piña, salsa rosa, aguacate y pimiento", descEn: "Lettuce, endive, prawns, pineapple, cocktail sauce, avocado and pepper", precio: 15.5 },
      { id: "ens-papaupa", nombre: "Ensalada Papaupa", nombreEn: "Papaupa salad", desc: "Hojas tiernas, rúcula, canónigos, queso de cabra, guayaba, cherry, pollo y salsa César", descEn: "Baby leaves, arugula, goat cheese, guava, cherry tomato, chicken and Caesar dressing", precio: 15 },
      { id: "tomate-alinao", nombre: "Tomate aliñao", nombreEn: "Dressed tomato salad", desc: "Con AOVE, sardinas ahumadas y lima", descEn: "With olive oil, smoked sardines and lime", precio: 13 },
    ],
  },
  {
    id: "principales",
    titulo: "La cocina",
    tituloEn: "Mains",
    emoji: "🍳",
    takeaway: true,
    platos: [
      { id: "atun-parrilla", nombre: "Atún a la parrilla", nombreEn: "Grilled tuna", desc: "Con arroz de coco y patacones (200 gr)", descEn: "With coconut rice and fried plantains (200 g)", precio: 16.8 },
      { id: "salmon", nombre: "Salmón en miel y soja", nombreEn: "Salmon in honey and soy", desc: "Con trigueros y calabacín a la plancha (200 gr)", descEn: "With grilled asparagus and courgette (200 g)", precio: 16.2, foto: "/images/carta/salmon.jpg" },
      { id: "dorada", nombre: "Dorada frita estilo costa colombiana", nombreEn: "Colombian-coast fried sea bream", desc: "Con arroz de coco, patacones y ensalada", descEn: "With coconut rice, fried plantains and salad", precio: 18, foto: "/images/carta/dorada.jpg" },
    ],
  },
  {
    id: "infantil",
    titulo: "Para peques",
    tituloEn: "For kids",
    emoji: "🧒",
    takeaway: true,
    platos: [
      { id: "menu-infantil", nombre: "Menú infantil", nombreEn: "Kids' menu", desc: "Lágrimas de pollo, bacalao frito o pasta con tomate. Bebida incluida (hasta 12 años).", descEn: "Chicken nuggets, fried cod or pasta with tomato. Drink included (up to age 12).", precio: 10 },
    ],
  },
  {
    id: "postres",
    titulo: "Postres",
    tituloEn: "Desserts",
    emoji: "🍰",
    takeaway: true,
    platos: [
      { id: "fruta", nombre: "Fruta de temporada", nombreEn: "Seasonal fruit", precio: 3 },
      { id: "postres-caseros", nombre: "Postres caseros", nombreEn: "Homemade desserts", precio: 5 },
      { id: "postres-especiales", nombre: "Postres caseros especiales", nombreEn: "Special homemade desserts", precio: 6 },
    ],
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    tituloEn: "Drinks",
    emoji: "🥤",
    takeaway: true,
    platos: [
      { id: "gaseosas", nombre: "Gaseosas", nombreEn: "Soft drinks", precio: 2.5 },
      { id: "pony-malta", nombre: "Pony Malta", nombreEn: "Pony Malta (malt drink)", precio: 2.8 },
      { id: "bitter", nombre: "Bitter Kas, tónica, soda…", nombreEn: "Bitter, tonic, soda…", precio: 2.5 },
      { id: "agua", nombre: "Agua mineral", nombreEn: "Mineral water", precio: 2.8 },
      { id: "agua-gas", nombre: "Agua mineral con gas", nombreEn: "Sparkling water", precio: 2.6 },
      { id: "zumos-pulpa", nombre: "Zumos naturales de pulpas", nombreEn: "Fresh pulp juices", precio: 5.5 },
      { id: "zumos", nombre: "Zumos", nombreEn: "Juices", precio: 3 },
      { id: "limonada", nombre: "Limonada con hierbabuena", nombreEn: "Mint lemonade", precio: 3.5 },
      { id: "mosto", nombre: "Mosto tinto sin alcohol", nombreEn: "Non-alcoholic grape must", precio: 2.5 },
      { id: "tinto-verano", nombre: "Tinto de verano", nombreEn: "Tinto de verano (wine spritzer)", precio: 2.6 },
    ],
  },
  {
    id: "cervezas",
    titulo: "Cervezas",
    tituloEn: "Beers",
    emoji: "🍺",
    takeaway: false,
    platos: [
      { id: "copa-levante", nombre: "Copa Estrella de Levante", nombreEn: "Estrella de Levante (glass)", precio: 2.6 },
      { id: "copa-levante-tostada", nombre: "Copa Estrella de Levante tostada", nombreEn: "Estrella de Levante toasted (glass)", precio: 2.6 },
      { id: "pinta-levante", nombre: "Pinta Estrella Levante (barril)", nombreEn: "Estrella Levante draft (pint)", precio: 3.8 },
      { id: "pinta-levante-tostada", nombre: "Pinta Estrella Levante tostada (barril)", nombreEn: "Estrella Levante toasted draft (pint)", precio: 3.5 },
      { id: "sin-gluten", nombre: "Cerveza sin gluten", nombreEn: "Gluten-free beer", precio: 2.6 },
      { id: "colombiana", nombre: "Cerveza colombiana", nombreEn: "Colombian beer", precio: 3.1 },
      { id: "levante-tercio", nombre: "Estrella Levante 1/3 L", nombreEn: "Estrella Levante 1/3 L", precio: 2.5 },
      { id: "levante-quinto", nombre: "Estrella Levante 1/5 L", nombreEn: "Estrella Levante 1/5 L", precio: 2.1 },
      { id: "alhambra-1925", nombre: "1925 Alhambra", nombreEn: "1925 Alhambra", precio: 3 },
      { id: "heineken", nombre: "Heineken", nombreEn: "Heineken", precio: 3.1 },
      { id: "artesanas", nombre: "Cervezas artesanas", nombreEn: "Craft beers", precio: 3.8 },
    ],
  },
  {
    id: "cafe",
    titulo: "Café e infusiones",
    tituloEn: "Coffee & teas",
    emoji: "☕",
    takeaway: false,
    platos: [
      { id: "cafe-solo", nombre: "Café solo", nombreEn: "Espresso", precio: 1.3 },
      { id: "cafe-cortado", nombre: "Café cortado", nombreEn: "Cortado", precio: 1.4 },
      { id: "cafe-leche", nombre: "Café con leche", nombreEn: "Coffee with milk", precio: 1.5 },
      { id: "americano", nombre: "Americano", nombreEn: "Americano", precio: 1.5 },
      { id: "bombon", nombre: "Café bombón", nombreEn: "Café bombón (with condensed milk)", precio: 2 },
      { id: "carajillo", nombre: "Carajillo", nombreEn: "Carajillo (coffee with liquor)", precio: 2.5 },
      { id: "te-infusiones", nombre: "Té e infusiones", nombreEn: "Tea & infusions", precio: 2.6 },
      { id: "cola-cao", nombre: "Cola Cao", nombreEn: "Cola Cao (cocoa)", precio: 2.3 },
      { id: "canelazo", nombre: "Canelazo", nombreEn: "Canelazo", desc: "Ron especiado con canela", descEn: "Spiced cinnamon rum drink", precio: 3.5 },
    ],
  },
];

export const GLOSARIO: { termino: string; terminoEn: string; definicion: string; definicionEn: string }[] = [
  { termino: "Patacones", terminoEn: "Patacones", definicion: "Trozos aplanados de plátano verde, tostón o frito.", definicionEn: "Flattened slices of fried green plantain." },
  { termino: "Yuca", terminoEn: "Yuca (cassava)", definicion: "Raíz almidonosa de alto valor nutritivo.", definicionEn: "Starchy root with high nutritional value." },
  { termino: "Ají picante", terminoEn: "Ají (hot sauce)", definicion: "Salsa insignia de chiles, tomate y cilantro.", definicionEn: "Signature sauce of chili, tomato and coriander." },
  { termino: "Ajiaco", terminoEn: "Ajiaco", definicion: "Guiso de pollo, patata, mazorca y guasca, con arroz y aguacate.", definicionEn: "Chicken, potato, corn and guasca stew, with rice and avocado." },
  { termino: "Sancocho", terminoEn: "Sancocho", definicion: "Guiso de gallina, pollo o ternera con mazorca, papa, yuca, plátano y calabaza.", definicionEn: "Hearty stew with chicken or beef, corn, potato, yuca, plantain and pumpkin." },
  { termino: "Arepa", terminoEn: "Arepa", definicion: "Masa de harina de maíz precocida, popular en Colombia y Venezuela.", definicionEn: "Cooked corn-flour cake, popular in Colombia and Venezuela." },
  { termino: "Ceviche", terminoEn: "Ceviche", definicion: "Pescado o marisco marinado en aliños muy cítricos.", definicionEn: "Fish or seafood marinated in citrus dressing." },
  { termino: "Hogao", terminoEn: "Hogao", definicion: "Salsa de tomate, cebolla junca y queso.", definicionEn: "Tomato, spring onion and cheese sauce." },
];

export function formatPrecio(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}
