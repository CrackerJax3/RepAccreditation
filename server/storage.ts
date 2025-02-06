import { users, type User, type InsertUser, applications, type Application, type InsertApplication } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createApplication(application: InsertApplication & { userId: number, status: string, submissionDate: Date }): Promise<Application>;
  getUserApplications(userId: number): Promise<Application[]>;
  getAllApplications(): Promise<Application[]>;
  updateApplicationStatus(id: number, status: string): Promise<Application>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createApplication(application: InsertApplication & { userId: number, status: string, submissionDate: Date }): Promise<Application> {
    const [result] = await db.insert(applications).values(application).returning();
    return result;
  }

  async getUserApplications(userId: number): Promise<Application[]> {
    return await db.select().from(applications).where(eq(applications.userId, userId));
  }

  async getAllApplications(): Promise<Application[]> {
    return await db.select().from(applications);
  }

  async updateApplicationStatus(id: number, status: string): Promise<Application> {
    const [application] = await db
      .update(applications)
      .set({ status })
      .where(eq(applications.id, id))
      .returning();
    return application;
  }
}

export const storage = new DatabaseStorage();