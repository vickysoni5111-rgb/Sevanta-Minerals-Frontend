// Safe version of the send-lead API call
// Prevents "Unexpected token '<'" crash when backend returns HTML/404
// instead of JSON, and gives a clear error message instead.

export async function sendLead(payload) {
  // ✅ Your live Render backend — no trailing slash before /api
  const API_URL = "https://sevanata-minerals.onrender.com/api/send-lead";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Read the raw text first — don't assume it's JSON
  const rawText = await response.text();

  if (!response.ok) {
    console.error(
      `send-lead failed: status ${response.status}`,
      rawText.slice(0, 200) // log first 200 chars for debugging
    );
    throw new Error(
      `Server error (${response.status}). The /api/send-lead endpoint may not exist or backend is not deployed.`
    );
  }

  // Only try to parse JSON if it actually looks like JSON
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    console.error("Expected JSON but got:", rawText.slice(0, 200));
    throw new Error(
      "Server did not return JSON. Check that the API endpoint is correctly deployed."
    );
  }

  return JSON.parse(rawText);
}