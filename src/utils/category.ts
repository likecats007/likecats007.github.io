export function normalizeCategory(category?: string | null) {
  return category?.trim() || '미분류';
}

export function categorySlug(category: string) {
  const slug = category
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || 'uncategorized';
}
