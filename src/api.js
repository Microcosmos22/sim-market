// src/api.js
const API_BASE_URL = "http://localhost:5050"; // Adjust the URL based on your backend

export async function getHistoricalData(startDateOrLastNcandles, tag, candleLength) {
    try {

        console.log(startDateOrLastNcandles)
        // http://localhost:5050/get_historical_data?start_date_or_lastNcandles=[%222022-01-01%2000:00:00%22,1000]&%22BTCUSD%22&%221hour%22
        const response = await fetch(`${API_BASE_URL}/get_historical_data`, {
            method: "POST", // Assuming the backend expects a POST request
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                start_date_or_lastNcandles: startDateOrLastNcandles,
                tradingPair: tag,
                candle_length: candleLength
            }),
        });

        if (!response.ok) throw new Error("Failed to fetch historical data");

        return await response.json(); // Return the JSON response
    } catch (error) {
        console.error("Error fetching historical data:", error);
        return null;
    }
}
