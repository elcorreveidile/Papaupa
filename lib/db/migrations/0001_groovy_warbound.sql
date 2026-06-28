CREATE TABLE "reservas" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(120) NOT NULL,
	"telefono" varchar(32) NOT NULL,
	"email" varchar(255),
	"fecha" varchar(10) NOT NULL,
	"hora" varchar(5) NOT NULL,
	"personas" integer NOT NULL,
	"observaciones" text,
	"estado" varchar(12) DEFAULT 'pendiente' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
