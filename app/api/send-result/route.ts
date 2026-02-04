import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { DiagnosticResult, UserAnswers } from "@/types/diagnostic";
import { STEPS } from "@/data/questions";
import fs from "fs";
import path from "path";

const baseUrl = process.env.APP_URL;

if (!baseUrl) {
  throw new Error("Missing APP_URL env var");
}


function isSmtpConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  );
}

function loadEmailTemplate(templateName: string): string {
  const templatePath = path.join(process.cwd(), 'emails', `${templateName}.html`);
  console.log(`📄 Loading template from: ${templatePath}`);

  try {
    const template = fs.readFileSync(templatePath, 'utf-8');
    console.log(`✅ Template loaded successfully, length: ${template.length}`);
    return template;
  } catch (error) {
    console.error(`❌ Error loading template:`, error);
    return `<html><body><p>Error loading email template</p></body></html>`;
  }
}

function withCommonVars(html: string): string {
  const logoUrl = `${baseUrl}/images/hlp-logo-noir-header.png`;
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com";
  return html
    .replaceAll("{{LOGO_URL}}", logoUrl)
    .replaceAll("{{CALENDLY_URL}}", calendlyUrl);
}

function generateAdminEmailHtml(
  result: DiagnosticResult,
  answers: UserAnswers,
  prospectEmail: string,
  acceptCallback: boolean,
  phone?: string
): string {
  let template = loadEmailTemplate('email-admin');

  // Replace prospect info
  template = template.replace('{{prospect_email}}', prospectEmail);
  template = template.replace('{{submitted_at}}', new Date().toLocaleDateString('fr-FR'));

  // Generate selected answers for each category
  const stepTitles = ['Création', 'Développement commercial', 'Structuration', 'Optimisation', 'Structuration expertise', 'Pilotage'];
  const stepKeys = ['creation', 'devcom', 'structuration', 'optimisation', 'expertise', 'pilotage'];

  for (let i = 1; i <= 6; i++) {
    const stepAnswers = answers[i] || [];
    const step = STEPS.find(s => s.id === i);
    const selectedAnswers = stepAnswers.map(answerId => {
      const question = step?.questions.find(q => q.id === answerId);
      return question ? `<li>${question.text}</li>` : '';
    }).join('');

    template = template.replace(`{{${stepKeys[i - 1]}_selected_answers}}`, selectedAnswers);
  }

  // Generate recommended programs based on result
  const recommendedPrograms = generateRecommendedPrograms(result);
  template = template.replace('{{recommended_programs}}', recommendedPrograms);

  // Replace consent info
  template = template.replace('{{phone_consent}}', acceptCallback ? 'Oui' : 'Non');
  template = template.replace('{{phone_number}}', phone || 'Non fourni');

  return template;
}

function generateClientEmailHtml(
  result: DiagnosticResult
): string {
  let template = loadEmailTemplate('email-client');

  template = withCommonVars(template);
  return template;
}

function generateRecommendedPrograms(result: DiagnosticResult): string {
  const programs = [];

  const primaryCount = result.checkedCount[(result.stepId as number) - 1] || 0;

  // Based on the primary step, recommend relevant programs
  if (primaryCount >= 3) {
    switch (result.stepId) {
      case 1:
        programs.push('<li>Accompagnement "Idée → Projet" - Pour transformer votre idée en un business concret</li>');
        break;
      case 2:
        programs.push('<li>Accompagnement "Visibilité et Ventes" - Pour attirer des clients et vendre régulièrement</li>');
        break;
      case 3:
        programs.push('<li>Accompagnement "Gestion Maîtrisée" - Pour comprendre vos chiffres et retrouver la sérénité</li>');
        break;
      case 4:
        programs.push('<li>Accompagnement "Optimisation" - Pour gagner en efficacité et en stratégie</li>');
        break;
      case 5:
        programs.push('<li>Accompagnement "Expertise Structurée" - Pour valoriser et transmettre votre savoir-faire</li>');
        break;
      case 6:
        programs.push('<li>Accompagnement "Dirigeant Stratège" - Pour prendre du recul et piloter avec vision</li>');
        break;
    }
  }

  // Also recommend secondary programs based on other high-scoring areas
  const secondarySteps = result.checkedCount
    .map((count, index) => ({ step: index + 1, count }))
    .filter(item => item.count >= 3 && item.step !== result.stepId)
    .sort((a, b) => b.count - a.count)
    .slice(0, 2);

  secondarySteps.forEach(item => {
    const step = STEPS.find(s => s.id === item.step);
    if (step) {
      programs.push(`<li>Accompagnement "${step.title.split(' ')[0]}" - Complémentaire à votre besoin principal</li>`);
    }
  });

  return programs.join('');
}

async function sendViaSmtp(
  email: string,
  emailHtml: string,
  subject: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
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
      from: `"${process.env.SMTP_FROM_NAME || "Diagnostic Entrepreneurial"}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: emailHtml,
    });

    console.log("✅ Email envoyé via SMTP:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Erreur SMTP:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "SMTP error",
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      phone,
      acceptCallback,
      result,
      answers,
    }: {
      email: string;
      phone?: string;
      acceptCallback: boolean;
      result: DiagnosticResult;
      answers: UserAnswers;
    } = body;

    // Server-side validation
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (acceptCallback && !phone?.trim()) {
      return NextResponse.json(
        { error: "Phone number is required when callback is accepted" },
        { status: 400 }
      );
    }

    if (acceptCallback && phone) {
      const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
      if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 6) {
        return NextResponse.json(
          { error: "Invalid phone number format" },
          { status: 400 }
        );
      }
    }

    const clientEmailHtml = generateClientEmailHtml(result);
    const adminEmailHtml = generateAdminEmailHtml(result, answers, email, acceptCallback, phone);

    // Send email to client
    const clientEmailResult = await sendViaSmtp(email, clientEmailHtml, "Votre diagnostic entrepreneurial - Résultat");

    if (!clientEmailResult.success) {
      return NextResponse.json(
        { error: clientEmailResult.error || "Failed to send client email" },
        { status: 500 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000))

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'khalidlaghribi99@gmail.com';
    const adminEmailResult = await sendViaSmtp(adminEmail, adminEmailHtml, "Nouveau diagnostic entrepreneurial reçu");

    if (!adminEmailResult.success) {
      console.error("⚠️ Failed to send admin email:", adminEmailResult.error);
      // Don't fail the request if admin email fails
    }

    return NextResponse.json({
      success: true,
      messageId: clientEmailResult.messageId,
      adminMessageId: adminEmailResult.messageId,
      method: "smtp",
    });
  } catch (error) {
    console.error("❌ Erreur API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
