import React, { useState, useEffect } from 'react';
import { FaTachometerAlt, FaCogs, FaChartLine, FaClipboardList } from 'react-icons/fa';
import * as api from "./api"; // Import all API functions
import { fetchMachines } from "./api"; // ✅ Ensure correct path

function findallsubstrings(input, beforestring, stringend, end_n) {

    const substrings = [];
    let startIndex = 0;

    while (true) {
        // Find the next "saving model" after the last found index
        const startmachine = input.indexOf(beforestring, startIndex);
        if (startmachine === -1) break;  // No more occurrences

        // Find the next ".h5" after this "saving model"
        const endmachine = input.indexOf(stringend, startmachine);
        if (endmachine === -1) break;  // No more .h5 found

        // Extract substring between "saving model" and ".h5"
        const found_substr = input.substring(startmachine + beforestring.length, endmachine + end_n);  // +3 to include ".h5"
        substrings.push(found_substr);

        // Update startIndex to continue searching after the current ".h5"
        startIndex = endmachine + 3;  // Move past the current ".h5"
    }
    return substrings;
  }


function generateColors(){
    const baseColors = [
      "bg-red-600", "bg-blue-600", "bg-green-600", "bg-yellow-600",
      "bg-purple-600", "bg-pink-600", "bg-indigo-600", "bg-teal-600",
      "bg-orange-600", "bg-lime-600", "bg-rose-600", "bg-emerald-600",
      "bg-cyan-600", "bg-fuchsia-600", "bg-violet-600", "bg-amber-600"
    ];

    let colors = [];

    // Expand the color list by repeating the base colors until we have 10,000 entries
    while (colors.length < 10000) {
      colors = [...colors, ...baseColors];
    }

    return colors.slice(0, 10000);  // Ensure the list is exactly 10,000 colors
  };

  export default{
    generateColors,
    findallsubstrings,
  };
