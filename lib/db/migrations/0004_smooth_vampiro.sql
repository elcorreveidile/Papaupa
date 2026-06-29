CREATE TABLE "menu_categorias" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(40) NOT NULL,
	"titulo" varchar(80) NOT NULL,
	"titulo_en" varchar(80) NOT NULL,
	"emoji" varchar(8) DEFAULT '' NOT NULL,
	"takeaway" boolean DEFAULT true NOT NULL,
	"orden" integer DEFAULT 0 NOT NULL,
	"visible" boolean DEFAULT true NOT NULL,
	CONSTRAINT "menu_categorias_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "menu_platos" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoria_id" integer NOT NULL,
	"nombre" varchar(160) NOT NULL,
	"nombre_en" varchar(160) NOT NULL,
	"descripcion" varchar(300),
	"descripcion_en" varchar(300),
	"precio" numeric(7, 2) NOT NULL,
	"foto_url" varchar(500),
	"disponible" boolean DEFAULT true NOT NULL,
	"orden" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "menu_platos" ADD CONSTRAINT "menu_platos_categoria_id_menu_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."menu_categorias"("id") ON DELETE cascade ON UPDATE no action;