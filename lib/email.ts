import nodemailer from "nodemailer";
import { DiagnosticResult, UserAnswers } from "@/types/diagnostic";

export async function sendDiagnosticEmail({
  email,
  phone,
  acceptCallback,
  result,
}: {
  email: string;
  phone?: string;
  acceptCallback: boolean;
  result: DiagnosticResult;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #000;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 30px 20px;
            background-color: #f9f9f9;
          }
          .result-box {
            background-color: #fff;
            border: 2px solid #000;
            padding: 20px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
          }
          h1 {
            margin: 0;
            font-size: 24px;
          }
          h2 {
            font-size: 20px;
            margin-top: 0;
          }
          ul {
            padding-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Votre Diagnostic Entrepreneurial</h1>
        </div>
        
        <div class="content">
          <p>Bonjour,</p>
          
          <p>Merci d'avoir complété le diagnostic entrepreneurial express.</p>
          
          <div class="result-box">
            <h2>Votre résultat :</h2>
            <p><strong>${result.message}</strong></p>
          </div>
          
          <h3>Répartition de vos réponses :</h3>
          <ul>
            ${result.checkedCount
              .map(
                (count, index) =>
                  `<li>Étape ${index + 1} : ${count} réponse${count > 1 ? "s" : ""}</li>`
              )
              .join("")}
          </ul>
          
          <p>Chaque étape est normale. Le plus important n'est pas d'aller vite, mais d'être accompagné·e au bon moment.</p>
          
          ${
            acceptCallback
              ? `
            <p><strong>Vous avez accepté d'être rappelé(e).</strong></p>
            ${phone ? `<p>Téléphone : ${phone}</p>` : ""}
            <p>Nous vous contacterons prochainement pour approfondir votre diagnostic.</p>
          `
              : ""
          }
          
          <p>À très bientôt !</p>
        </div>
        
        <div class="footer">
          <p>Cet email a été envoyé suite à votre diagnostic entrepreneurial.</p>
        </div>
      </body>
    </html>
  `;

  const info = await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "Diagnostic Entrepreneurial"}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: "Votre diagnostic entrepreneurial - Résultat",
    html: emailHtml,
  });

  return info;
}
