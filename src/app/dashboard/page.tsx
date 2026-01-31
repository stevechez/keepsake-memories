import { supabaseAdmin } from "@/lib/supabase/admin";
import StatsHeader from "@/components/dashboard/StatsHeader";
import ProjectTable from "@/app/dashboard/ProjectTable";
import { Toaster } from "@/components/ui/sonner";

export const revalidate = 0; // Ensure you see fresh orders every time you load

export default async function ProjectDashboard() {
  // Fetch projects from your Supabase 'projects' table
  const { data: projects, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-600">Failed to load orders</h2>
        <p className="text-slate-500">Check your Supabase connection and .env.local keys.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Keepsake Studio <span className="text-indigo-600">Admin</span>
            </h1>
            <p className="text-slate-500 mt-1">
              Reviewing memories and triggering AI scripts for your pet owners.
            </p>
          </div>
        </div>

        {/* 1. Stats Overview Section */}
        <StatsHeader projects={projects || []} />

        {/* 2. Main Project Management Table */}
        <div className="mt-8">
          <ProjectTable initialProjects={projects || []} />
        </div>
      </div>

      {/* Toast notifications for Gemini triggers */}
      <Toaster position="top-right" />
    </div>
  );
}
