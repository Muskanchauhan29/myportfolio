import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create transporter — uses Gmail App Password
    // Set these in .env.local:
    //   EMAIL_USER=your-gmail@gmail.com
    //   EMAIL_PASS=your-16-char-app-password
    //   EMAIL_TO=recipient@gmail.com  (optional, defaults to EMAIL_USER)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: subject
        ? `Portfolio: ${subject}`
        : `Portfolio message from ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 600px; margin: 0 auto; background: #13100d; color: #f5ede0; padding: 40px; border: 1px solid rgba(201,169,110,0.3);">
          <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 24px;">
            New Portfolio Message
          </div>
          <h2 style="font-family: Georgia, serif; font-size: 28px; font-weight: 400; color: #f5ede0; margin: 0 0 32px;">
            ${subject || "Message from " + name}
          </h2>
          <div style="margin-bottom: 12px;">
            <span style="font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,224,0.4);">From</span>
            <div style="font-size: 14px; color: #f5ede0; margin-top: 4px;">${name}</div>
          </div>
          <div style="margin-bottom: 32px;">
            <span style="font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,224,0.4);">Reply To</span>
            <div style="font-size: 14px; color: #c9a96e; margin-top: 4px;">${email}</div>
          </div>
          <div style="height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 32px;"></div>
          <div style="font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(245,237,224,0.4); margin-bottom: 12px;">Message</div>
          <p style="font-size: 14px; line-height: 1.85; color: rgba(245,237,224,0.75); white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}