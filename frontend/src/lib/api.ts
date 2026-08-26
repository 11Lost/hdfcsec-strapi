export const STRAPI_BASE = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://hdfc-securities-api.idealake.com';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.hdfcsec.com';

export async function fetchStrapi<T>(endpoint: string): Promise<T> {
  console.log(`${STRAPI_BASE}${endpoint}`)
  const res = await fetch(`${STRAPI_BASE}${endpoint}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchHomePage() {
  return fetchStrapi<{ data: Record<string, unknown> }>('/api/home-page?pLevel=10');
}

export async function fetchHeader() {
  return fetchStrapi<{ data: Record<string, unknown> }>('/api/header?pLevel=10');
}

export async function fetchFooter() {
  return fetchStrapi<{ data: Record<string, unknown> }>('/api/footer?pLevel=10');
}

export async function fetchStockDetails() {
  return fetchStrapi<{ data: Record<string, unknown> }>('/api/stocks/auzo3jw5o3prwh9h3o9x60xb?pLevel=10');
}

export async function fetchNSEIndices() {
  try {
    const res = await fetch('https://www.nseindia.com/api/allIndices', {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    return { data: [] };
  }
}

export async function fetchGainers() {
  const body = new URLSearchParams({
    Method: 'BI_GAINLOSER',
    'param[0][Key]': 'p_rcdcnt',
    'param[0][Value]': '5',
    'param[1][Key]': 'p_exchange',
    'param[1][Value]': 'NSE',
    'param[2][Key]': 'p_fname',
    'param[2][Value]': 'G',
    'param[3][Key]': 'p_index',
    'param[3][Value]': '20559',
    'param[4][Key]': 'p_pagesize',
    'param[4][Value]': '20',
    'param[5][Key]': 'p_pagenumber',
    'param[5][Value]': '1',
  }).toString();

  const res = await fetch(
    `${API_BASE_URL}/api/EquityAPI/GetMarketTypeGainerData`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: '*/*',
      },
      body,
    }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const raw = json?.data ?? json?.Data ?? json;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

export async function fetchLosers() {
  const body = new URLSearchParams({
    Method: 'BI_GAINLOSER',
    'param[0][Key]': 'p_rcdcnt',
    'param[0][Value]': '10',
    'param[1][Key]': 'p_exchange',
    'param[1][Value]': 'NSE',
    'param[2][Key]': 'p_fname',
    'param[2][Value]': 'L',
    'param[3][Key]': 'p_index',
    'param[3][Value]': '20559',
    'param[4][Key]': 'p_pagesize',
    'param[4][Value]': '10',
    'param[5][Key]': 'p_pagenumber',
    'param[5][Value]': '1',
  }).toString();

  const res = await fetch(
    `${API_BASE_URL}/api/EquityAPI/GetlooserData`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: '*/*',
      },
      body,
    }
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const raw = json?.data ?? json?.Data ?? json;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

export function getStrapiMediaUrl(path?: string): string {
  if (!path) return '';
  if (path.startsWith('http')) {
    try {
      const url = new URL(path);
      console.log(`${STRAPI_BASE}${url.pathname}${url.search}`);

      return `${STRAPI_BASE}${url.pathname}${url.search}`;
    } catch (e) {
      return path;
    }
  }
  return STRAPI_BASE + path;
}
