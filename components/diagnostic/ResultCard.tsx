"use client";

import { DiagnosticResult } from "@/types/diagnostic";

interface ResultCardProps {
  result: DiagnosticResult;
  calendlyUrl: string;
}

export default function ResultCard({ result, calendlyUrl }: ResultCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-6">Votre diagnostic</h1>

        <div className="mb-6">
          <p className="text-base text-gray-800 leading-relaxed">
            {result.message}
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-4 mb-6">
          <p className="text-sm text-gray-700 mb-2">
            Répartition de vos réponses par étape :
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            {result.checkedCount.map((count, index) => (
              <li key={index}>
                Étape {index + 1} : {count} réponse{count > 1 ? "s" : ""}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Un email récapitulatif vous a été envoyé avec vos résultats détaillés.
        </p>

        <div className="space-y-3">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors text-center text-sm font-medium"
          >
            Prendre rendez-vous
          </a>
          
          <button
            onClick={() => window.location.href = '/'}
            className="block w-full bg-white border border-gray-300 text-black py-3 px-6 hover:bg-gray-50 transition-colors text-center text-sm font-medium"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}
