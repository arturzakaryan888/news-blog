"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DEFAULT_NEWS_IMAGE_URL } from "@/constants";
import { Article } from "@/types";
import NewsItem from "@/components/NewsItem";
import Loader from "@/components/Loader";
import NotFound from "@/components/NotFound";
import axios from "axios";




export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await axios.get("/api/news");
        setArticles(data.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (articles.length <= 0 && !loading) {
    return <NotFound />;
  }

  const mainArticle = articles[0];
  const otherArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="container mx-auto p-4">
      {mainArticle && (
        <div className="bg-white dark:bg-gray-800 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg mb-8 p-8">
          <div className="flex flex-col lg:flex-row items-center">
            <img
              className="rounded-lg w-full lg:w-1/2 mb-4 lg:mb-0"
              src={
                mainArticle.urlToImage
                  ? mainArticle.urlToImage
                  : DEFAULT_NEWS_IMAGE_URL
              }
              alt={mainArticle.title}
            />
            <div className="lg:ml-8 w-full lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {mainArticle.title}
              </h1>
              <p className="text-lg font-normal text-gray-700 dark:text-gray-300 mb-4">
                {mainArticle.description}
              </p>
              <p className="font-medium text-gray-600 dark:text-gray-400">
                Published at:{" "}
                {new Date(mainArticle.publishedAt).toLocaleString()}
              </p>
              <Link
                href={`/article/${mainArticle.source.id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 mt-4 inline-block"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherArticles.map((article, index) => (
          <NewsItem
            key={index}
            id={article.id}
            title={article.title}
            description={article.description}
            urlToImage={article.urlToImage}
          />
        ))}
      </div>
    </div>
  );
}
