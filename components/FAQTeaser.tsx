"use client";

import { useState } from "react";

interface FAQ {
  q: string;
  a: string;
}

export default function FAQTeaser() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      q: "What documents do I need for a work visa?",
      a: "Typically: a valid passport, employment contract, employer sponsorship/NOC, educational credentials with equivalency, police clearance, and a medical fitness report. Requirements vary by country — I'll give you a tailored checklist after assessment.",
    },
    {
      q: "Can my spouse and children join me abroad?",
      a: "Yes, most work and PR routes allow dependant visas. You'll generally need to show relationship proof, financial capacity, and accommodation. I handle the full dependant application alongside yours.",
    },
    {
      q: "My spouse visa was refused — what now?",
      a: "You usually have a right of appeal or administrative review, often within 28 days. Don't re-apply immediately — refusals leave a footprint. Book a consultation so I can review the refusal notice.",
    },
    {
      q: "What's the difference between an appeal and a review?",
      a: "An appeal challenges the decision on law/facts before a tribunal; a review asks the same authority to reconsider. The right route depends on the country and visa type — getting this wrong costs time.",
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-navy grain py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="text-center">
          <div className="chip text-gold-soft">Common Questions</div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-white mt-3">
            Answers before you ask
          </h2>
          <div className="gold-line w-24 mx-auto mt-5" />
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all ${
                openIndex === i ? "bg-white/8" : ""
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left text-white"
              >
                <span className="font-medium">{faq.q}</span>
                <span
                  className={`text-gold-soft text-xl shrink-0 transition-transform ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-400 ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-5 text-white/70 text-sm">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 text-gold-soft font-semibold hover:gap-3 transition-all">
            See all 40+ FAQs
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
