import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { DiagnosticResult, UserAnswers } from "@/types/diagnostic";
import { STEPS } from "@/data/questions";

// IMPORTANT: prevent static analysis
export const dynamic = "force-dynamic";

function isSmtpConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  );
}

async function loadEmailTemplate(templateName: string): Promise<string> {
  try {
    const baseUrl = process.env.APP_URL;
    const response = await fetch(`${baseUrl}/emails/${templateName}.html`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Template not found: ${templateName}`);
    }

    return await response.text();
  } catch (error) {
    console.error("❌ Error loading template:", error);
    return `<html><body><p>Error loading email template</p></body></html>`;
  }
}

function withCommonVars(html: string): string {
  const baseUrl = process.env.APP_URL || "";
  const logoUrl = `${baseUrl}/images/hlp-logo-noir-header.png`;
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com";

  return html
    .replaceAll("{{LOGO_URL}}", logoUrl)
    .replaceAll("{{CALENDLY_URL}}", calendlyUrl);
}

async function generateAdminEmailHtml(
  result: DiagnosticResult,
  answers: UserAnswers,
  prospectEmail: string,
  acceptCallback: boolean,
  phone?: string
): Promise<string> {
  let template = await loadEmailTemplate("email-admin");

  template = template.replace("{{prospect_email}}", prospectEmail);
  template = template.replace(
    "{{submitted_at}}",
    new Date().toLocaleDateString("fr-FR")
  );

  const stepKeys = [
    "creation",
    "devcom",
    "structuration",
    "optimisation",
    "expertise",
    "pilotage",
  ];

  for (let i = 1; i <= 6; i++) {
    const stepAnswers = answers[i] || [];
    const step = STEPS.find((s) => s.id === i);

    const selectedAnswers = stepAnswers
      .map((answerId) => {
        const question = step?.questions.find((q) => q.id === answerId);
        return question ? `<li>${question.text}</li>` : "";
      })
      .join("");

    template = template.replace(
      `{{${stepKeys[i - 1]}_selected_answers}}`,
      selectedAnswers
    );
  }

  template = template.replace(
    "{{phone_consent}}",
    acceptCallback ? "Oui" : "Non"
  );
  template = template.replace("{{phone_number}}", phone || "Non fourni");

  return template;
}

async function generateClientEmailHtml(
  result: DiagnosticResult
): Promise<string> {
  let template = await loadEmailTemplate("email-client");
  return withCommonVars(template);
}

async function sendViaSmtp(
  email: string,
  emailHtml: string,
  subject: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || "Diagnostic"}" <${process.env.SMTP_USER}>`,
      to: email,
      subject,
      html: emailHtml,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("SMTP error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "SMTP error",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const baseUrl = process.env.APP_URL;

    if (!baseUrl) {
      return NextResponse.json(
        { error: "APP_URL not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const { email, phone, acceptCallback, result, answers } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const clientEmailHtml = await generateClientEmailHtml(result);
    const adminEmailHtml = await generateAdminEmailHtml(
      result,
      answers,
      email,
      acceptCallback,
      phone
    );

    const clientEmailResult = await sendViaSmtp(
      email,
      clientEmailHtml,
      "Votre diagnostic entrepreneurial - Résultat"
    );

    if (!clientEmailResult.success) {
      return NextResponse.json(
        { error: clientEmailResult.error },
        { status: 500 }
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const adminEmail =
      process.env.ADMIN_EMAIL || "admin@example.com";

    await sendViaSmtp(
      adminEmail,
      adminEmailHtml,
      "Nouveau diagnostic entrepreneurial reçu"
    );

    return NextResponse.json({
      success: true,
      messageId: clientEmailResult.messageId,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
