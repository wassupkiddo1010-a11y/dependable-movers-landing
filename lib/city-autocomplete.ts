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

/**
 * ZIP data is split into chunks (data/zips/zip-{0-9}.json by first zip digit,
 * data/zips/city-{a-z}.json by first city letter) so the browser only fetches
 * the slice relevant to what the user is typing.
 */
function chunkKeyForQuery(query: string): string | null {
  const q = query.trim();
  if (!q) return null;
  const first = q[0].toLowerCase();
  if (first >= "0" && first <= "9") return `zip-${first}`;
  if (first >= "a" && first <= "z") return `city-${first}`;
  return null;
}

const chunkCache = new Map<string, CityEntry[]>();
const chunkPromises = new Map<string, Promise<CityEntry[]>>();

export function loadCitiesForQuery(query: string): Promise<CityEntry[]> {
  const key = chunkKeyForQuery(query);
  if (!key) return Promise.resolve([]);

  const cached = chunkCache.get(key);
  if (cached) return Promise.resolve(cached);

  const pending = chunkPromises.get(key);
  if (pending) return pending;

  const promise = fetch(`/data/zips/${key}.json`)
    .then((response) => response.json())
    .then((data: CityEntry[]) => {
      chunkCache.set(key, data);
      chunkPromises.delete(key);
      return data;
    })
    .catch(() => {
      chunkPromises.delete(key);
      return [];
    });

  chunkPromises.set(key, promise);
  return promise;
}

/**
 * True when the value exactly matches a "City, ST 12345" label from the
 * dataset. Only cached chunks are checked, but any value produced by picking
 * a suggestion (or typing/pasting, which triggers a chunk load) will have its
 * chunk cached by the time validation runs.
 */
export function isKnownCityLabel(value: string): boolean {
  const label = value.trim().toLowerCase();
  if (!label) return false;
  for (const entries of chunkCache.values()) {
    for (const entry of entries) {
      if (formatCityLabel(entry).toLowerCase() === label) return true;
    }
  }
  return false;
}
