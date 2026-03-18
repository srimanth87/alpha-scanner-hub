// Netlify serverless function — Yahoo Finance proxy
// Server-to-server fetch: no CORS, no browser restrictions
// Called by scanners as: /.netlify/functions/yahoo?sym=SPY&interval=1d&range=5d

export default async (req) => {
  const url = new URL(req.url);
  const sym      = url.searchParams.get('sym');
  const interval = url.searchParams.get('interval') || '1d';
  const range    = url.searchParams.get('range')    || '5d';
  const prepost  = url.searchParams.get('includePrePost') || 'false';

  if (!sym) {
    return new Response(JSON.stringify({ error: 'Missing sym param' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=${interval}&range=${range}&includePrePost=${prepost}`;

  try {
    const res = await fetch(yahooUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://finance.yahoo.com/',
        'Origin': 'https://finance.yahoo.com'
      }
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const config = { path: '/.netlify/functions/yahoo' };
