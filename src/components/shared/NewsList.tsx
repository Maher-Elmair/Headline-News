import { ArticleCard } from '@/components/shared/ArticleCard';
import type { Article } from '@/types';

interface NewsListProps {
  articles: Article[];
  variant?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

export function NewsList({ articles, variant = 'grid', columns = 3 }: NewsListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No articles found.</p>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-8">
        {articles.map((article, index) => (
          <ArticleCard key={`${article.id}-${index}`} article={article} variant="horizontal" />
        ))}
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8`}>
      {articles.map((article, index) => (
        <ArticleCard key={`${article.id}-${index}`} article={article} />
      ))}
    </div>
  );
}
