import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, moveType, fromSuburb, toSuburb, moveDate, message, formType } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and phone are required." },
        { status: 400 }
      );
    }

    // Log the submission (in production, send to email/CRM)
    console.log("=== New Form Submission ===");
    console.log("Type:", formType || "General");
    console.log("Name:", name);
    console.log("Phone:", phone);
    console.log("Email:", email || "N/A");
    console.log("Move Type:", moveType || "N/A");
    console.log("From:", fromSuburb || "N/A");
    console.log("To:", toSuburb || "N/A");
    console.log("Date:", moveDate || "N/A");
    console.log("Message:", message || "N/A");
    console.log("===========================");

    // For MVP, store in-memory (resets on server restart)
    // In production, connect to an email service like:
    // - Resend (resend.com) - modern email API
    // - EmailJS (emailjs.com) - client-side sending
    // - Formspree (formspree.io) - form backend
    // - Nodemailer + SMTP

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you shortly. For immediate assistance, call +61 416 828 199.",
    });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
