# Diagnostic Entrepreneurial Express

Application Next.js 14+ pour réaliser un diagnostic entrepreneurial en 6 étapes.

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**

```bash
npm install
```

2. **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine du projet :

```env
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=onboarding@resend.dev
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
```

**Important :** 
- Obtenir une clé API Resend sur [resend.com](https://resend.com)
- Remplacer `FROM_EMAIL` par votre email vérifié sur Resend
- Remplacer `NEXT_PUBLIC_CALENDLY_URL` par votre lien Calendly

3. **Lancer le serveur de développement**

```bash
npm run dev
```

4. **Ouvrir l'application**

Naviguer vers [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
diagnostic-entreprise/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Page d'accueil
│   ├── globals.css             # Styles globaux
│   ├── diagnostic/
│   │   ├── page.tsx            # Flow du diagnostic (stepper)
│   │   └── result/
│   │       └── page.tsx        # Page de résultat
│   └── api/
│       └── send-result/
│           └── route.ts        # API pour envoi email
├── components/
│   └── diagnostic/
│       ├── LandingCard.tsx     # Carte d'accueil
│       ├── Stepper.tsx         # Indicateur de progression
│       ├── QuestionStep.tsx    # Étape avec questions
│       ├── EmailStep.tsx       # Formulaire email
│       └── ResultCard.tsx      # Affichage résultat
├── lib/
│   └── diagnostic.ts           # Logique métier
├── data/
│   └── questions.ts            # Questions des 6 étapes
├── types/
│   └── diagnostic.ts           # Types TypeScript
└── package.json
```

## 🎯 Fonctionnalités

### Les 6 étapes du diagnostic

1. **🟢 Naissance du projet** - Concrétiser son projet de création d'entreprise
2. **🟡 Lancement et visibilité** - Développer sa visibilité et ses ventes
3. **🟠 Gestion et stabilité** - Maîtriser sa gestion et retrouver de la sérénité
4. **🔵 Optimisation** - Optimiser son organisation et sa stratégie
5. **🟣 Transmission** - Structurer son expertise pour la transmettre
6. **🔴 Posture dirigeant** - Adopter une posture de dirigeant·e stratège

### Logique de calcul

- Chaque étape contient 5 questions avec checkboxes
- Le système compte le nombre de cases cochées par étape
- L'étape avec le **plus de cases cochées** est le résultat final
- En cas d'égalité, on choisit l'étape la plus basse (la plus en amont)

### Flow utilisateur

1. Page d'accueil avec présentation
2. Parcours multi-étapes (6 étapes de questions)
3. Formulaire email avec opt-in pour rappel
4. Calcul automatique du résultat
5. Affichage du diagnostic
6. Envoi d'email avec le résultat
7. Redirection automatique vers Calendly (5 secondes)

## 🛠️ Technologies utilisées

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Resend** (envoi d'emails)

## 📝 Architecture

### Composants Server vs Client

- **Server Components** : `layout.tsx`, `page.tsx` (landing)
- **Client Components** : Tous les composants dans `/components/diagnostic/`

### Séparation des responsabilités

- **Logique métier** : `/lib/diagnostic.ts`
- **Données** : `/data/questions.ts`
- **Types** : `/types/diagnostic.ts`
- **UI** : `/components/diagnostic/*`
- **Pages** : `/app/*`
- **API** : `/app/api/*`

## 🎨 Design

Le design est **pixel-perfect** selon les maquettes fournies :
- Couleurs : Noir (#000), Blanc (#FFF), Gris (#F5F5F5)
- Typographie : System fonts
- Espacements et alignements respectés
- Animations et transitions subtiles

## 📧 Configuration Email (Mode Hybride)

L'application supporte **deux méthodes d'envoi** avec détection automatique :

### Option 1 : Resend (Recommandé - Par défaut)
1. Créer un compte sur [resend.com](https://resend.com)
2. Générer une clé API
3. Ajouter dans `.env.local` :
```env
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=onboarding@resend.dev
```

**Avantages** : Gratuit (3000 emails/mois), simple, fiable

### Option 2 : SMTP Personnalisé
Si le client a son propre serveur SMTP (Gmail, Outlook, serveur dédié) :

1. Ajouter dans `.env.local` :
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email@gmail.com
SMTP_PASSWORD=mot-de-passe-app
SMTP_FROM_EMAIL=email@gmail.com
```

2. L'application utilisera automatiquement SMTP au lieu de Resend

**📖 Guide complet** : Voir `EMAIL_CONFIG.md` pour la configuration détaillée

## 🚀 Déploiement

### Vercel (recommandé)

```bash
npm run build
```

Puis déployer sur Vercel avec les variables d'environnement configurées.

### Autres plateformes

L'application peut être déployée sur n'importe quelle plateforme supportant Next.js 14+ :
- Netlify
- AWS Amplify
- Railway
- Render

## 📄 License

Propriétaire - Tous droits réservés
