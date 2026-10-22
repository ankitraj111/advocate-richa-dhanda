"use client";

import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ArticlePageView from "@/components/views/ArticlePageView";
import { BLOG_POSTS, BlogPost } from "@/lib/blogData";

interface BlogArticlePageProps {
  params: {
    slug: string;
  };
}

export default function BlogArticlePage({ params }: BlogArticlePageProps) {
  const article = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!article) {
    notFound();
  }

  const handleNav = (view: string) => {
    if (view === "home") {
      window.location.href = "/";
    } else if (view === "book") {
      window.location.href = "/book";
    } else {
      window.location.href = `/?view=${view}`;
    }
  };

  const handleSelectRelated = (post: BlogPost) => {
    window.location.href = `/blog/${post.slug}`;
  };

  return (
    <>
      <Header activeView="blog" setActiveView={handleNav} />
      <main>
        <ArticlePageView
          article={article}
          onBack={() => {
            window.location.href = "/?view=blog";
          }}
          onSelectArticle={handleSelectRelated}
        />
      </main>
      <Footer setActiveView={handleNav} />
      <CookieBanner />
    </>
  );
}
