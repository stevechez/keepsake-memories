import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSuccessEmail(email: string, petName: string, videoUrl: string) {
  try {
    const data = await resend.emails.send({
      from: 'Keepsake Memories <delivery@yourdomain.com>',
      to: [email],
      subject: `Your memory of ${petName} is ready!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #4f46e5;">Your Keepsake is here.</h1>
          <p>We've finished processing your photos of <strong>${petName}</strong>.</p>
          <div style="margin: 30px 0;">
            <a href="${videoUrl}" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; rounded: 8px;">
              View Your Video
            </a>
          </div>
          <p style="color: #64748b; font-size: 14px;">
            It was a joy to see those beach days and snow plays. We hope this brings a smile to your face!
          </p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
