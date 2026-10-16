"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero({ setActiveView }: { setActiveView?: (view: string) => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { number: "1000+", label: "Visas Assisted" },
    { number: "98%", label: "Success Rate" },
    { number: "15+", label: "Top Countries" },
  ];

  return (
    <div className="relative bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900 overflow-hidden flex flex-col justify-center border-b border-gray-200">
      <div className="relative z-10 w-full px-4 sm:px-5 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

          {/* Left Column (Content) — full width on mobile, 7 cols on lg */}
          <div className={`lg:col-span-7 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
            
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 mb-5 shadow-xs">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                Bar Council Registered Advocate &amp; Legal Specialist
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-5 text-slate-900">
              Your Trusted Lawyer For{" "}
              <span className="text-[#8B1538]">
                Global Visas &amp; Immigration
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-xl font-normal leading-relaxed max-w-2xl mb-7">
              Advocate Richa Dhanda provides honest, straightforward legal assistance for{" "}
              <strong>Work Visas</strong>, <strong>Student Visas</strong>,{" "}
              <strong>PR Applications</strong>, and <strong>Visa Refusal Appeals</strong>{" "}
              with 100% legal clarity.
            </p>

            {/* CTA Buttons — stacked on mobile, row on sm+ */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <a
                href="/book"
                className="bg-[#8B1538] hover:bg-[#70102d] text-white font-extrabold text-sm px-7 py-3.5 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book Legal Consultation
              </a>

              <button
                onClick={() => setActiveView && setActiveView("services")}
                className="bg-white hover:bg-gray-50 text-slate-900 border border-gray-300 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:border-slate-400"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Explore Legal Services
              </button>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-5 border-t border-gray-200 max-w-xs sm:max-w-lg">
              {stats.map((st, i) => (
                <div key={i}>
                  <div className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-[#8B1538]">{st.number}</div>
                  <div className="text-slate-600 text-[10px] sm:text-xs mt-1 font-semibold">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Checkmarks */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-800"><span className="text-amber-600">✓</span> Bar Council Enrolled</span>
              <span className="flex items-center gap-1.5 text-slate-800"><span className="text-amber-600">✓</span> LL.M. Degree Holder</span>
              <span className="flex items-center gap-1.5 text-slate-800"><span className="text-amber-600">✓</span> High Court Advocate</span>
            </div>

          </div>

          {/* Right Column (Advocate Photo Card) — full width on mobile, 5 cols on lg */}
          <div className={`lg:col-span-5 transition-opacity duration-700 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="relative mx-auto lg:ml-auto max-w-xs sm:max-w-sm md:max-w-md">
              <div className="relative bg-white border border-gray-200 rounded-3xl p-2 sm:p-3 shadow-xl overflow-hidden">
                <div className="relative h-[280px] xs:h-[320px] sm:h-[400px] lg:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/advocate-richa-new.jpg"
                    alt="Advocate Richa Dhanda — High Court & Immigration Lawyer"
                    fill
                    sizes="(max-width: 480px) 90vw, (max-width: 640px) 85vw, (max-width: 1024px) 45vw, 400px"
                    quality={80}
                    className="object-cover object-top brightness-[1.12] contrast-[1.06] saturate-[1.06] hover:scale-105 transition-all duration-700"
                    priority
                  />
                  
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Name Badge */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 bg-slate-900/95 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-slate-700 text-white shadow-lg">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif font-bold text-white text-sm sm:text-lg truncate">Advocate Richa Dhanda</h3>
                      <p className="text-amber-400 text-[10px] sm:text-xs font-semibold">High Court &amp; Immigration Lawyer</p>
                    </div>
                    <div className="bg-[#8B1538] text-white font-bold px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-center shrink-0 shadow-md">
                      <div className="text-sm font-black leading-none">5+</div>
                      <div className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">Yrs Exp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}