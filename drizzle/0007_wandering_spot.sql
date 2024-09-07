ALTER TABLE "project_shares" DROP CONSTRAINT "project_shares_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "project_shares" DROP CONSTRAINT "project_shares_shared_with_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "project_shares" ADD COLUMN "shared_by_user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_shares" ADD CONSTRAINT "project_shares_shared_by_user_id_user_id_fk" FOREIGN KEY ("shared_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_shares" ADD CONSTRAINT "project_shares_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_shares" ADD CONSTRAINT "project_shares_shared_with_user_id_user_id_fk" FOREIGN KEY ("shared_with_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "project_shares" DROP COLUMN IF EXISTS "updated_at";