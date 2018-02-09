export class ArticleListConfig {
  type = 'feed';
  filters: {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?: number,
    offset?: number
  } = {};
}
