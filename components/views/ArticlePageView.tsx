"use client";

import { useState } from "react";
import { BlogPost, BLOG_POSTS } from "@/lib/blogData";

interface ArticlePageViewProps {
  article: BlogPost;
  onBack?: () => void;
  onSelectArticle?: (post: BlogPost) => void;
}

export default function ArticlePageView({
  article,
  onBack,
  onSelectArticle,
}: ArticlePageViewProps) {
  // First 2 FAQs open by default
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== article.slug
  ).slice(0, 3);

  const handleBack = () => {
    if (onBack) {
      onBack();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/?view=blog";
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF9F5] text-slate-900 pb-20">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#8B1538] hover:text-[#70102d] transition cursor-pointer bg-amber-50 hover:bg-amber-100/80 px-3.5 py-1.5 rounded-full border border-amber-200/80"
          >
            <span>←</span>
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <span>🔗</span>
              <span>Share</span>
            </button>
            <a
              href="/book"
              className="inline-flex items-center gap-1.5 bg-[#8B1538] hover:bg-[#70102d] text-white text-xs font-bold px-4 py-1.5 rounded-lg transition shadow-xs"
            >
              Consult Lawyer →
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Breadcrumb Trail */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <button
            onClick={handleBack}
            className="hover:text-[#8B1538] transition cursor-pointer"
          >
            Blog
          </button>
          <span>/</span>
          <span className="text-slate-600">{article.cat}</span>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-xs">{article.title}</span>
        </div>

        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#8B1538] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
            {article.cat}
          </span>
          <span className="text-xs text-slate-500 font-medium">{article.date}</span>
          <span className="text-xs text-slate-500 font-medium">• {article.readTime}</span>
          <span className="text-xs text-amber-900 bg-amber-100/90 border border-amber-200 px-2.5 py-0.5 rounded-md font-semibold">
            Verified Legal Guidance
          </span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1426] leading-tight mb-5">
          {article.title}
        </h1>

        {/* Subtitle / Excerpt */}
        <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 font-medium">
          {article.subtitle}
        </p>

        {/* Topic Tags Header */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-gray-200/80">
            <span className="text-xs font-bold text-slate-500">Tags:</span>
            {article.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="bg-white border border-gray-300 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs hover:border-[#8B1538] hover:text-[#8B1538] transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Byline */}
        <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-[#8B1538] text-white flex items-center justify-center font-serif font-black text-base shadow-sm shrink-0">
            RD
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Advocate Dr. Richa Dhanda</h2>
            <p className="text-xs text-slate-500">
              Punjab &amp; Haryana High Court · International Immigration Counsel
            </p>
          </div>
        </div>

        {/* Hero Featured Image - Full Fit (No Cropping / No Distortion) */}
        <div className="relative w-full rounded-3xl overflow-hidden mb-10 bg-slate-100 border border-gray-200/90 shadow-md flex items-center justify-center p-2 sm:p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.img}
            alt={article.title}
            className="w-auto max-w-full max-h-[580px] sm:max-h-[680px] object-contain rounded-2xl shadow-sm"
          />
        </div>

        {/* Key Legal Takeaways Box */}
        {article.takeaways && article.takeaways.length > 0 && (
          <div className="bg-amber-50/80 border-l-4 border-[#8B1538] rounded-r-2xl p-6 sm:p-7 mb-10 shadow-xs">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#0B1426] mb-3.5 flex items-center gap-2">
              <span>📌</span> Key Legal Takeaways &amp; Important Points
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-800">
              {article.takeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#8B1538] font-bold shrink-0 mt-1">✓</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Sections */}
        <div className="space-y-10 text-slate-800 text-base sm:text-lg leading-relaxed">
          {article.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.heading && (
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1426] pt-4">
                  {sec.heading}
                </h2>
              )}

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed text-slate-700 whitespace-pre-line">
                  {p}
                </p>
              ))}

              {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                <ul className="space-y-2.5 pl-2 sm:pl-4 my-4">
                  {sec.bulletPoints.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <span className="text-[#8B1538] font-bold shrink-0 mt-1">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.warningBox && (
                <div className="bg-red-50 border border-red-300 rounded-2xl p-5 my-6 flex items-start gap-3.5 text-red-950">
                  <span className="text-2xl shrink-0">⚠️</span>
                  <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                    {sec.warningBox}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* External Link Button (if applicable) */}
        {article.link && (
          <div className="my-10 text-center">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1648c0] text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-105"
            >
              Read Full Official Feature on External Portal ↗
            </a>
          </div>
        )}

        {/* Topic Tags Footer */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Filed under Keywords &amp; Topics:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {article.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="bg-white border border-gray-300 text-[#8B1538] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-2xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* FREQUENTLY ASKED QUESTIONS (FAQ) SECTION                 */}
        {/* ======================================================== */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t border-gray-200">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                ❓ Frequently Asked Questions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0B1426] mb-2">
                Frequently Asked Legal Questions (FAQ)
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Direct answers by Advocate Dr. Richa Dhanda to common legal and practical questions regarding {article.cat}.
              </p>
            </div>

            <div className="space-y-4">
              {article.faqs.map((faq, fIdx) => {
                const isOpen = !!openFaqs[fIdx];
                return (
                  <div
                    key={fIdx}
                    className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-[#8B1538]/40"
                  >
                    <button
                      onClick={() => toggleFaq(fIdx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="font-serif text-base sm:text-lg font-bold text-[#0B1426] hover:text-[#8B1538] transition-colors leading-snug">
                        {faq.q}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold transition-transform duration-200 ${
                          isOpen
                            ? "bg-[#8B1538] text-white rotate-180"
                            : "bg-gray-100 text-slate-600"
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 mt-1">
                        <p className="pt-3">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick Consultation Prompt Box below FAQs */}
            <div className="mt-6 p-4 sm:p-5 bg-amber-50/70 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Have a specific question about your profile or refusal?
                </p>
                <p className="text-xs text-slate-600">
                  Advocate Dr. Richa Dhanda provides direct, confidential 1-on-1 case evaluations.
                </p>
              </div>
              <a
                href="/book"
                className="bg-[#8B1538] hover:bg-[#70102d] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-xs whitespace-nowrap"
              >
                Ask the Lawyer →
              </a>
            </div>
          </section>
        )}

        {/* Consultation Call To Action Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#140800] via-[#8B1538] to-[#140800] text-white rounded-3xl p-8 sm:p-10 shadow-xl text-center">
          <span className="inline-block text-amber-300 text-xs font-bold uppercase tracking-widest mb-2">
            Personal Case Evaluation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold mb-3">
            Have Questions About Your Overseas Work Visa?
          </h2>
          <p className="text-amber-100/90 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Protect your future and savings. Get your foreign job offer, LMIA, or employment contract verified by Advocate Dr. Richa Dhanda.
          </p>
          <a
            href="/book"
            className="inline-flex items-center gap-2 bg-white text-[#8B1538] hover:bg-amber-50 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition"
          >
            Schedule Consultation Now →
          </a>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="font-serif text-2xl font-bold text-[#0B1426] mb-6">
              More Recommended Articles
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => {
                    if (onSelectArticle) {
                      onSelectArticle(post);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      window.location.href = `/blog/${post.slug}`;
                    }
                  }}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8B1538] text-white">
                        {post.cat}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-[11px] text-slate-400 font-medium mb-1">
                        {post.date} • {post.readTime}
                      </p>
                      <h3 className="font-serif text-sm font-bold text-slate-900 group-hover:text-[#8B1538] transition line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <span className="text-xs font-bold text-[#8B1538]">
                      Read Article →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#8B1538] bg-white border border-gray-300 hover:border-[#8B1538] px-6 py-3 rounded-full transition shadow-xs cursor-pointer"
          >
            <span>←</span>
            <span>Return to All Blog Articles</span>
          </button>
        </div>
      </div>
    </article>
  );
}
