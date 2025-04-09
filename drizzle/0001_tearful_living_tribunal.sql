DROP TABLE "invitations" CASCADE;--> statement-breakpoint
DROP TABLE "members" CASCADE;--> statement-breakpoint
DROP TABLE "organizations" CASCADE;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "active_organization_id";