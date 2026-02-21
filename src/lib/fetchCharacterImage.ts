const imageCache = new Map<string, string | null>();

export async function fetchCharacterImage(name: string): Promise<string | null> {
  if (imageCache.has(name)) return imageCache.get(name)!;

  try {
    const searchName = name.replace(/ /g, '_');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&piphumbsize=400&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) { imageCache.set(name, null); return null; }

    const page = Object.values(pages)[0] as any;
    const thumb = page?.thumbnail?.source || null;
    imageCache.set(name, thumb);
    return thumb;
  } catch {
    imageCache.set(name, null);
    return null;
  }
}
