// src/api.js
const API_BASE_URL = "http://localhost:5050"; // Adjust the URL based on your backend

export async function getHistoricalData(startDateOrLastNcandles, tag, candleLength) {
    try {
        console.log(startDateOrLastNcandles);

        // Construct the query string for GET request
        const queryString = new URLSearchParams({
            start_date_or_lastNcandles: JSON.stringify(startDateOrLastNcandles),
            tradingPair: tag,
            candle_length: candleLength
        }).toString();

        // URL with query string
        const url = `${API_BASE_URL}/get_historical_data?${queryString}`;

        // Send GET request with the constructed URL
        const response = await fetch(url, {
            method: "GET", // Now using GET instead of POST
        });

        if (!response.ok) throw new Error("Failed to fetch historical data");

        return await response.json(); // Return the JSON response
    } catch (error) {
        console.error("Error fetching historical data:", error);
        return null;
    }
}
