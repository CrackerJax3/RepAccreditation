import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  institutionName: text("institution_name").notNull(),
  type: text("type", { enum: ["school", "makerspace"] }).notNull(),
  role: text("role", { enum: ["admin", "institution"] }).default("institution"),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  status: text("status", { enum: ["draft", "submitted", "under_review", "approved", "rejected"] }).default("draft"),
  submissionDate: timestamp("submission_date"),
  address: text("address"),
  contactPerson: text("contact_person"),
  phone: text("phone"),
  email: text("email"),
  facilitiesDescription: text("facilities_description"),
  programsOffered: text("programs_offered"),
  staffQualifications: text("staff_qualifications"),
  documents: text("documents").array(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  institutionName: true,
  type: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  userId: true,
  submissionDate: true,
  status: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
