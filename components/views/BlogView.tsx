"use client";

import { useState } from "react";
import Image from "next/image";

interface BlogPost {
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
  link: string;
}

export default function BlogView() {
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Work Visas",
    "Student Visas",
    "PR Updates",
    "Appeals",
    "Immigration Policy",
  ];

  const blogPosts: BlogPost[] = [
    {
      cat: "Immigration Policy",
      title: "Canada Immigration Updates 2025: What You Need to Know",
      excerpt:
        "Latest changes to Express Entry, PNP draws, and LMIA requirements for skilled workers moving to Canada.",
      date: "10 Jun 2025",
      img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/news.html",
    },
    {
      cat: "Work Visas",
      title: "UK Skilled Worker Visa: Complete Guide 2025",
      excerpt:
        "Understanding the points-based system, salary thresholds, sponsor license requirements, and application process for working in the UK.",
      date: "25 May 2025",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
      link: "https://www.gov.uk/skilled-worker-visa",
    },
    {
      cat: "Student Visas",
      title: "5 Critical Checks Before Applying for Your Study Permit",
      excerpt:
        "Financial proof, acceptance letters, SOPs, and common pitfalls that lead to study visa rejections worldwide.",
      date: "12 May 2025",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
    },
    {
      cat: "PR Updates",
      title: "Australia PR Pathway: Subclass 189 vs 190 vs 491",
      excerpt:
        "Comparing the three main permanent residency pathways for skilled migrants to Australia — eligibility, processing times, and points requirements.",
      date: "2 May 2025",
      img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80",
      link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
    },
    {
      cat: "Appeals",
      title: "Visa Refusal? Here's What You Need to Do Immediately",
      excerpt:
        "Understanding refusal letters, administrative reviews, and when to file a formal immigration appeal.",
      date: "18 Apr 2025",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
      link: "https://www.gov.uk/immigration-asylum-tribunal",
    },
    {
      cat: "Work Visas",
      title: "How to Secure Employer Sponsorship for International Relocation",
      excerpt:
        "A guide to finding sponsored roles, understanding labor market tests, and visa documentation requirements.",
      date: "1 Apr 2025",
      img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&q=80",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html",
    },
    {
      cat: "Immigration Policy",
      title: "New Zealand Accredited Employer Work Visa (AEWV) Guide",
      excerpt:
        "Everything you need to know about NZ's employer-led work visa system, median wage requirements, and sector agreements.",
      date: "15 Mar 2025",
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
      link: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/accredited-employer-work-visa",
    },
    {
      cat: "PR Updates",
      title: "Germany Opportunity Card: New Immigration Pathway for Skilled Workers",
      excerpt:
        "Germany's new Chancenkarte allows skilled workers to enter Germany to search for employment without a prior job offer.",
      date: "28 Feb 2025",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
      link: "https://www.make-it-in-germany.com/en/visa-residence/types/chance-card",
    },
    {
      cat: "Student Visas",
      title: "USA F-1 Student Visa: Step-by-Step Application Process",
      excerpt:
        "From SEVIS registration to embassy interview — complete guide for Indian students planning to study in the United States.",
      date: "10 Feb 2025",
      img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=600&q=80",
      link: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const catMatch = activeCat === "All" || post.cat === activeCat;
    const searchMatch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <>
      <div className="bg-navy grain py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="chip text-gold-soft">Insights & Updates</div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-white mt-3 max-w-3xl">
            Latest insights on global immigration & visa laws
          </h1>
          <div className="gold-line w-24 mt-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  activeCat === cat
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-navy border-navy/20 hover:border-navy/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative md:w-72">
            <input
              className="w-full pl-10 pr-4 py-2.5 border border-[#d9d2bf] rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 focus:border-gold"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 text-muted"
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
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-muted py-12">
            No articles match your search.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((post, i) => (
              <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card overflow-hidden group cursor-pointer block"
              >
                <article>
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={post.img}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="chip text-maroon">{post.cat}</span>
                      <span className="text-muted">{post.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-navy mt-3 leading-snug group-hover:text-maroon transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted mt-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-navy group-hover:text-maroon transition">
                      Read article
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
