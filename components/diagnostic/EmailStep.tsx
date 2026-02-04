"use client";

import { useState } from "react";
import { EmailFormData } from "@/types/diagnostic";
import { Phone, Sparkles } from "lucide-react";

interface EmailStepProps {
  onSubmit: (data: EmailFormData) => void;
  isLoading: boolean;
}

export default function EmailStep({ onSubmit, isLoading }: EmailStepProps) {
  const [email, setEmail] = useState("");
  const [acceptCallback, setAcceptCallback] = useState(false);
  const [phone, setPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPhoneError("");

    if (!email) {
      setEmailError("L'email est obligatoire");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide");
      return;
    }

    if (acceptCallback && !phone.trim()) {
      setPhoneError("Veuillez entrer votre numéro de téléphone");
      return;
    }

    if (acceptCallback && phone && !validatePhone(phone)) {
      setPhoneError("Veuillez entrer un numéro de téléphone valide");
      return;
    }

    onSubmit({
      email,
      acceptCallback,
      phone: acceptCallback ? phone : undefined,
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-card w-full overflow-hidden">
      {/* En-tête avec accent doré */}
      <div className="bg-gradient-to-r from-gold-50 to-white border-b border-gold-200 px-8 py-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          <h2 className="text-2xl font-bold text-black">
            Dernière étape !
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Recevez votre diagnostic personnalisé par email
        </p>
      </div>

      {/* Contenu principal */}
      <div className="p-8">
        {/* Message informatif */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-black">Chaque étape est normale.</span>
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            Le plus important n'est pas d'aller vite, mais d'être accompagné·e au bon moment.
          </p>

          <p className="text-sm text-gray-700 leading-relaxed">
            L'objectif du diagnostic n'est pas de tout faire en même temps, mais de travailler 
            d'abord sur ce qui vous bloque aujourd'hui.
          </p>
        </div>

        {/* Proposition d'échange */}
        <div className="border-l-4 border-gold bg-gold-50 rounded-r-xl p-5 mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3">
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-700" aria-hidden="true" />
              <span>Nous vous proposerons un échange pour approfondir</span>
            </span>
          </p>

          <p className="text-sm text-gray-700 mb-3">
            Lors de cet échange, nous vous expliquerons :
          </p>

          <ul className="space-y-2 text-sm text-gray-700 mb-3">
            <li className="flex items-start">
              <span className="text-gold mr-2">→</span>
              <span>Vos besoins actuels</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">→</span>
              <span>Les risques à éviter à cette étape</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">→</span>
              <span>Les opportunités à saisir</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold mr-2">→</span>
              <span>Les pistes d'accompagnement possibles, si besoin</span>
            </li>
          </ul>

          <p className="text-xs italic text-gray-600 bg-white px-3 py-2 rounded-lg inline-block">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-700" aria-hidden="true" />
              <span>Échange gratuit et sans engagement</span>
            </span>
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Champ Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Adresse email <span className="text-gold">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="nom@email.com"
                className={`
                  w-full rounded-xl border-2 bg-white pl-12 pr-4 py-3 text-sm text-gray-900 
                  placeholder:text-gray-400 transition-all duration-200
                  focus:outline-none focus:ring-4 focus:ring-gold-100
                  ${emailError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gold"}
                `}
              />
            </div>
            {emailError && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {emailError}
              </p>
            )}
          </div>

          {/* Checkbox rappel */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={acceptCallback}
                  onChange={(e) => setAcceptCallback(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`
                    w-5 h-5 rounded-md border-2 flex items-center justify-center
                    transition-all duration-200
                    ${
                      acceptCallback
                        ? "bg-gold border-gold"
                        : "bg-white border-gray-300 group-hover:border-gray-400"
                    }
                  `}
                >
                  {acceptCallback && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-800 leading-relaxed">
                J'accepte d'être rappelé(e) pour approfondir mon diagnostic 
                et découvrir comment avancer concrètement
              </span>
            </label>
          </div>

          {/* Champ Téléphone (conditionnel) */}
          {acceptCallback && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Numéro de téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError("");
                  }}
                  placeholder="+33 6 00 00 00 00"
                  className={`
                    w-full rounded-xl border-2 bg-white pl-12 pr-4 py-3 text-sm text-gray-900 
                    placeholder:text-gray-400 transition-all duration-200
                    focus:outline-none focus:ring-4 focus:ring-gold-100
                    ${phoneError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-gold"}
                  `}
                />
              </div>
              {phoneError && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {phoneError}
                </p>
              )}
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full rounded-xl bg-black text-white py-4 px-6 
              hover:bg-gray-900 transition-all duration-200 
              text-sm font-semibold shadow-lg hover:shadow-xl
              disabled:opacity-50 disabled:cursor-not-allowed
              transform hover:-translate-y-0.5 active:translate-y-0
              flex items-center justify-center gap-2
            "
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                Recevoir mon diagnostic personnalisé
                <span className="text-gold">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}