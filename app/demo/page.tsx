"use client";

import Header from "@/components/Header";
import EnhancedFAQ from "@/components/EnhancedFAQ";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function DemoPage() {
  const [activeView, setActiveView] = useState("home");

  return (
    <main>
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      {/* Hero Section with Enhanced Demo Message */}
      <div className="hero-bg grain py-20 text-center">
        <div className="max-w-4xl mx-auto px-5">
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/15 text-gold-soft text-sm font-semibold mb-6 animate-fade-in">
            ✨ Enhanced Components Demo
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-white animate-slide-up">
            Experience the Enhanced Website
          </h1>
          <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto animate-slide-up">
            This page showcases the new components with smooth animations, 
            accessibility features, and professional interactions.
          </p>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 animate-scale-in">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
              ⚡ Smooth Animations
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
              ♿ WCAG AA Compliant
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
              🎨 Professional UI
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm border border-white/20">
              📱 Mobile Responsive
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced FAQ Component */}
      <EnhancedFAQ />

      {/* Enhanced Contact Form Component */}
      <EnhancedContactForm />

      {/* Features Showcase */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-navy">
              What's New?
            </h2>
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              Every enhancement is designed to improve user experience and accessibility
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎭",
                title: "Smooth Animations",
                desc: "Fade-in, slide-up, and scale animations that respect motion preferences",
              },
              {
                icon: "⌨️",
                title: "Keyboard Navigation",
                desc: "Complete keyboard accessibility with visible focus states",
              },
              {
                icon: "🎨",
                title: "Enhanced Components",
                desc: "Built with shadcn/ui for consistency and maintainability",
              },
              {
                icon: "♿",
                title: "WCAG AA Compliant",
                desc: "4.5:1 contrast ratio, ARIA labels, and semantic HTML",
              },
              {
                icon: "📱",
                title: "Responsive Design",
                desc: "Optimized for all screen sizes from 375px to 1440px+",
              },
              {
                icon: "⚡",
                title: "Performance Optimized",
                desc: "GPU-accelerated animations with minimal bundle impact",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card p-8 text-center group hover:scale-105 transition-transform duration-300 cursor-default"
              >
                <div className="text-5xl mb-4 group-hover:animate-float">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Animation Demo */}
          <div className="mt-16 card p-10">
            <h3 className="font-serif text-2xl font-semibold text-navy text-center mb-8">
              Animation Classes Demo
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-navy to-navy/80 rounded-2xl mb-4 animate-fade-in flex items-center justify-center text-white font-bold">
                  Fade
                </div>
                <code className="text-xs text-muted">animate-fade-in</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gold to-gold-soft rounded-2xl mb-4 animate-slide-up flex items-center justify-center text-navy font-bold">
                  Slide
                </div>
                <code className="text-xs text-muted">animate-slide-up</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-maroon to-maroon/80 rounded-2xl mb-4 animate-scale-in flex items-center justify-center text-white font-bold">
                  Scale
                </div>
                <code className="text-xs text-muted">animate-scale-in</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cream-2 to-cream rounded-2xl mb-4 animate-float flex items-center justify-center text-navy font-bold border-2 border-navy/10">
                  Float
                </div>
                <code className="text-xs text-muted">animate-float</code>
              </div>
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="mt-12 bg-navy text-white rounded-3xl p-10">
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Ready to Implement?
            </h3>
            <p className="text-white/75 mb-6">
              Check out the integration guide to learn how to use these enhanced 
              components in your main pages.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/INTEGRATION_GUIDE.md"
                className="px-6 py-3 bg-gold hover:bg-gold/90 text-navy font-semibold rounded-full transition-all duration-250 hover:scale-105 cursor-pointer inline-block"
              >
                View Integration Guide
              </a>
              <a
                href="/ENHANCEMENTS.md"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-250 hover:scale-105 cursor-pointer inline-block border border-white/20"
              >
                View Enhancements Details
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer setActiveView={setActiveView} />
    </main>
  );
}
