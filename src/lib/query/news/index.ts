/**
 * News query layer: keys, filters, and useNewsQueries.
 */

export { newsKeys } from "./keys";
export { filterByCategory } from "./filters";
export {
  useFeaturedNews,
  useTopNews,
  useTrendingNews,
  useNewsByCategory,
  useSearchNews,
  useArticleBySlug,
} from "./useNewsQueries";
