import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const response = await axios.get('http://localhost:3000/api/news');
    const data = response.data;

    const article = data.articles.find(
      (article: any) => article.id && article.id === parseInt(id)
    );

    if (!data?.articles || data.articles.length <=0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
