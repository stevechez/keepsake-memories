"use client"

import { useState } from "react";
import { toast } from "sonner"; // Assuming you use shadcn/sonner for feedback

export function useProcessProject() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const processProject = async (projectId: string, petName: string, imageUrls: string[]) => {
    setLoadingId(projectId);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ projectId, petName, imageUrls }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("AI Analysis failed");
      
      toast.success(`Gemini has finished scripting ${petName}'s story!`);
    } catch (error) {
      toast.error("Process failed. Check logs.");
    } finally {
      setLoadingId(null);
    }
  };

  return { processProject, loadingId };
}
