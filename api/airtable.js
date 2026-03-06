export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    res.status(500).json({ error: 'Airtable env not configured' });
    return;
  }

  try {
    const { table, fields } = req.body || {};
    if (!table || !fields) {
      res.status(400).json({ error: 'Missing table or fields' });
      return;
    }

    const airtableRes = await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        records: [{ fields }],
      }),
    });

    const data = await airtableRes.json();
    if (!airtableRes.ok) {
      res.status(airtableRes.status).json({ error: 'Airtable request failed', details: data });
      return;
    }

    res.status(200).json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ error: 'Unexpected server error' });
  }
}
