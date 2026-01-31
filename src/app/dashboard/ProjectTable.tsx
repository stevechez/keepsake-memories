"use client"

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Eye } from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  pet_name: string;
  order_tier: string;
  status: string;
  customer_email: string;
  image_urls: string[];
}

export default function ProjectTable({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleTriggerGemini = async (project: Project) => {
    setLoadingId(project.id);
    
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ 
          projectId: project.id, 
          pet_name: project.pet_name, 
          imageUrls: project.image_urls 
        }),
      });

      if (!response.ok) throw new Error("Analysis failed");

      toast.success(`Gemini has finished the script for ${project.pet_name}!`);
      
      // Update local state to show 'scripted' status immediately
      setProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, status: 'scripted' } : p
      ));
      
    } catch (error) {
      toast.error("Failed to process script. Check console.");
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet Name</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-semibold">{project.pet_name}</TableCell>
              <TableCell className="capitalize">{project.order_tier}</TableCell>
              <TableCell>
                <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-500 text-sm">{project.customer_email}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-1" /> View Photos
                </Button>
                
                <Button 
                  size="sm" 
                  className="bg-indigo-600 hover:bg-indigo-700"
                  disabled={loadingId === project.id || project.status !== 'pending'}
                  onClick={() => handleTriggerGemini(project)}
                >
                  {loadingId === project.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-1" />
                  )}
                  {project.status === 'pending' ? 'Trigger Gemini' : 'Scripted'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
