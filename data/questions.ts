import { Step } from "@/types/diagnostic";

export const STEPS: Step[] = [
  {
    id: 1,
    emoji: "🟢",
    title: "Concrétiser son projet de création d'entreprise",
    subtitle: "Coche ce qui te ressemble le plus :",
    questions: [
      {
        id: "1-1",
        text: "J'ai une idée ou une envie de projet, mais ça n'est pas encore très clair",
      },
      {
        id: "1-2",
        text: "Je ne sais pas si mon idée peut vraiment devenir un business",
      },
      {
        id: "1-3",
        text: "Je ne sais pas à qui vendre ni à quel prix",
      },
      {
        id: "1-4",
        text: "Je ne sais pas par où commencer pour créer mon entreprise",
      },
      {
        id: "1-5",
        text: "J'ai peur de faire des erreurs dès le départ",
      },
    ],
  },
  {
    id: 2,
    emoji: "🟡",
    title: "Développer sa visibilité et ses ventes",
    subtitle: "Coche ce qui te ressemble le plus :",
    questions: [
      {
        id: "2-1",
        text: "Mon entreprise existe, mais peu de gens la connaissent",
      },
      {
        id: "2-2",
        text: "J'ai du mal à expliquer clairement ce que je propose",
      },
      {
        id: "2-3",
        text: "Je poste sur les réseaux, mais sans vrais résultats",
      },
      {
        id: "2-4",
        text: "J'ai peu de clients réguliers",
      },
      {
        id: "2-5",
        text: "Je ne sais pas comment aller chercher des clients",
      },
    ],
  },
  {
    id: 3,
    emoji: "🟠",
    title: "Maîtriser sa gestion et retrouver de la sérénité",
    subtitle: "Coche ce qui te ressemble le plus :",
    questions: [
      {
        id: "3-1",
        text: "Je ne comprends pas vraiment mes chiffres (CA, charges, marge...)",
      },
      {
        id: "3-2",
        text: "Je ne sais pas si mon activité est rentable",
      },
      {
        id: "3-3",
        text: "J'ai du mal à me verser un salaire stable",
      },
      {
        id: "3-4",
        text: "Je me sens débordé·e par l'administratif",
      },
      {
        id: "3-5",
        text: "J'ai l'impression de travailler beaucoup sans gagner assez",
      },
    ],
  },
  {
    id: 4,
    emoji: "🔵",
    title: "Optimiser son organisation et sa stratégie",
    subtitle: "Coche ce qui te ressemble le plus :",
    questions: [
      {
        id: "4-1",
        text: "Mon entreprise tourne, mais je manque de vision long terme",
      },
      {
        id: "4-2",
        text: "Je passe trop de temps sur des tâches à faible valeur",
      },
      {
        id: "4-3",
        text: "Je ne sais pas quoi déléguer ni comment",
      },
      {
        id: "4-4",
        text: "J'aimerais développer de nouvelles offres mais je ne sais pas lesquelles",
      },
      {
        id: "4-5",
        text: "Je veux scaler mais je ne sais pas par où commencer",
      },
    ],
  },
  {
    id: 5,
    emoji: "🟣",
    title: "Structurer son expertise pour la transmettre",
    subtitle: "Coche ce qui te ressemble le plus :",
    questions: [
      {
        id: "5-1",
        text: "J'ai une expertise, mais je ne sais pas comment la valoriser",
      },
      {
        id: "5-2",
        text: "Je veux créer une formation ou un accompagnement, mais je ne sais pas comment structurer mon offre",
      },
      {
        id: "5-3",
        text: "J'ai peur de ne pas être légitime",
      },
      {
        id: "5-4",
        text: "Je ne sais pas quel prix mettre",
      },
      {
        id: "5-5",
        text: "Je veux transmettre sans m'épuiser",
      },
    ],
  },
  {
    id: 6,
    emoji: "🔴",
    title: "Adopter une posture de dirigeant·e stratège",
    subtitle: "Coche ce qui te ressemble le plus :",
    questions: [
      {
        id: "6-1",
        text: "Je suis trop dans l'opérationnel, pas assez dans la stratégie",
      },
      {
        id: "6-2",
        text: "Je ne prends pas assez de recul sur mon activité",
      },
      {
        id: "6-3",
        text: "J'ai du mal à prendre des décisions claires",
      },
      {
        id: "6-4",
        text: "Je ne sais pas où je veux aller vraiment",
      },
      {
        id: "6-5",
        text: "Mon entreprise ne reflète plus mes valeurs ou mes envies",
      },
    ],
  },
];

export const RESULT_MESSAGES: Record<number, string> = {
  1: 'Etape "Idée → Projet": Besoin de clarté, de structure et de sécurité pour se lancer sereinement.',
  2: 'Etape "Entreprise existante → Clients": Besoin de visibilité, d\'offres claires et d\'une méthode pour vendre.',
  3: 'Etape "Activité → Gestion maîtrisée": Besoin de comprendre les chiffres et de retrouver de la sérénité.',
  4: 'Etape "Entreprise fonctionnelle → Entreprise optimisée": Besoin d\'efficacité, d\'organisation et de décisions plus stratégiques.',
  5: 'Etape "Expertise → Transmission structurée": Besoin de cadre, de reconnaissance et d\'une offre rentable.',
  6: 'Etape "Dirigeant opérationnel → Dirigeant stratège": Besoin de hauteur, de clarté et d\'alignement.',
};
