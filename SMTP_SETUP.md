# Configuration SMTP Personnalisé

Si ton client possède déjà un serveur SMTP (Gmail, Outlook, serveur dédié), voici comment basculer de Resend vers SMTP.

## 📋 Comparaison Resend vs SMTP

| Critère | Resend | SMTP Personnalisé |
|---------|--------|-------------------|
| **Prix** | ✅ Gratuit (3000 emails/mois) | Dépend du fournisseur |
| **Configuration** | ✅ Simple (1 clé API) | ⚠️ Plus complexe |
| **Deliverability** | ✅ Excellent | Variable |
| **Setup** | 2 minutes | 10-15 minutes |
| **Maintenance** | ✅ Aucune | Gestion serveur |

## 🔧 Option 1 : Resend (Actuel - Recommandé)

**Avantages** :
- ✅ **GRATUIT** jusqu'à 3000 emails/mois
- ✅ Configuration en 2 minutes
- ✅ Excellent taux de délivrabilité
- ✅ Pas de serveur à gérer
- ✅ Dashboard analytics inclus

**Configuration** :
1. Créer un compte sur [resend.com](https://resend.com)
2. Obtenir la clé API
3. Ajouter dans `.env.local` :
```env
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=onboarding@resend.dev
ADMIN_EMAIL=contact@hlpbusiness.com
```

**C'est tout !** L'application utilise déjà Resend.

---

## 🔧 Option 2 : SMTP Personnalisé

### Étape 1 : Installer Nodemailer

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Étape 2 : Configurer les variables d'environnement

Dans `.env.local` :

#### Pour Gmail :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-application
SMTP_FROM_EMAIL=votre-email@gmail.com
SMTP_FROM_NAME=Diagnostic Entrepreneurial
ADMIN_EMAIL=contact@hlpbusiness.com
```

**⚠️ Gmail** : Utiliser un "mot de passe d'application" (pas le mot de passe normal)
- Aller dans Compte Google → Sécurité → Validation en deux étapes → Mots de passe des applications

#### Pour Outlook/Office 365 :
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@outlook.com
SMTP_PASSWORD=votre-mot-de-passe
SMTP_FROM_EMAIL=votre-email@outlook.com
SMTP_FROM_NAME=Diagnostic Entrepreneurial
ADMIN_EMAIL=contact@hlpbusiness.com
```

#### Pour un serveur SMTP personnalisé :
```env
SMTP_HOST=mail.votredomaine.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@votredomaine.com
SMTP_PASSWORD=votre-mot-de-passe
SMTP_FROM_EMAIL=contact@votredomaine.com
SMTP_FROM_NAME=Diagnostic Entrepreneurial
ADMIN_EMAIL=contact@hlpbusiness.com
```

### Étape 3 : Modifier le fichier API

Remplacer le contenu de `app/api/send-result/route.ts` par :

```typescript
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { DiagnosticResult, UserAnswers } from "@/types/diagnostic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      phone,
      acceptCallback,
      result,
    }: {
      email: string;
      phone?: string;
      acceptCallback: boolean;
      result: DiagnosticResult;
      answers: UserAnswers;
    } = body;

    // Configuration du transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Template HTML (identique à Resend)
    const emailHtml = \`
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
              <p><strong>\${result.message}</strong></p>
            </div>
            
            <h3>Répartition de vos réponses :</h3>
            <ul>
              \${result.checkedCount
                .map(
                  (count, index) =>
                    \`<li>Étape \${index + 1} : \${count} réponse\${count > 1 ? "s" : ""}</li>\`
                )
                .join("")}
            </ul>
            
            <p>Chaque étape est normale. Le plus important n'est pas d'aller vite, mais d'être accompagné·e au bon moment.</p>
            
            \${
              acceptCallback
                ? \`
              <p><strong>Vous avez accepté d'être rappelé(e).</strong></p>
              \${phone ? \`<p>Téléphone : \${phone}</p>\` : ""}
              <p>Nous vous contacterons prochainement pour approfondir votre diagnostic.</p>
            \`
                : ""
            }
            
            <p>À très bientôt !</p>
          </div>
          
          <div class="footer">
            <p>Cet email a été envoyé suite à votre diagnostic entrepreneurial.</p>
          </div>
        </body>
      </html>
    \`;

    // Envoi de l'email
    const info = await transporter.sendMail({
      from: \`"\${process.env.SMTP_FROM_NAME || "Diagnostic Entrepreneurial"}" <\${process.env.SMTP_FROM_EMAIL}>\`,
      to: email,
      subject: "Votre diagnostic entrepreneurial - Résultat",
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Étape 4 : Tester

```bash
npm run dev
```

Compléter le diagnostic et vérifier que l'email est bien reçu.

---

## 🎯 Recommandation

**Pour démarrer** : Utilise **Resend** (configuration actuelle)
- Gratuit jusqu'à 3000 emails/mois
- Aucune configuration SMTP complexe
- Fonctionne immédiatement

**Pour production avec volume élevé** : 
- Si < 3000 emails/mois → Resend gratuit
- Si > 3000 emails/mois → Évaluer Resend payant vs SMTP dédié

## 🔍 Dépannage SMTP

### Erreur "Authentication failed"
- Vérifier SMTP_USER et SMTP_PASSWORD
- Pour Gmail : utiliser un mot de passe d'application

### Emails non reçus
- Vérifier les spams
- Vérifier la configuration du serveur SMTP
- Tester avec un outil comme [mail-tester.com](https://www.mail-tester.com)

### Erreur de connexion
- Vérifier SMTP_HOST et SMTP_PORT
- Vérifier que le port n'est pas bloqué par le firewall
