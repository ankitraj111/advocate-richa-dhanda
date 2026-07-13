"use client";

import { useState } from "react";

interface FAQ {
  cat: string;
  q: string;
  a: string;
}

export default function FAQView() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "General",
    "Civil Law",
    "Criminal Law",
    "Family Law",
    "Property",
    "Consumer",
    "Immigration",
  ];

  const faqs: FAQ[] = [
    {
      cat: "General",
      q: "What are your consultation fees?",
      a: "Initial consultation fees vary based on the complexity of the matter. I provide a clear fee structure upfront with no hidden charges. Contact me for specific details about your case.",
    },
    {
      cat: "General",
      q: "Do you offer online consultations?",
      a: "Yes, I offer both in-person consultations at my office in Kurukshetra and online consultations via video call for your convenience.",
    },
    {
      cat: "General",
      q: "Which courts do you practice in?",
      a: "I practice primarily in Kurukshetra District Courts and appear before the Punjab & Haryana High Court for appellate matters.",
    },
    {
      cat: "Civil Law",
      q: "How long does a civil case typically take?",
      a: "Civil case duration varies depending on complexity, court schedules, and the nature of dispute. Simple matters may resolve in 6-12 months, while complex litigation can take 2-3 years or more.",
    },
    {
      cat: "Civil Law",
      q: "Can you help with property disputes?",
      a: "Yes, property disputes are a key area of my practice. This includes partition suits, title disputes, possession matters, and property documentation issues.",
    },
    {
      cat: "Criminal Law",
      q: "What should I do if I receive a police notice?",
      a: "Do not ignore it. Contact me immediately with the notice. I will guide you on the appropriate response and represent you if required. Early legal intervention is crucial.",
    },
    {
      cat: "Criminal Law",
      q: "Can you help with bail applications?",
      a: "Yes, I handle regular bail applications, anticipatory bail, and bail matters before appropriate courts with thorough preparation and strong legal arguments.",
    },
    {
      cat: "Family Law",
      q: "How is child custody decided in divorce cases?",
      a: "Child custody is decided based on the best interest of the child, considering factors like age, parent-child relationship, financial stability, and the child's preference (if of sufficient age).",
    },
    {
      cat: "Family Law",
      q: "What documents are needed for a divorce case?",
      a: "Typically: marriage certificate, identity proofs, address proof, income documents, evidence of matrimonial issues, and any relevant correspondence. I'll provide a detailed checklist during consultation.",
    },
    {
      cat: "Property",
      q: "How do I verify property title before purchase?",
      a: "I offer property title verification services including document scrutiny, encumbrance certificate check, and legal opinion on the title's marketability before purchase.",
    },
    {
      cat: "Property",
      q: "What is a partition suit?",
      a: "A partition suit is filed when co-owners of property want to divide their shares. The court determines each party's share and orders physical division or sale with proceeds distribution.",
    },
    {
      cat: "Consumer",
      q: "Where do I file a consumer complaint?",
      a: "Complaints are filed based on the value: District Consumer Forum (up to ₹1 crore), State Commission (₹1-10 crore), or National Commission (above ₹10 crore).",
    },
    {
      cat: "Consumer",
      q: "What is the time limit for filing consumer complaints?",
      a: "Generally, consumer complaints must be filed within 2 years from the date of deficiency in service or defect in goods. Some exceptions may apply.",
    },
    {
      cat: "Immigration",
      q: "Can you help with visa applications?",
      a: "Yes, I provide consultation and documentation support for various visa applications, including work visas, family visas, and immigration-related matters.",
    },
    {
      cat: "Immigration",
      q: "What if my visa application is refused?",
      a: "I can review the refusal notice, assess appeal prospects, and guide you on administrative reviews or fresh applications with stronger documentation.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQs = faqs.filter((faq) => {
    const catMatch = activeCat === "All" || faq.cat === activeCat;
    const searchMatch =
      !searchQuery ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <>
      <div className="bg-navy grain py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="chip text-gold-soft">Frequently Asked Questions</div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-white mt-3 max-w-3xl">
            Answers to the questions I hear most
          </h1>
          <div className="gold-line w-24 mt-6" />
          <p className="text-white/70 mt-5 max-w-2xl">
            Browse by category or search. These are general answers — for advice
            specific to your case, please book a consultation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="relative mb-8">
          <input
            className="w-full pl-12 pr-4 py-3 border border-[#d9d2bf] rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 focus:border-gold"
            placeholder="Search FAQs — e.g. 'bail', 'property', 'divorce'…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="absolute left-4 top-3.5 text-muted"
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

        <div className="flex flex-wrap gap-2 mb-8">
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

        {filteredFAQs.length === 0 ? (
          <p className="text-center text-muted py-12">
            No questions match your search.
          </p>
        ) : (
          <div className="space-y-3">
            {filteredFAQs.map((faq, i) => (
              <div
                key={i}
                className={`card overflow-hidden transition-all hover:translate-y-0 ${
                  openIndex === i ? "shadow-lg" : ""
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span>
                    <span className="chip text-maroon block mb-1">
                      {faq.cat}
                    </span>
                    <span className="font-semibold text-navy">{faq.q}</span>
                  </span>
                  <span
                    className={`text-gold text-2xl shrink-0 transition-transform ${
                      openIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ${
                    openIndex === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-muted text-sm">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 p-7 rounded-2xl bg-maroon text-white text-center">
          <h3 className="font-serif text-2xl font-semibold">
            Still have questions?
          </h3>
          <p className="text-white/80 mt-2">
            A consultation can provide clarity and direction for your legal matter.
          </p>
          <button className="btn-gold inline-flex mt-5 px-6 py-3 rounded-full font-semibold">
            Book a Consultation
          </button>
        </div>
      </div>
    </>
  );
}
