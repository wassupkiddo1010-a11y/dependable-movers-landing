export type CityEntry = {
  city: string;
  state: string;
  zip: string;
};

export function formatCityLabel(entry: CityEntry): string {
  return `${entry.city}, ${entry.state} ${entry.zip}`;
}

export function filterCities(
  data: CityEntry[],
  query: string,
  limit = 8
): CityEntry[] {
  const q = query.trim();
  if (!q || !data.length) return [];

  const isDigits = /^\d+$/.test(q);
  const minLen = isDigits ? 1 : 2;
  if (q.length < minLen) return [];

  const qLower = q.toLowerCase();
  const results: CityEntry[] = [];

  for (let i = 0; i < data.length && results.length < limit; i++) {
    const entry = data[i];
    const label = formatCityLabel(entry).toLowerCase();

    if (isDigits) {
      if (entry.zip.startsWith(q)) results.push(entry);
    } else if (
      label.includes(qLower) ||
      entry.city.toLowerCase().startsWith(qLower)
    ) {
      results.push(entry);
    }
  }

  return results;
}

let citiesCache: CityEntry[] | null = null;
let citiesPromise: Promise<CityEntry[]> | null = null;

export function loadCitiesData(): Promise<CityEntry[]> {
  if (citiesCache) return Promise.resolve(citiesCache);
  if (citiesPromise) return citiesPromise;

  citiesPromise = fetch("/data/cities-zips.json")
    .then((response) => response.json())
    .then((data: CityEntry[]) => {
      citiesCache = data;
      return data;
    })
    .catch(() => {
      citiesCache = [];
      return [];
    });

  return citiesPromise;
}
