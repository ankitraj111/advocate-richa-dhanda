"use client";

import { useState, useMemo, useEffect } from "react";
import { BlogPost, BLOG_POSTS, CATEGORIES } from "@/lib/blogData";
import ArticlePageView from "./ArticlePageView";

export default function BlogView() {
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  // Check URL query parameters on mount to support direct article links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const articleSlug = params.get("article");
      if (articleSlug) {
        const found = BLOG_POSTS.find((p) => p.slug === articleSlug);
        if (found) setSelectedArticle(found);
      }
    }
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const catMatch = activeCat === "All" || post.cat === activeCat;
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.cat.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(query)));
      return catMatch && searchMatch;
    });
  }, [activeCat, searchQuery]);

  const handlePostClick = (post: BlogPost) => {
    setSelectedArticle(post);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const url = new URL(window.location.href);
      url.searchParams.set("view", "blog");
      url.searchParams.set("article", post.slug);
      window.history.pushState({}, "", url.toString());
    }
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const url = new URL(window.location.href);
      url.searchParams.delete("article");
      window.history.pushState({}, "", url.toString());
    }
  };

  // If an article is selected, render the dedicated FULL PAGE ARTICLE VIEW
  if (selectedArticle) {
    return (
      <ArticlePageView
        article={selectedArticle}
        onBack={handleBackToList}
        onSelectArticle={(post) => handlePostClick(post)}
      />
    );
  }

  // Otherwise, render the Blog Section Listing View
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900">
      {/* Header Banner */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-20 border-b border-gray-200 bg-white">
        <div className="w-full px-4 sm:px-5 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6 shadow-xs">
            Immigration Insights &amp; Policy Updates
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-[#0B1426] mb-4 sm:mb-6 leading-tight max-w-4xl mx-auto">
            Latest Insights On{" "}
            <span className="text-[#8B1538]">Global Immigration &amp; Visas</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated on Work Visas, Express Entry draws, UK Skilled Worker rules, Australia PR pathways, and legal visa refusal recovery strategies.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-10 sm:py-16 lg:py-20">
        <div className="w-full px-4 sm:px-5 lg:px-8 max-w-7xl mx-auto">
          {/* Categories & Search Bar (Exact Style from Image 1) */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:items-center justify-between mb-8 sm:mb-12">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                    activeCat === cat
                      ? "bg-[#8B1538] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80 shrink-0">
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30 focus:border-[#8B1538] shadow-xs"
                placeholder="Search articles, tags…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3.5 top-3 text-slate-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Empty Search Result */}
          {filteredPosts.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400 text-xl">
                🔍
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No Articles Found</h3>
              <p className="text-slate-500 text-sm mb-4">
                No articles match &quot;{searchQuery}&quot;. Try another keyword or select &quot;All&quot;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCat("All");
                }}
                className="bg-[#8B1538] text-white px-4 py-2 rounded-xl text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Articles Cards Grid */}
          {filteredPosts.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => handlePostClick(post)}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 group overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  <article>
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.img}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-3 py-1 rounded-full text-[11px] font-bold bg-[#8B1538] text-white shadow-md">
                        {post.cat}
                      </span>
                    </div>

                    <div className="p-5 sm:p-7">
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 mb-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#8B1538] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
                        {post.excerpt}
                      </p>

                      {/* Topic Tags Pills */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          {post.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-semibold text-[#8B1538] bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>

                  <div className="px-5 pb-5 sm:px-7 sm:pb-7 pt-1 border-t border-gray-100 mt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1538] group-hover:translate-x-1 transition-transform">
                      Read Full Article →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
