# 📧 Configuration Email - Mode Hybride

L'application détecte **automatiquement** quelle méthode d'envoi utiliser :

- ✅ **SMTP configuré** → Utilise SMTP
- ✅ **SMTP non configuré** → Utilise Resend (fallback)

## 🎯 Comment ça fonctionne ?

### Détection automatique

```typescript
function isSmtpConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD
  );
}
```

Si ces 3 variables sont définies → **SMTP**  
Sinon → **Resend**

### Logs dans la console

Lors de l'envoi, tu verras dans les logs :

```
📧 Méthode d'envoi: SMTP
✅ Email envoyé via SMTP: <message-id>
```

ou

```
📧 Méthode d'envoi: Resend
✅ Email envoyé via Resend: <message-id>
```

---

## 🚀 Configuration rapide

### Option 1 : Resend (Par défaut - Recommandé)

**Avantages** :
- ✅ Gratuit jusqu'à 3000 emails/mois
- ✅ Configuration en 2 minutes
- ✅ Aucune gestion de serveur

**Configuration** :

1. Créer un compte sur [resend.com](https://resend.com)
2. Obtenir la clé API
3. Dans `.env.local` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

**C'est tout !** L'application utilisera automatiquement Resend.

---

### Option 2 : SMTP Personnalisé

**Quand l'utiliser** :
- Le client a déjà un serveur SMTP
- Besoin d'utiliser un email d'entreprise spécifique
- Contraintes de sécurité/compliance

**Configuration** :

Dans `.env.local`, **ajouter** les variables SMTP :

#### Pour Gmail :

```env
# SMTP Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
SMTP_FROM_EMAIL=votre-email@gmail.com
SMTP_FROM_NAME=Diagnostic Entrepreneurial

# Calendly (toujours nécessaire)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

**⚠️ Important Gmail** :
- Utiliser un "mot de passe d'application" (pas le mot de passe normal)
- Activer la validation en deux étapes
- Générer un mot de passe d'application : [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

#### Pour Outlook/Office 365 :

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@outlook.com
SMTP_PASSWORD=votre-mot-de-passe
SMTP_FROM_EMAIL=votre-email@outlook.com
SMTP_FROM_NAME=Diagnostic Entrepreneurial
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
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
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

---

## 🔄 Basculer entre SMTP et Resend

### Passer de Resend à SMTP

1. Ajouter les variables SMTP dans `.env.local`
2. Redémarrer le serveur : `npm run dev`
3. ✅ L'application utilisera automatiquement SMTP

### Passer de SMTP à Resend

1. Commenter ou supprimer les variables SMTP dans `.env.local`
2. S'assurer que `RESEND_API_KEY` est définie
3. Redémarrer le serveur : `npm run dev`
4. ✅ L'application utilisera automatiquement Resend

---

## 🧪 Tester l'envoi d'email

1. Lancer l'application : `npm run dev`
2. Compléter le diagnostic
3. Soumettre le formulaire email
4. Vérifier les logs dans le terminal :

```bash
📧 Méthode d'envoi: SMTP
✅ Email envoyé via SMTP: <1234567890@smtp.gmail.com>
```

5. Vérifier la réception de l'email (et les spams)

---

## 📊 Comparaison

| Critère | Resend | SMTP Gmail | SMTP Personnalisé |
|---------|--------|------------|-------------------|
| **Prix** | Gratuit (3000/mois) | Gratuit | Variable |
| **Configuration** | ⭐⭐⭐⭐⭐ Simple | ⭐⭐⭐ Moyen | ⭐⭐ Complexe |
| **Deliverability** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐ Bon | ⭐⭐⭐ Variable |
| **Limite** | 100/jour gratuit | 500/jour | Selon serveur |
| **Maintenance** | Aucune | Faible | Moyenne |
| **Analytics** | ✅ Inclus | ❌ Non | ❌ Non |

---

## 🔧 Dépannage

### "SMTP Authentication failed"

**Cause** : Identifiants incorrects

**Solution** :
- Vérifier `SMTP_USER` et `SMTP_PASSWORD`
- Pour Gmail : utiliser un mot de passe d'application
- Vérifier que le compte n'a pas de restriction

### "Connection timeout"

**Cause** : Port bloqué ou mauvais host

**Solution** :
- Vérifier `SMTP_HOST` et `SMTP_PORT`
- Essayer le port 465 avec `SMTP_SECURE=true`
- Vérifier le firewall

### Email non reçu

**Cause** : Email dans les spams ou configuration incorrecte

**Solution** :
- Vérifier le dossier spam
- Vérifier `SMTP_FROM_EMAIL`
- Tester avec [mail-tester.com](https://www.mail-tester.com)

### "Resend API key invalid"

**Cause** : Clé API incorrecte ou manquante

**Solution** :
- Vérifier `RESEND_API_KEY` dans `.env.local`
- Régénérer une clé sur [resend.com](https://resend.com)

---

## 💡 Recommandations

### Pour le développement
✅ **Utiliser Resend** avec le domaine de test
- Configuration en 2 minutes
- Pas de risque de blocage
- Logs et analytics

### Pour la production (< 3000 emails/mois)
✅ **Utiliser Resend** avec votre domaine
- Gratuit
- Fiable
- Professionnel

### Pour la production (> 3000 emails/mois)
⚖️ **Évaluer** :
- Resend payant (20$/mois pour 50k emails)
- SMTP dédié (si infrastructure existante)
- SendGrid, Mailgun, etc.

---

## 📝 Variables d'environnement complètes

Copier dans `.env.local` :

```env
# ===== OPTION 1 : RESEND (Recommandé) =====
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=onboarding@resend.dev

# ===== OPTION 2 : SMTP (Si configuré, prioritaire sur Resend) =====
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=votre-email@gmail.com
# SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
# SMTP_FROM_EMAIL=votre-email@gmail.com
# SMTP_FROM_NAME=Diagnostic Entrepreneurial

# ===== CALENDLY (Obligatoire) =====
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

**Note** : Si SMTP est configuré, il sera utilisé en priorité. Sinon, Resend sera utilisé automatiquement.
