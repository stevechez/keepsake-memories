import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Share2, Download } from "lucide-react";
import Link from "next/link";

export default function SuccessPage({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the video_url from Supabase using params.id
  const videoUrl = "https://www.youtube.com/embed/wljkF-4SJ8Y"; 

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Your Memory is Ready!</h1>
        <p className="text-lg text-slate-600 mb-10">
          We’ve captured the magic. Here is your custom Keepsake for Jake and Bailey.
        </p>

        <Card className="shadow-2xl border-none overflow-hidden mb-10">
          <CardContent className="p-0">
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </AspectRatio>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="mr-2 h-5 w-5" /> Download 4K Video
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="mr-2 h-5 w-5" /> Share with Family
          </Button>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-indigo-600 hover:underline font-medium">
            ← Create another memory
          </Link>
        </div>
      </div>
    </div>
  );
}
