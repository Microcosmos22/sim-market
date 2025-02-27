// src/api.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://v2202501113287307394.goodsrv.de/api";

export async function getHistoricalData(startDateOrLastNcandles, tag, candleLength) {

      console.log(startDateOrLastNcandles);

      // Construct the query string for GET request
      const queryString = new URLSearchParams({
          start_date_or_lastNcandles: JSON.stringify(startDateOrLastNcandles),
          tradingPair: tag,
          candle_length: candleLength
      }).toString();

      // URL with query string
      const url = `${API_BASE_URL}/get_historical_data?${queryString}`;

      const response = await fetch(url, {method: "GET"});

      if (!response.ok) throw new Error("Failed to fetch historical data");

      return await response.json(); // Return the JSON response

}

export async function trainModel(epochs, lookf, lookb, dropout, learn_rate, layer1, layer2, batch_size, max_total_return) {

      const queryString = new URLSearchParams({
          "epochs": epochs,
          "lookf": lookf,
          "lookb": lookb,
          "dropout": dropout,
          "learn_rate": learn_rate,
          "layer1": layer1,
          "layer2": layer2,
          "batch_size": batch_size,
          "max_total_return": max_total_return
      }).toString();

      const url = `${API_BASE_URL}/train_nnmodel?${queryString}`;
      const response = await fetch(url, {method: "GET",});

      return await response.json(); // Return the JSON response

}
