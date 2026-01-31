import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { imageUrls, petName } = await req.json();
  
  // Initialize the model
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });

  const prompt = `
    I am creating a memory video for a dog named ${petName}. 
    Analyze these images and write a heartwarming 30-second video script. 
    Focus on the "vibe" (e.g., beach days, snow plays). 
    Provide 3 short captions that could appear as text-overlays.
  `;

const { error } = await supabaseAdmin
    .from('projects')
    .update({ 
      status: 'scripted', 
      video_script: scriptResult 
    })
    .eq('id', projectId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });

  // Convert URLs to the format Gemini expects (base64 or direct bytes)
  // Note: For production, fetching and converting to base64 on the server is safest
  const imageParts = await Promise.all(
    imageUrls.map(async (url: string) => {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      return {
        inlineData: {
          data: Buffer.from(buffer).toString("base64"),
          mimeType: "image/jpeg",
        },
      };
    })
  );

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  
  return NextResponse.json({ script: response.text() });
}
