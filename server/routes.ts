import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertApplicationSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Application routes
  app.post("/api/applications", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const validatedData = insertApplicationSchema.parse(req.body);
    const application = {
      ...validatedData,
      userId: req.user.id,
      submissionDate: new Date(),
      status: "submitted",
    };
    
    const result = await storage.createApplication(application);
    res.status(201).json(result);
  });

  app.get("/api/applications", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    if (req.user.role === "admin") {
      const applications = await storage.getAllApplications();
      return res.json(applications);
    }
    
    const applications = await storage.getUserApplications(req.user.id);
    res.json(applications);
  });

  app.patch("/api/applications/:id/status", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "admin") {
      return res.sendStatus(401);
    }

    const { status } = req.body;
    if (!["under_review", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await storage.updateApplicationStatus(
      parseInt(req.params.id),
      status
    );
    res.json(application);
  });

  const httpServer = createServer(app);
  return httpServer;
}
