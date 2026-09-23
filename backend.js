export default async function handler(req, res) {
  // Replace with your Google Apps Script Web App URL (must end in /exec)
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "YOUR_APPS_SCRIPT_EXEC_URL_HERE";

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: req.method === "POST" ? "POST" : "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
      redirect: "follow", // Essential for following Google Apps Script's 302 redirects
    });

    const rawText = await response.text();

    // Catch cases where Google returns an HTML error page (e.g., access permissions or wrong URL)
    if (rawText.trim().startsWith("<")) {
      return res.status(500).json({
        error: "Received HTML response instead of JSON. Ensure Apps Script deployment is set to 'Anyone'.",
        details: rawText.substring(0, 300) // Truncate raw HTML preview
      });
    }

    const data = JSON.parse(rawText);
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Failed to communicate with Apps Script",
      details: error.message
    });
  }
}