import NotFound from "@/components/NotFound";
import { DEFAULT_NEWS_IMAGE_URL } from "@/constants";
import Image from "next/image";

export async function generateStaticParams() {
  const response = await fetch("http://localhost:3000/api/news");
  const data = await response.json();

  if (!data.articles || !Array.isArray(data.articles)) {
    throw new Error("Invalid articles data structure");
  }

  return data.articles.map((article: any) => ({
    id: article.id.toString(),
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(`http://localhost:3000/api/news/${params.id}`);

  if (!response.ok) {
    console.error("Failed to fetch article:", response.statusText);
    return <NotFound />;
  }

  const article = await response.json();
  if (!article || !article.title) {
    return <NotFound />;
  }

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {article.title}
        </h1>

        <div className="flex justify-center mb-8">
          <Image
            src={
              article.urlToImage ? article.urlToImage : DEFAULT_NEWS_IMAGE_URL
            }
            alt={article.title}
            width={960}
            height={540}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            {article.description}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            By: {article.author}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Published at: {new Date(article.publishedAt).toLocaleString()}
          </p>

          {article.content && (
            <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
              {article.content}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
