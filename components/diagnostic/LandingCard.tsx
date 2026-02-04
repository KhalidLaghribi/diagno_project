"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Mail,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const benefits = [
  { Icon: Zap, text: "Simple & rapide", sub: "3 minutes seulement" },
  { Icon: Mail, text: "Résultat par email", sub: "Analyse détaillée et personnalisée" },
  { Icon: Target, text: "Sans jugement", sub: "Il n'y a ni bonne ni mauvaise réponse" },
  { Icon: BarChart3, text: "Diagnostic précis", sub: "Identifie votre étape actuelle" },
];

export default function LandingCard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gold-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/hlp-logo-noir-header.png"
            alt="HLP"
            width={160}
            height={48}
            priority
          />
        </div>

        <div className="bg-white border border-gray-200 w-full rounded-2xl shadow-card overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-100 px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-black mb-2">
                  Diagnostic entrepreneurial
                </h1>
                <div className="h-0.5 w-24 bg-gold mx-auto rounded-full" />
                <p className="mt-3 text-sm text-gray-600">
                  Un diagnostic clair, rapide et utile.
                </p>
              </div>
            </div>
          </div>

        {/* Main */}
        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              En 3 minutes, identifiez l&apos;étape clé de votre parcours entrepreneurial
              et vos priorités actuelles.
            </p>
            <p className="text-sm text-gray-600 italic">
              Un diagnostic personnalisé pour comprendre où vous en êtes et comment avancer.
            </p>
          </div>

          {/* Benefits */}
          <div className="rounded-xl p-6 mb-8 border border-gold-200/60 bg-gradient-to-br from-gold-50/60 to-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Ce que vous obtiendrez :
            </h3>

            <ul className="space-y-3">
              {benefits.map(({ Icon, text, sub }, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gold-200/70 shadow-sm">
                    <Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
                  </span>

                  <div>
                    <span className="text-sm font-medium text-gray-900">{text}</span>
                    <p className="text-xs text-gray-600 mt-0.5">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Important note */}
          <div className="bg-gold-50 border border-gold-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-800 flex gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-gold-200/70">
                <Lightbulb className="h-4.5 w-4.5 text-gold-700" aria-hidden="true" />
              </span>

              <span>
                <span className="font-semibold text-gold-800">Conseil :</span>{" "}
                Répondez honnêtement. Une majorité de réponses dans une même catégorie indique
                votre étape actuelle et vos besoins prioritaires.
              </span>
            </p>
          </div>

          {/* CTA */}
          <Link href="/diagnostic" className="block">
            <button className="w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ring-1 ring-transparent focus:outline-none focus:ring-2 focus:ring-gold-400">
              Commencer le diagnostic
              <span className="ml-2 inline-flex items-center justify-center h-8 w-8 rounded-full bg-gold/15 ring-1 ring-gold/30">
                <ArrowRight className="h-4.5 w-4.5 text-gold" aria-hidden="true" />
              </span>
            </button>
          </Link>

          {/* Footer info */}
          <p className="text-xs text-gray-500 text-center mt-6">
            Gratuit • Sans engagement • Confidentiel
          </p>

          {/* Subtle footer accent */}
          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-gold-200/70 to-transparent" />
        </div>
      </div>
      </div>
    </div>
  );
}
