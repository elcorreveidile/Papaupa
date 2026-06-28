CREATE TABLE "galeria" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(500) NOT NULL,
	"titulo" varchar(160),
	"titulo_en" varchar(160),
	"orden" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
