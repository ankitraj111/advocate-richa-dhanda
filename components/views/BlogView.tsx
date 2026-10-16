"use client";

export default function BlogView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900">

      {/* Header Banner */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-24 border-b border-gray-200">
        <div className="w-full px-4 sm:px-5 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 shadow-xs">
            Immigration Insights &amp; Policy Updates
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0B1426] mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto">
            Latest Insights On{" "}
            <span className="text-[#8B1538]">Global Immigration &amp; Visas</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Expert legal articles on Work Visas, Student Permits, PR pathways, and immigration law — written by Advocate Richa Dhanda.
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 sm:py-28 lg:py-36">
        <div className="w-full px-4 sm:px-5 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-6 text-4xl shadow-sm">
            📝
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1426] mb-3">
            Blog Articles Coming Soon
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            We are working on in-depth immigration guides and legal insights. Check back soon for expert articles from Advocate Richa Dhanda.
          </p>
          <a
            href="/book"
            className="bg-[#8B1538] hover:bg-[#70102d] text-white px-7 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:scale-105 inline-flex items-center gap-2"
          >
            Book a Free Consultation →
          </a>
        </div>
      </section>
    </div>
  );
}
