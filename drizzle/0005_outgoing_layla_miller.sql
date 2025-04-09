ALTER TABLE "todos" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ALTER COLUMN "updated_at" DROP NOT NULL;