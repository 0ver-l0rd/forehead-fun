const imageCache = new Map<string, string>();

/**
 * Fetches a character image using category-specific APIs or Wikipedia.
 * - Anime: Uses Jikan (MyAnimeList) API for high-quality character art.
 * - Games/Celebrities/General: Uses Wikipedia with refined search terms.
 */
export async function fetchCharacterImage(name: string, genre?: string): Promise<string> {
  const cacheKey = `${genre || 'general'}:${name}`;
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)!;

  try {
    // 1. Logic for Anime (Jikan API)
    if (genre?.toLowerCase().includes('anime')) {
      const res = await fetch(`https://api.jikan.moe/v4/characters?q=${encodeURIComponent(name)}&limit=1`);
      const data = await res.json();
      const imageUrl = data.data?.[0]?.images?.jpg?.image_url;
      if (imageUrl && !imageUrl.includes('questionmark')) {
        imageCache.set(cacheKey, imageUrl);
        return imageUrl;
      }
    }

    // 2. Logic for Video Games (Refined Wikipedia Search)
    let searchName = name;
    if (genre?.toLowerCase().includes('game')) {
      searchName = `${name} (video game character)`;
    }

    // 3. Wikipedia API Search
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchName)}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=800&format=json&origin=*`;
    const res = await fetch(wikiUrl);
    const data = await res.json();
    const pages = data.query?.pages;

    if (pages) {
      const page = Object.values(pages)[0] as any;
      const thumb = page?.thumbnail?.source;
      if (thumb) {
        // Upgrade thumbnail size if it's a wiki thumb
        const highResThumb = thumb.replace(/\d+px-/, '800px-');
        imageCache.set(cacheKey, highResThumb);
        return highResThumb;
      }
    }

    // 4. Fallback search (if genre search failed, try plain name on Wikipedia)
    if (searchName !== name) {
      const plainWikiUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(name)}&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=800&format=json&origin=*`;
      const plainRes = await fetch(plainWikiUrl);
      const plainData = await plainRes.json();
      const plainPages = plainData.query?.pages;
      if (plainPages) {
        const page = Object.values(plainPages)[0] as any;
        const thumb = page?.thumbnail?.source;
        if (thumb) {
          const highResThumb = thumb.replace(/\d+px-/, '800px-');
          imageCache.set(cacheKey, highResThumb);
          return highResThumb;
        }
      }
    }
  } catch (error) {
    console.warn('Image fetch failed for:', name, error);
  }

  // Fallback: DiceBear avatar
  const seed = encodeURIComponent(name);
  const fallbackUrl = `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${seed}&backgroundColor=1a1a2e`;
  imageCache.set(cacheKey, fallbackUrl);
  return fallbackUrl;
}
