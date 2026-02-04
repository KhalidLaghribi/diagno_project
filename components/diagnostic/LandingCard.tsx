"use client";

import Link from "next/link";
import Image from "next/image";

export default function LandingCard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 max-w-2xl w-full rounded-2xl shadow-card overflow-hidden">
        {/* Header avec logo */}
        <div className="bg-white border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black mb-2">
                Diagnostic entrepreneurial
              </h1>
              <div className="h-0.5 w-24 bg-gold mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              En 3 minutes, identifiez l'étape clé de votre parcours entrepreneurial 
              et vos priorités actuelles.
            </p>
            <p className="text-sm text-gray-600 italic">
              Un diagnostic personnalisé pour comprendre où vous en êtes et comment avancer.
            </p>
          </div>

          {/* Liste des bénéfices */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Ce que vous obtiendrez :
            </h3>
            <ul className="space-y-3">
              {[
                { icon: "⚡", text: "Simple & rapide", sub: "3 minutes seulement" },
                { icon: "📧", text: "Résultat par email", sub: "Analyse détaillée et personnalisée" },
                { icon: "🎯", text: "Sans jugement", sub: "Il n'y a ni bonne ni mauvaise réponse" },
                { icon: "📊", text: "Diagnostic précis", sub: "Identifie votre étape actuelle" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-xl mr-3 mt-0.5">{item.icon}</span>
                  <div>
                    <span className="text-sm font-medium text-gray-900">{item.text}</span>
                    <p className="text-xs text-gray-600 mt-0.5">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Note importante */}
          <div className="bg-gold-50 border border-gold-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-800">
              <span className="font-semibold text-gold-700">💡 Conseil :</span> Répondez 
              honnêtement. Une majorité de réponses dans une même catégorie indique votre 
              étape actuelle et vos besoins prioritaires.
            </p>
          </div>

          {/* Bouton CTA */}
          <Link href="/diagnostic">
            <button className="w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Commencer le diagnostic
              <span className="ml-2 text-gold">→</span>
            </button>
          </Link>

          {/* Footer info */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Gratuit • Sans engagement • Confidentiel
          </p>
        </div>
      </div>
    </div>
  );
}