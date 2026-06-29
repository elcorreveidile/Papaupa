CREATE TABLE "puntuaciones" (
	"id" serial PRIMARY KEY NOT NULL,
	"juego" varchar(16) NOT NULL,
	"iniciales" varchar(3) NOT NULL,
	"puntos" integer NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
