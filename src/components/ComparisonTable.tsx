import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Check, Minus } from "lucide-react"

export default function ComparisonTable() {
  const features = [
    { name: "Video Duration", reel: "30 Seconds", legacy: "2-3 Minutes" },
    { name: "Gemini Narrative Script", reel: false, legacy: true },
    { name: "Multimodal Image Analysis", reel: "Basic", legacy: "Deep Dive" },
    { name: "Resolution", reel: "1080p", legacy: "4K Ultra HD" },
    { name: "Emotional Music Layering", reel: "Standard", legacy: "Custom Score" },
    { name: "Priority AI Rendering", reel: false, legacy: true },
    { name: "Social Media Ready (9:16)", reel: true, legacy: true },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Compare the Experience</h3>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="w-[40%]">Feature</TableHead>
                <TableHead className="text-center">Social Reel</TableHead>
                <TableHead className="text-center text-indigo-600 font-bold">Cinematic Legacy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature.name}>
                  <TableCell className="font-medium">{feature.name}</TableCell>
                  <TableCell className="text-center">
                    {typeof feature.reel === "boolean" ? (
                      feature.reel ? <Check className="mx-auto h-5 w-5 text-green-500" /> : <Minus className="mx-auto h-5 w-5 text-slate-300" />
                    ) : (
                      <span className="text-sm text-slate-600">{feature.reel}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center bg-indigo-50/30">
                    {typeof feature.legacy === "boolean" ? (
                      feature.legacy ? <Check className="mx-auto h-5 w-5 text-indigo-600" /> : <Minus className="mx-auto h-5 w-5 text-slate-300" />
                    ) : (
                      <span className="text-sm font-semibold text-indigo-900">{feature.legacy}</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}
