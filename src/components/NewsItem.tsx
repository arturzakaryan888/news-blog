"use client";

import { DEFAULT_NEWS_IMAGE_URL } from "@/constants";
import Link from "next/link";

export interface NewsItemProps {
  id: number;
  title: string;
  description: string;
  urlToImage: string;
}

export default function NewsItem({
  id,
  title,
  description,
  urlToImage,
}: NewsItemProps) {
  return (
    <div
      key={id}
      className="bg-white dark:bg-gray-800 dark:text-white shadow-md border border-gray-200 dark:border-gray-700 rounded-lg max-w-sm mb-5"
    >
      <div className="h-[200px] w-100">
        <img
          className="w-full h-full object-cover"
          src={urlToImage ? urlToImage : DEFAULT_NEWS_IMAGE_URL}
          alt={title}
        />
      </div>
      <div className="p-5">
        <h5 className="text-gray-900 dark:text-gray-100 font-bold text-2xl tracking-tight mb-2">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
          {description}...
        </p>
        <Link
          href={`/article/${id}`}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
