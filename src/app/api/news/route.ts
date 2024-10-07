import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5077fdb55fbc45cebbc6ab3a36aec158`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data || data.status !== "ok") {
      return NextResponse.json(
        { error: "Failed to fetch news articles" },
        { status: response.status || 500 }
      );
    }

    const filteredArticles = data.articles.filter(
      (art: any) => art.source && art.source.id && art.source.id !== null
    );
    const updatedArticles = filteredArticles.map(
      (article: any, index: number) => ({
        ...article,
        id: index + 1,
      })
    );

    return NextResponse.json({ ...data, articles: updatedArticles });
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
