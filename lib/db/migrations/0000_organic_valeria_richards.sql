CREATE TABLE "eventos" (
	"id" serial PRIMARY KEY NOT NULL,
	"titulo" varchar(200) NOT NULL,
	"titulo_en" varchar(200),
	"descripcion" text NOT NULL,
	"descripcion_en" text,
	"fecha" timestamp with time zone NOT NULL,
	"hora" varchar(10),
	"imagen_url" varchar(500),
	"enlace" varchar(500),
	"publicado" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "magic_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"usuario_id" integer NOT NULL,
	"token_hash" varchar(128) NOT NULL,
	"canal" varchar(10) NOT NULL,
	"expira_en" timestamp with time zone NOT NULL,
	"usado_en" timestamp with time zone,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"estado" varchar(12) DEFAULT 'suscrito' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "newsletter_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "resenas" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" varchar(120) NOT NULL,
	"email" varchar(255) NOT NULL,
	"rating" integer NOT NULL,
	"comentario" text NOT NULL,
	"foto_url" varchar(500),
	"estado" varchar(12) DEFAULT 'pendiente' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"telefono" varchar(32),
	"nombre" varchar(120) NOT NULL,
	"rol" varchar(20) DEFAULT 'admin' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "magic_tokens" ADD CONSTRAINT "magic_tokens_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;