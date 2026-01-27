"use client";

import { useState } from "react";
import { EmailFormData } from "@/types/diagnostic";

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
    // Allow numbers, +, spaces, hyphens, and parentheses
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 6;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError("");
    setPhoneError("");
    
    // Validate email
    if (!email) {
      setEmailError("L'email est obligatoire");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Veuillez entrer une adresse email valide");
      return;
    }
    
    // Validate phone if callback accepted
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
    <div className="bg-white border border-gray-300 max-w-md w-full p-8">
      <h2 className="text-xl font-bold mb-4">
        Recevoir mon diagnostic personnalisé
      </h2>

      <p className="text-sm text-gray-700 mb-3">
        Chaque étape est normale.
      </p>

      <p className="text-sm text-gray-700 mb-3">
        Le plus important n'est pas d'aller vite, mais d'être accompagné·e au bon moment.
      </p>

      <p className="text-sm text-gray-700 mb-3">
        L'objectif du diagnostic n'est pas de tout faire en même temps, mais de travailler d'abord sur ce qui te bloque aujourd'hui.
      </p>

      <p className="text-sm text-gray-700 mb-4">
        Nous te proposerons un échange pour approfondir :
      </p>

      <p className="text-sm text-gray-700 mb-1">
        Lors de cet échange, nous vous expliquerons :
      </p>

      <ul className="text-sm text-gray-700 mb-3 ml-4">
        <li>→ vos besoins actuels</li>
        <li>→ les risques à éviter à cette étape</li>
        <li>→ les opportunités à saisir</li>
        <li>→ et les pistes d'accompagnement possibles, si besoin.</li>
      </ul>

      <p className="text-xs italic text-gray-500 mb-6">
        Échange gratuit et sans engagement.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            placeholder="nom@email.com"
            className={`w-full border px-4 py-2 text-sm focus:outline-none focus:border-gray-400 ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-500">{emailError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptCallback}
              onChange={(e) => setAcceptCallback(e.target.checked)}
              className="mt-0.5 w-4 h-4 border border-gray-400 rounded-sm cursor-pointer accent-black"
            />
            <span className="text-sm text-gray-800">
              J'accepte d'être rappelé(e) pour approfondir mon diagnostic
            </span>
          </label>
        </div>

        {acceptCallback && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError("");
              }}
              placeholder="+33 6 00 00 00 00"
              className={`w-full border px-4 py-2 text-sm focus:outline-none focus:border-gray-400 ${
                phoneError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {phoneError && (
              <p className="mt-1 text-xs text-red-500">{phoneError}</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Envoi en cours..."
            : "Prendre rendez-vous et recevoir mon diagnostic"}
        </button>
      </form>
    </div>
  );
}
