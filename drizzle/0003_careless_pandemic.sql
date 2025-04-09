CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"date" timestamp,
	"location" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todos" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" text,
	"event_id" text NOT NULL,
	"payment_method" text,
	"payment_status" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;