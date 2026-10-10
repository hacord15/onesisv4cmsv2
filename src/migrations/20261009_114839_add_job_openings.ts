import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_news_items_category" AS ENUM('media-coverage', 'industry-insights', 'awards');
  CREATE TYPE "public"."enum_job_openings_department" AS ENUM('operations', 'technical', 'security', 'corporate', 'ehs', 'sales-bd', 'hr-admin');
  CREATE TYPE "public"."enum_job_openings_type" AS ENUM('full-time', 'part-time', 'contract');
  CREATE TYPE "public"."enum_job_openings_deployment_type" AS ENUM('on-site', 'remote', 'hybrid', 'field');
  CREATE TYPE "public"."enum_case_studies_category" AS ENUM('civil-interior', 'property-management', 'specialized-civil', 'ifm-technical', 'pmc');
  CREATE TYPE "public"."enum_blogs_category" AS ENUM('facility-management', 'industry-insights', 'company-news', 'case-studies', 'compliance');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_enquiries_status" AS ENUM('new', 'contacted', 'closed');
  CREATE TYPE "public"."enum_partnership_enquiries_status" AS ENUM('new', 'under-review', 'approved', 'rejected');
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_banner_url" varchar,
  	"sizes_banner_width" numeric,
  	"sizes_banner_height" numeric,
  	"sizes_banner_mime_type" varchar,
  	"sizes_banner_filesize" numeric,
  	"sizes_banner_filename" varchar
  );
  
  CREATE TABLE "board_members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"bio" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "management_team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"bio" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_items_key_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "news_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"category" "enum_news_items_category" NOT NULL,
  	"featured" boolean DEFAULT false,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"summary" varchar NOT NULL,
  	"content" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"source" varchar,
  	"source_details_logo_id" integer,
  	"source_details_description" varchar,
  	"source_details_website" varchar,
  	"external_link" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"author_image_id" integer,
  	"author_linkedin" varchar,
  	"author_bio" varchar,
  	"reading_time" numeric,
  	"quote_text" varchar,
  	"quote_attribution" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_items_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"news_items_id" integer
  );
  
  CREATE TABLE "training_programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "job_openings_key_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings_candidate_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "job_openings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"department" "enum_job_openings_department" NOT NULL,
  	"location" varchar NOT NULL,
  	"type" "enum_job_openings_type" NOT NULL,
  	"deployment_type" "enum_job_openings_deployment_type",
  	"experience" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"job_description" jsonb,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_key_figures" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "case_studies_project_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"client_name" varchar,
  	"location" varchar,
  	"category" "enum_case_studies_category" NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"short_description" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"slug" varchar,
  	"project_overview" jsonb,
  	"solution" jsonb,
  	"project_type" varchar,
  	"area_size" varchar,
  	"completion_year" numeric,
  	"additional_details" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar,
  	"company" varchar,
  	"rating" numeric DEFAULT 5 NOT NULL,
  	"sort_order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blogs_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"excerpt" varchar NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"content" jsonb,
  	"category" "enum_blogs_category" NOT NULL,
  	"author" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"reading_time" numeric,
  	"featured" boolean DEFAULT false,
  	"status" "enum_blogs_status" DEFAULT 'draft' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blogs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blogs_id" integer
  );
  
  CREATE TABLE "contact_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"organisation" varchar NOT NULL,
  	"designation" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"service" varchar,
  	"industry" varchar,
  	"message" varchar NOT NULL,
  	"source" varchar,
  	"status" "enum_contact_enquiries_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partnership_enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"contact_person" varchar NOT NULL,
  	"designation" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"city" varchar NOT NULL,
  	"partnership_type" varchar,
  	"experience" numeric,
  	"specialization" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_partnership_enquiries_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"board_members_id" integer,
  	"management_team_id" integer,
  	"news_items_id" integer,
  	"training_programs_id" integer,
  	"job_openings_id" integer,
  	"case_studies_id" integer,
  	"testimonials_id" integer,
  	"blogs_id" integer,
  	"contact_enquiries_id" integer,
  	"partnership_enquiries_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "company_profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer NOT NULL,
  	"button_label" varchar DEFAULT 'Download Company Profile',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "nav_links_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "nav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_text" varchar DEFAULT 'OneSIS' NOT NULL,
  	"logo_id" integer,
  	"parent_badge" varchar DEFAULT 'SIS Group Co.',
  	"cta_label" varchar DEFAULT 'Company Profile',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" varchar NOT NULL,
  	"badge" varchar,
  	"copyright" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_hero_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_about_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_about_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_about_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_verticals_items_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_verticals_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"index" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "home_stats_strip" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_hardcore_repair_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_corporate_interior_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_office_interior_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_office_interior_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_property_management_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "home_outcomes_heading" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_outcomes_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"index" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_accountability_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"index" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_technology_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"tag" varchar,
  	"description" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "home_cta_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar NOT NULL,
  	"hero_heading_accent" varchar,
  	"hero_body" varchar NOT NULL,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"hero_scroll_label" varchar,
  	"hero_banner_id" integer NOT NULL,
  	"about_eyebrow" varchar NOT NULL,
  	"about_heading_accent" varchar,
  	"about_body" varchar NOT NULL,
  	"about_image_id" integer NOT NULL,
  	"about_image_caption" varchar,
  	"verticals_eyebrow" varchar NOT NULL,
  	"verticals_heading" varchar NOT NULL,
  	"verticals_heading_accent" varchar,
  	"verticals_body" varchar,
  	"hardcore_repair_eyebrow" varchar NOT NULL,
  	"hardcore_repair_heading" varchar NOT NULL,
  	"hardcore_repair_heading_accent" varchar,
  	"hardcore_repair_body" varchar NOT NULL,
  	"hardcore_repair_sectors_heading" varchar,
  	"hardcore_repair_cta" varchar,
  	"hardcore_repair_image_id" integer NOT NULL,
  	"hardcore_repair_image_caption" varchar,
  	"hardcore_repair_image_subcaption" varchar,
  	"corporate_interior_eyebrow" varchar NOT NULL,
  	"corporate_interior_heading" varchar NOT NULL,
  	"corporate_interior_heading_accent" varchar,
  	"corporate_interior_sectors_heading" varchar,
  	"corporate_interior_body" varchar NOT NULL,
  	"corporate_interior_cta" varchar,
  	"corporate_interior_image_id" integer NOT NULL,
  	"corporate_interior_image_caption" varchar,
  	"corporate_interior_image_subcaption" varchar,
  	"office_interior_eyebrow" varchar NOT NULL,
  	"office_interior_heading" varchar NOT NULL,
  	"office_interior_heading_accent" varchar,
  	"office_interior_sectors_heading" varchar,
  	"office_interior_body" varchar NOT NULL,
  	"office_interior_cta" varchar,
  	"office_interior_image_id" integer NOT NULL,
  	"office_interior_image_caption" varchar,
  	"office_interior_image_subcaption" varchar,
  	"property_management_eyebrow" varchar NOT NULL,
  	"property_management_heading" varchar NOT NULL,
  	"property_management_heading_accent" varchar,
  	"property_management_sectors_heading" varchar,
  	"property_management_body" varchar NOT NULL,
  	"property_management_cta" varchar,
  	"property_management_image_id" integer NOT NULL,
  	"property_management_image_caption" varchar,
  	"property_management_image_subcaption" varchar,
  	"outcomes_eyebrow" varchar NOT NULL,
  	"outcomes_heading_accent" varchar,
  	"outcomes_body" varchar,
  	"accountability_eyebrow" varchar NOT NULL,
  	"accountability_heading" varchar NOT NULL,
  	"accountability_heading_accent" varchar,
  	"accountability_heading_tail" varchar,
  	"accountability_body" varchar,
  	"where_we_operate_heading" varchar NOT NULL,
  	"where_we_operate_heading_accent" varchar,
  	"where_we_operate_body" varchar,
  	"technology_eyebrow" varchar NOT NULL,
  	"technology_heading" varchar NOT NULL,
  	"technology_heading_accent" varchar,
  	"technology_heading_tail" varchar,
  	"technology_body" varchar,
  	"technology_cta" varchar,
  	"cta_eyebrow" varchar NOT NULL,
  	"cta_heading" varchar NOT NULL,
  	"cta_heading_accent" varchar,
  	"cta_heading_tail" varchar,
  	"cta_body" varchar,
  	"cta_primary_cta" varchar,
  	"cta_secondary_cta" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_board_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_management_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_news_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "company_training_page_platform_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "company_training_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "career_current_openings_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "career_employee_benefits_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "career_employee_benefits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"banner_id" integer NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "board_members" ADD CONSTRAINT "board_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "management_team" ADD CONSTRAINT "management_team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items_key_takeaways" ADD CONSTRAINT "news_items_key_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items" ADD CONSTRAINT "news_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items" ADD CONSTRAINT "news_items_source_details_logo_id_media_id_fk" FOREIGN KEY ("source_details_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items" ADD CONSTRAINT "news_items_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items" ADD CONSTRAINT "news_items_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_items_texts" ADD CONSTRAINT "news_items_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items_rels" ADD CONSTRAINT "news_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_items_rels" ADD CONSTRAINT "news_items_rels_news_items_fk" FOREIGN KEY ("news_items_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "training_programs" ADD CONSTRAINT "training_programs_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "job_openings_key_responsibilities" ADD CONSTRAINT "job_openings_key_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "job_openings_candidate_requirements" ADD CONSTRAINT "job_openings_candidate_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_services" ADD CONSTRAINT "case_studies_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_key_figures" ADD CONSTRAINT "case_studies_key_figures_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_project_images" ADD CONSTRAINT "case_studies_project_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_project_images" ADD CONSTRAINT "case_studies_project_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_tags" ADD CONSTRAINT "blogs_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs_rels" ADD CONSTRAINT "blogs_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_members_fk" FOREIGN KEY ("board_members_id") REFERENCES "public"."board_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_management_team_fk" FOREIGN KEY ("management_team_id") REFERENCES "public"."management_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_items_fk" FOREIGN KEY ("news_items_id") REFERENCES "public"."news_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_training_programs_fk" FOREIGN KEY ("training_programs_id") REFERENCES "public"."training_programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_job_openings_fk" FOREIGN KEY ("job_openings_id") REFERENCES "public"."job_openings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_enquiries_fk" FOREIGN KEY ("contact_enquiries_id") REFERENCES "public"."contact_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partnership_enquiries_fk" FOREIGN KEY ("partnership_enquiries_id") REFERENCES "public"."partnership_enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_profile" ADD CONSTRAINT "company_profile_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "nav_links_children" ADD CONSTRAINT "nav_links_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav_links" ADD CONSTRAINT "nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "nav" ADD CONSTRAINT "nav_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social" ADD CONSTRAINT "footer_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_heading" ADD CONSTRAINT "home_hero_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_stats" ADD CONSTRAINT "home_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_heading" ADD CONSTRAINT "home_about_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_badges" ADD CONSTRAINT "home_about_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_about_facts" ADD CONSTRAINT "home_about_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_verticals_items_tags" ADD CONSTRAINT "home_verticals_items_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_verticals_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_verticals_items" ADD CONSTRAINT "home_verticals_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_verticals_items" ADD CONSTRAINT "home_verticals_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_stats_strip" ADD CONSTRAINT "home_stats_strip_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hardcore_repair_checklist" ADD CONSTRAINT "home_hardcore_repair_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_corporate_interior_checklist" ADD CONSTRAINT "home_corporate_interior_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_office_interior_checklist" ADD CONSTRAINT "home_office_interior_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_office_interior_stats" ADD CONSTRAINT "home_office_interior_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_property_management_checklist" ADD CONSTRAINT "home_property_management_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_outcomes_heading" ADD CONSTRAINT "home_outcomes_heading_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_outcomes_items" ADD CONSTRAINT "home_outcomes_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_accountability_items" ADD CONSTRAINT "home_accountability_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_technology_platforms" ADD CONSTRAINT "home_technology_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_cta_stats" ADD CONSTRAINT "home_cta_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_banner_id_media_id_fk" FOREIGN KEY ("hero_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hardcore_repair_image_id_media_id_fk" FOREIGN KEY ("hardcore_repair_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_corporate_interior_image_id_media_id_fk" FOREIGN KEY ("corporate_interior_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_office_interior_image_id_media_id_fk" FOREIGN KEY ("office_interior_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_property_management_image_id_media_id_fk" FOREIGN KEY ("property_management_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_board_page" ADD CONSTRAINT "company_board_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_board_page" ADD CONSTRAINT "company_board_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_management_page" ADD CONSTRAINT "company_management_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_management_page" ADD CONSTRAINT "company_management_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_news_page" ADD CONSTRAINT "company_news_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_news_page" ADD CONSTRAINT "company_news_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_training_page_platform_features" ADD CONSTRAINT "company_training_page_platform_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."company_training_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "company_training_page" ADD CONSTRAINT "company_training_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "company_training_page" ADD CONSTRAINT "company_training_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_current_openings_page" ADD CONSTRAINT "career_current_openings_page_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_current_openings_page" ADD CONSTRAINT "career_current_openings_page_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_employee_benefits_benefits" ADD CONSTRAINT "career_employee_benefits_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."career_employee_benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "career_employee_benefits" ADD CONSTRAINT "career_employee_benefits_banner_id_media_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "career_employee_benefits" ADD CONSTRAINT "career_employee_benefits_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_banner_sizes_banner_filename_idx" ON "media" USING btree ("sizes_banner_filename");
  CREATE INDEX "board_members_photo_idx" ON "board_members" USING btree ("photo_id");
  CREATE INDEX "board_members_updated_at_idx" ON "board_members" USING btree ("updated_at");
  CREATE INDEX "board_members_created_at_idx" ON "board_members" USING btree ("created_at");
  CREATE INDEX "management_team_photo_idx" ON "management_team" USING btree ("photo_id");
  CREATE INDEX "management_team_updated_at_idx" ON "management_team" USING btree ("updated_at");
  CREATE INDEX "management_team_created_at_idx" ON "management_team" USING btree ("created_at");
  CREATE INDEX "news_items_key_takeaways_order_idx" ON "news_items_key_takeaways" USING btree ("_order");
  CREATE INDEX "news_items_key_takeaways_parent_id_idx" ON "news_items_key_takeaways" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "news_items_slug_idx" ON "news_items" USING btree ("slug");
  CREATE INDEX "news_items_image_idx" ON "news_items" USING btree ("image_id");
  CREATE INDEX "news_items_source_details_source_details_logo_idx" ON "news_items" USING btree ("source_details_logo_id");
  CREATE INDEX "news_items_author_author_image_idx" ON "news_items" USING btree ("author_image_id");
  CREATE INDEX "news_items_seo_seo_og_image_idx" ON "news_items" USING btree ("seo_og_image_id");
  CREATE INDEX "news_items_updated_at_idx" ON "news_items" USING btree ("updated_at");
  CREATE INDEX "news_items_created_at_idx" ON "news_items" USING btree ("created_at");
  CREATE INDEX "news_items_texts_order_parent" ON "news_items_texts" USING btree ("order","parent_id");
  CREATE INDEX "news_items_rels_order_idx" ON "news_items_rels" USING btree ("order");
  CREATE INDEX "news_items_rels_parent_idx" ON "news_items_rels" USING btree ("parent_id");
  CREATE INDEX "news_items_rels_path_idx" ON "news_items_rels" USING btree ("path");
  CREATE INDEX "news_items_rels_news_items_id_idx" ON "news_items_rels" USING btree ("news_items_id");
  CREATE INDEX "training_programs_image_idx" ON "training_programs" USING btree ("image_id");
  CREATE INDEX "training_programs_updated_at_idx" ON "training_programs" USING btree ("updated_at");
  CREATE INDEX "training_programs_created_at_idx" ON "training_programs" USING btree ("created_at");
  CREATE INDEX "job_openings_key_responsibilities_order_idx" ON "job_openings_key_responsibilities" USING btree ("_order");
  CREATE INDEX "job_openings_key_responsibilities_parent_id_idx" ON "job_openings_key_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "job_openings_candidate_requirements_order_idx" ON "job_openings_candidate_requirements" USING btree ("_order");
  CREATE INDEX "job_openings_candidate_requirements_parent_id_idx" ON "job_openings_candidate_requirements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "job_openings_slug_idx" ON "job_openings" USING btree ("slug");
  CREATE INDEX "job_openings_updated_at_idx" ON "job_openings" USING btree ("updated_at");
  CREATE INDEX "job_openings_created_at_idx" ON "job_openings" USING btree ("created_at");
  CREATE INDEX "case_studies_services_order_idx" ON "case_studies_services" USING btree ("_order");
  CREATE INDEX "case_studies_services_parent_id_idx" ON "case_studies_services" USING btree ("_parent_id");
  CREATE INDEX "case_studies_key_figures_order_idx" ON "case_studies_key_figures" USING btree ("_order");
  CREATE INDEX "case_studies_key_figures_parent_id_idx" ON "case_studies_key_figures" USING btree ("_parent_id");
  CREATE INDEX "case_studies_project_images_order_idx" ON "case_studies_project_images" USING btree ("_order");
  CREATE INDEX "case_studies_project_images_parent_id_idx" ON "case_studies_project_images" USING btree ("_parent_id");
  CREATE INDEX "case_studies_project_images_image_idx" ON "case_studies_project_images" USING btree ("image_id");
  CREATE INDEX "case_studies_cover_image_idx" ON "case_studies" USING btree ("cover_image_id");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "blogs_tags_order_idx" ON "blogs_tags" USING btree ("_order");
  CREATE INDEX "blogs_tags_parent_id_idx" ON "blogs_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_featured_image_idx" ON "blogs" USING btree ("featured_image_id");
  CREATE INDEX "blogs_seo_image_idx" ON "blogs" USING btree ("seo_image_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blogs_rels_order_idx" ON "blogs_rels" USING btree ("order");
  CREATE INDEX "blogs_rels_parent_idx" ON "blogs_rels" USING btree ("parent_id");
  CREATE INDEX "blogs_rels_path_idx" ON "blogs_rels" USING btree ("path");
  CREATE INDEX "blogs_rels_blogs_id_idx" ON "blogs_rels" USING btree ("blogs_id");
  CREATE INDEX "contact_enquiries_updated_at_idx" ON "contact_enquiries" USING btree ("updated_at");
  CREATE INDEX "contact_enquiries_created_at_idx" ON "contact_enquiries" USING btree ("created_at");
  CREATE INDEX "partnership_enquiries_updated_at_idx" ON "partnership_enquiries" USING btree ("updated_at");
  CREATE INDEX "partnership_enquiries_created_at_idx" ON "partnership_enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_board_members_id_idx" ON "payload_locked_documents_rels" USING btree ("board_members_id");
  CREATE INDEX "payload_locked_documents_rels_management_team_id_idx" ON "payload_locked_documents_rels" USING btree ("management_team_id");
  CREATE INDEX "payload_locked_documents_rels_news_items_id_idx" ON "payload_locked_documents_rels" USING btree ("news_items_id");
  CREATE INDEX "payload_locked_documents_rels_training_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("training_programs_id");
  CREATE INDEX "payload_locked_documents_rels_job_openings_id_idx" ON "payload_locked_documents_rels" USING btree ("job_openings_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_contact_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_partnership_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("partnership_enquiries_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "company_profile_file_idx" ON "company_profile" USING btree ("file_id");
  CREATE INDEX "nav_links_children_order_idx" ON "nav_links_children" USING btree ("_order");
  CREATE INDEX "nav_links_children_parent_id_idx" ON "nav_links_children" USING btree ("_parent_id");
  CREATE INDEX "nav_links_order_idx" ON "nav_links" USING btree ("_order");
  CREATE INDEX "nav_links_parent_id_idx" ON "nav_links" USING btree ("_parent_id");
  CREATE INDEX "nav_logo_idx" ON "nav" USING btree ("logo_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_order_idx" ON "footer_social" USING btree ("_order");
  CREATE INDEX "footer_social_parent_id_idx" ON "footer_social" USING btree ("_parent_id");
  CREATE INDEX "home_hero_heading_order_idx" ON "home_hero_heading" USING btree ("_order");
  CREATE INDEX "home_hero_heading_parent_id_idx" ON "home_hero_heading" USING btree ("_parent_id");
  CREATE INDEX "home_hero_stats_order_idx" ON "home_hero_stats" USING btree ("_order");
  CREATE INDEX "home_hero_stats_parent_id_idx" ON "home_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "home_about_heading_order_idx" ON "home_about_heading" USING btree ("_order");
  CREATE INDEX "home_about_heading_parent_id_idx" ON "home_about_heading" USING btree ("_parent_id");
  CREATE INDEX "home_about_badges_order_idx" ON "home_about_badges" USING btree ("_order");
  CREATE INDEX "home_about_badges_parent_id_idx" ON "home_about_badges" USING btree ("_parent_id");
  CREATE INDEX "home_about_facts_order_idx" ON "home_about_facts" USING btree ("_order");
  CREATE INDEX "home_about_facts_parent_id_idx" ON "home_about_facts" USING btree ("_parent_id");
  CREATE INDEX "home_verticals_items_tags_order_idx" ON "home_verticals_items_tags" USING btree ("_order");
  CREATE INDEX "home_verticals_items_tags_parent_id_idx" ON "home_verticals_items_tags" USING btree ("_parent_id");
  CREATE INDEX "home_verticals_items_order_idx" ON "home_verticals_items" USING btree ("_order");
  CREATE INDEX "home_verticals_items_parent_id_idx" ON "home_verticals_items" USING btree ("_parent_id");
  CREATE INDEX "home_verticals_items_image_idx" ON "home_verticals_items" USING btree ("image_id");
  CREATE INDEX "home_stats_strip_order_idx" ON "home_stats_strip" USING btree ("_order");
  CREATE INDEX "home_stats_strip_parent_id_idx" ON "home_stats_strip" USING btree ("_parent_id");
  CREATE INDEX "home_hardcore_repair_checklist_order_idx" ON "home_hardcore_repair_checklist" USING btree ("_order");
  CREATE INDEX "home_hardcore_repair_checklist_parent_id_idx" ON "home_hardcore_repair_checklist" USING btree ("_parent_id");
  CREATE INDEX "home_corporate_interior_checklist_order_idx" ON "home_corporate_interior_checklist" USING btree ("_order");
  CREATE INDEX "home_corporate_interior_checklist_parent_id_idx" ON "home_corporate_interior_checklist" USING btree ("_parent_id");
  CREATE INDEX "home_office_interior_checklist_order_idx" ON "home_office_interior_checklist" USING btree ("_order");
  CREATE INDEX "home_office_interior_checklist_parent_id_idx" ON "home_office_interior_checklist" USING btree ("_parent_id");
  CREATE INDEX "home_office_interior_stats_order_idx" ON "home_office_interior_stats" USING btree ("_order");
  CREATE INDEX "home_office_interior_stats_parent_id_idx" ON "home_office_interior_stats" USING btree ("_parent_id");
  CREATE INDEX "home_property_management_checklist_order_idx" ON "home_property_management_checklist" USING btree ("_order");
  CREATE INDEX "home_property_management_checklist_parent_id_idx" ON "home_property_management_checklist" USING btree ("_parent_id");
  CREATE INDEX "home_outcomes_heading_order_idx" ON "home_outcomes_heading" USING btree ("_order");
  CREATE INDEX "home_outcomes_heading_parent_id_idx" ON "home_outcomes_heading" USING btree ("_parent_id");
  CREATE INDEX "home_outcomes_items_order_idx" ON "home_outcomes_items" USING btree ("_order");
  CREATE INDEX "home_outcomes_items_parent_id_idx" ON "home_outcomes_items" USING btree ("_parent_id");
  CREATE INDEX "home_accountability_items_order_idx" ON "home_accountability_items" USING btree ("_order");
  CREATE INDEX "home_accountability_items_parent_id_idx" ON "home_accountability_items" USING btree ("_parent_id");
  CREATE INDEX "home_technology_platforms_order_idx" ON "home_technology_platforms" USING btree ("_order");
  CREATE INDEX "home_technology_platforms_parent_id_idx" ON "home_technology_platforms" USING btree ("_parent_id");
  CREATE INDEX "home_cta_stats_order_idx" ON "home_cta_stats" USING btree ("_order");
  CREATE INDEX "home_cta_stats_parent_id_idx" ON "home_cta_stats" USING btree ("_parent_id");
  CREATE INDEX "home_hero_hero_banner_idx" ON "home" USING btree ("hero_banner_id");
  CREATE INDEX "home_about_about_image_idx" ON "home" USING btree ("about_image_id");
  CREATE INDEX "home_hardcore_repair_hardcore_repair_image_idx" ON "home" USING btree ("hardcore_repair_image_id");
  CREATE INDEX "home_corporate_interior_corporate_interior_image_idx" ON "home" USING btree ("corporate_interior_image_id");
  CREATE INDEX "home_office_interior_office_interior_image_idx" ON "home" USING btree ("office_interior_image_id");
  CREATE INDEX "home_property_management_property_management_image_idx" ON "home" USING btree ("property_management_image_id");
  CREATE INDEX "home_seo_seo_og_image_idx" ON "home" USING btree ("seo_og_image_id");
  CREATE INDEX "company_board_page_banner_idx" ON "company_board_page" USING btree ("banner_id");
  CREATE INDEX "company_board_page_seo_seo_og_image_idx" ON "company_board_page" USING btree ("seo_og_image_id");
  CREATE INDEX "company_management_page_banner_idx" ON "company_management_page" USING btree ("banner_id");
  CREATE INDEX "company_management_page_seo_seo_og_image_idx" ON "company_management_page" USING btree ("seo_og_image_id");
  CREATE INDEX "company_news_page_banner_idx" ON "company_news_page" USING btree ("banner_id");
  CREATE INDEX "company_news_page_seo_seo_og_image_idx" ON "company_news_page" USING btree ("seo_og_image_id");
  CREATE INDEX "company_training_page_platform_features_order_idx" ON "company_training_page_platform_features" USING btree ("_order");
  CREATE INDEX "company_training_page_platform_features_parent_id_idx" ON "company_training_page_platform_features" USING btree ("_parent_id");
  CREATE INDEX "company_training_page_banner_idx" ON "company_training_page" USING btree ("banner_id");
  CREATE INDEX "company_training_page_seo_seo_og_image_idx" ON "company_training_page" USING btree ("seo_og_image_id");
  CREATE INDEX "career_current_openings_page_banner_idx" ON "career_current_openings_page" USING btree ("banner_id");
  CREATE INDEX "career_current_openings_page_seo_seo_og_image_idx" ON "career_current_openings_page" USING btree ("seo_og_image_id");
  CREATE INDEX "career_employee_benefits_benefits_order_idx" ON "career_employee_benefits_benefits" USING btree ("_order");
  CREATE INDEX "career_employee_benefits_benefits_parent_id_idx" ON "career_employee_benefits_benefits" USING btree ("_parent_id");
  CREATE INDEX "career_employee_benefits_banner_idx" ON "career_employee_benefits" USING btree ("banner_id");
  CREATE INDEX "career_employee_benefits_seo_seo_og_image_idx" ON "career_employee_benefits" USING btree ("seo_og_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "board_members" CASCADE;
  DROP TABLE "management_team" CASCADE;
  DROP TABLE "news_items_key_takeaways" CASCADE;
  DROP TABLE "news_items" CASCADE;
  DROP TABLE "news_items_texts" CASCADE;
  DROP TABLE "news_items_rels" CASCADE;
  DROP TABLE "training_programs" CASCADE;
  DROP TABLE "job_openings_key_responsibilities" CASCADE;
  DROP TABLE "job_openings_candidate_requirements" CASCADE;
  DROP TABLE "job_openings" CASCADE;
  DROP TABLE "case_studies_services" CASCADE;
  DROP TABLE "case_studies_key_figures" CASCADE;
  DROP TABLE "case_studies_project_images" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "blogs_tags" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "blogs_rels" CASCADE;
  DROP TABLE "contact_enquiries" CASCADE;
  DROP TABLE "partnership_enquiries" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "company_profile" CASCADE;
  DROP TABLE "nav_links_children" CASCADE;
  DROP TABLE "nav_links" CASCADE;
  DROP TABLE "nav" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home_hero_heading" CASCADE;
  DROP TABLE "home_hero_stats" CASCADE;
  DROP TABLE "home_about_heading" CASCADE;
  DROP TABLE "home_about_badges" CASCADE;
  DROP TABLE "home_about_facts" CASCADE;
  DROP TABLE "home_verticals_items_tags" CASCADE;
  DROP TABLE "home_verticals_items" CASCADE;
  DROP TABLE "home_stats_strip" CASCADE;
  DROP TABLE "home_hardcore_repair_checklist" CASCADE;
  DROP TABLE "home_corporate_interior_checklist" CASCADE;
  DROP TABLE "home_office_interior_checklist" CASCADE;
  DROP TABLE "home_office_interior_stats" CASCADE;
  DROP TABLE "home_property_management_checklist" CASCADE;
  DROP TABLE "home_outcomes_heading" CASCADE;
  DROP TABLE "home_outcomes_items" CASCADE;
  DROP TABLE "home_accountability_items" CASCADE;
  DROP TABLE "home_technology_platforms" CASCADE;
  DROP TABLE "home_cta_stats" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "company_board_page" CASCADE;
  DROP TABLE "company_management_page" CASCADE;
  DROP TABLE "company_news_page" CASCADE;
  DROP TABLE "company_training_page_platform_features" CASCADE;
  DROP TABLE "company_training_page" CASCADE;
  DROP TABLE "career_current_openings_page" CASCADE;
  DROP TABLE "career_employee_benefits_benefits" CASCADE;
  DROP TABLE "career_employee_benefits" CASCADE;
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_news_items_category";
  DROP TYPE "public"."enum_job_openings_department";
  DROP TYPE "public"."enum_job_openings_type";
  DROP TYPE "public"."enum_job_openings_deployment_type";
  DROP TYPE "public"."enum_case_studies_category";
  DROP TYPE "public"."enum_blogs_category";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum_contact_enquiries_status";
  DROP TYPE "public"."enum_partnership_enquiries_status";`)
}
