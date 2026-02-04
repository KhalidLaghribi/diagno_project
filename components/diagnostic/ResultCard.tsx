"use client";

import { DiagnosticResult } from "@/types/diagnostic";
import { RESULT_MESSAGES } from "@/data/questions";

interface ResultCardProps {
  result: DiagnosticResult;
  calendlyUrl: string;
}

export default function ResultCard({ result, calendlyUrl }: ResultCardProps) {
  const stepsWithMessage = result.checkedCount
    .map((count, index) => ({ stepId: index + 1, count }))
    .filter(({ count }) => count >= 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-card max-w-4xl w-full overflow-hidden">
        {/* En-tête avec accent doré */}
        <div className="bg-gradient-to-r from-gold-50 via-white to-gold-50 border-b border-gray-200 px-8 sm:px-10 py-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-gold rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black">
                Votre diagnostic
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Analyse personnalisée de votre parcours entrepreneurial
              </p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="p-8 sm:p-10">
          {/* Résultat principal */}
          <div className="bg-gradient-to-br from-gold-50 to-gold-100 border-2 border-gold rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gold rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  Votre étape actuelle
                </h2>
                <p className="text-base text-gray-800 leading-relaxed">
                  {result.message}
                </p>
              </div>
            </div>
          </div>

          {/* Besoins détaillés */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-8 w-1 bg-gold rounded-full"></div>
              <h3 className="text-xl font-bold text-black">
                Vos besoins identifiés
              </h3>
            </div>

            {stepsWithMessage.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold">📊 Note :</span> Aucune étape n'atteint 
                  3 réponses ou plus. Le résultat principal ci-dessus est calculé sur la 
                  catégorie la plus représentée dans vos réponses.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  Les étapes où vous avez sélectionné au moins 3 affirmations :
                </p>
                
                {stepsWithMessage.map(({ stepId, count }) => (
                  <div
                    key={stepId}
                    className="bg-white border-2 border-gray-200 hover:border-gold rounded-xl p-5 sm:p-6 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold">
                          {stepId}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-900">
                            Étape {stepId}
                          </span>
                          <p className="text-xs text-gray-500">
                            {count} {count === 1 ? "réponse" : "réponses"}
                          </p>
                        </div>
                      </div>
                      
                      {/* Badge de progression */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < count ? "bg-gold" : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 leading-relaxed pl-13">
                      {RESULT_MESSAGES[stepId]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Séparateur */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>

          {/* Email de confirmation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Email envoyé avec succès !
              </p>
              <p className="text-sm text-blue-700">
                Un récapitulatif détaillé de vos résultats vous a été envoyé par email.
              </p>
            </div>
          </div>

          {/* Prochaines étapes */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h4 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Prochaines étapes recommandées
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gold font-bold">1.</span>
                <span>Consultez votre email pour le détail complet de votre diagnostic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold font-bold">2.</span>
                <span>Réservez un échange gratuit pour approfondir votre situation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold font-bold">3.</span>
                <span>Identifiez les actions prioritaires pour avancer sereinement</span>
              </li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="space-y-3">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block w-full rounded-xl bg-black text-white py-4 px-6 
                hover:bg-gray-900 transition-all duration-200 
                text-center text-base font-semibold shadow-lg hover:shadow-xl
                transform hover:-translate-y-0.5 active:translate-y-0
                flex items-center justify-center gap-2
              "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Prendre rendez-vous
              <span className="text-gold">→</span>
            </a>

            <button
              onClick={() => (window.location.href = "/")}
              className="
                block w-full rounded-xl bg-white border-2 border-gray-300 
                text-gray-900 py-4 px-6 hover:bg-gray-50 hover:border-gray-400
                transition-all duration-200 text-center text-base font-semibold
                flex items-center justify-center gap-2
              "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Retour à l'accueil
            </button>
          </div>

          {/* Note de confidentialité */}
          <p className="text-xs text-gray-500 text-center mt-6 italic">
            🔒 Vos données sont confidentielles et ne seront jamais partagées avec des tiers
          </p>
        </div>
      </div>
    </div>
  );
}