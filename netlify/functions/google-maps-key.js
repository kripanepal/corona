exports.handler = async function handler() {
  const key = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!key) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Missing Google Maps API key" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify({ key }),
  };
};
