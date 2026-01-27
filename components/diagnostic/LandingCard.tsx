"use client";

import Link from "next/link";

export default function LandingCard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-4">
          Diagnostic entrepreneurial express
        </h1>
        
        <p className="text-sm text-gray-700 mb-6">
          En 3 minutes, identifie l'étape clé de ton parcours entrepreneurial et tes priorités actuelles.
        </p>

        <ul className="space-y-2 mb-8">
          <li className="flex items-start text-sm">
            <span className="mr-2">•</span>
            <span>Simple & rapide</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="mr-2">•</span>
            <span>Résultat par email</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="mr-2">•</span>
            <span>Réponse honnêtement.</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="mr-2">•</span>
            <span>Il n'y a ni bonne ni mauvaise réponse.</span>
          </li>
          <li className="flex items-start text-sm">
            <span className="mr-2">•</span>
            <span>Une majorité de réponses dans une même catégorie indique ton étape actuelle.</span>
          </li>
        </ul>

        <Link href="/diagnostic">
          <button className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors flex items-center justify-center text-sm font-medium">
            Commencer le diagnostic
            <span className="ml-2">›</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
