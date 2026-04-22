# Assignment: Weather Dashboard & API Explorer

## Overview

Build your own Weather Dashboard that fetches data from live APIs, handles errors gracefully, and demonstrates mastery of asynchronous JavaScript patterns. This is the exact kind of data-fetching logic that powers every modern frontend application — from weather widgets to social media feeds to e-commerce product listings. Every React component that loads data from a server uses these patterns.

---

## Requirements

Your Weather Dashboard must include:

### 1. Reusable Fetch Helper
- Create a `fetchJSON(url)` function that handles the complete fetch lifecycle
- Must check `response.ok` and throw an Error for HTTP error statuses (404, 500, etc.)
- Must include a timeout using `AbortController` or `AbortSignal.timeout()`
- Must handle both network errors and HTTP errors in a single `try/catch`
- Function should return parsed JSON data on success, or a sensible fallback on failure

### 2. Multi-API Data Fetching
- Fetch data from **at least 2 different APIs**:
  - **JSONPlaceholder** (`https://jsonplaceholder.typicode.com`) — users, posts, or todos
  - **Open-Meteo** (`https://api.open-meteo.com/v1/forecast`) — weather data by coordinates
- Display formatted results in the console for each API

### 3. Parallel Execution with Promise.all
- Use `Promise.all` to fetch data from multiple endpoints simultaneously
- Demonstrate that you understand the difference between sequential and parallel fetching
- Log the results of the parallel fetch in a formatted dashboard view

### 4. Loading / Error / Success States
- Every fetch operation must track three states: loading, success, and error
- Log the current state before, during, and after each request
- On error, display a user-friendly message (not raw error objects)

### 5. Request Cancellation with AbortController
- Implement at least one function that uses `AbortController` to cancel a request
- Handle the `AbortError` separately from other errors
- Include a timeout pattern (cancel if request takes too long)

### 6. Retry Logic
- Implement a `fetchWithRetry(fn, maxRetries)` function
- Must retry at least 2 times before giving up
- Use exponential backoff (increasing delay between retries: e.g., 1s, 2s, 4s)
- Log each retry attempt with the attempt number and delay

### 7. Graceful Partial Failures with Promise.allSettled
- Use `Promise.allSettled` to fetch data where some requests may fail
- Check each result's `status` property (`"fulfilled"` or `"rejected"`)
- Display successful results and error messages for failed ones — never let one failure blank the entire output

### 8. Error Handling with try/catch/finally
- All async functions must use `try/catch` for error handling
- Use `finally` for cleanup operations (logging completion, clearing state)
- Use guard clauses to validate inputs before making API calls

### 9. Formatted Console Output
- Display results in a structured, readable format using template literals
- Use clear section headers (e.g., `"=== WEATHER DASHBOARD ==="`)
- Include emoji or visual indicators for different states (loading, success, error)

### 10. TypeScript Type Comments
- Add TypeScript-style comments showing typed versions of your key functions
- Include at least one `interface` definition for your API response data
- Show `Promise<T>` return types in comments for your async functions

---

## Example Structure

```javascript
// --- Reusable Fetch Helper ---
async function fetchJSON(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// --- Retry with Exponential Backoff ---
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      const delay = Math.pow(2, attempt) * 1000;
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// --- Loading / Error / Success State Pattern ---
async function loadData(url) {
  let state = { status: "loading", data: null, error: null };
  console.log(`Status: ${state.status}`);

  try {
    const data = await fetchJSON(url);
    state = { status: "success", data, error: null };
    console.log(`Status: ${state.status}`);
    return state;
  } catch (error) {
    state = { status: "error", data: null, error: error.message };
    console.log(`Status: ${state.status} — ${state.error}`);
    return state;
  }
}

// --- Parallel Fetch ---
async function loadDashboard() {
  const [users, weather] = await Promise.all([
    fetchJSON("https://jsonplaceholder.typicode.com/users"),
    fetchJSON("https://api.open-meteo.com/v1/forecast?latitude=31.55&longitude=74.35&current_weather=true")
  ]);
  console.log(`Users: ${users.length}, Temp: ${weather.current_weather.temperature}°C`);
}

// --- Graceful Partial Failures ---
async function loadWithPartialFailures(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetchJSON(url))
  );
  results.forEach(result => {
    if (result.status === "fulfilled") {
      console.log("Success:", result.value);
    } else {
      console.log("Failed:", result.reason.message);
    }
  });
}

// --- TypeScript Type Comments ---
/*
interface WeatherData {
  city: string;
  temperature: number;
  windSpeed: number;
  condition: string;
}

async function getWeather(city: string): Promise<WeatherData> { ... }
async function fetchJSON<T>(url: string): Promise<T> { ... }
*/
```

---

## Resources

- **Lecture Recording**: Available on Google Classroom
- **Cheat Sheet**: See `cheatsheet.md` shared after class
- **JSONPlaceholder API**: `https://jsonplaceholder.typicode.com` — users, posts, todos (no API key needed)
- **Open-Meteo API**: `https://api.open-meteo.com` — weather data by lat/lon (no API key needed)
- **MDN — fetch API**: `https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API`
- **MDN — Promise**: `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise`
- **MDN — AbortController**: `https://developer.mozilla.org/en-US/docs/Web/API/AbortController`

---

## Submission Instructions

1. Create a folder named `assignment-14-your-name/`
2. Include all project files: `index.html`, `style.css` (optional), `script.js`
3. Ensure the code runs in a browser by opening `index.html` and checking the Console
4. Compress to ZIP or push to a GitHub repository
5. Upload to Google Classroom before the deadline

**Deadline:** Before Lecture 15

---

## Pre-Submission Checklist

Before submitting, verify:

- [ ] `fetchJSON()` helper checks `response.ok` and includes a timeout
- [ ] Data is fetched from at least 2 different APIs (JSONPlaceholder + Open-Meteo)
- [ ] `Promise.all` is used for at least one parallel fetch operation
- [ ] Every fetch tracks loading/error/success states with console output
- [ ] `AbortController` or `AbortSignal.timeout()` is used for request cancellation
- [ ] Retry logic retries at least 2 times with increasing delays
- [ ] `Promise.allSettled` is used with `status` checking for partial failures
- [ ] All async functions use `try/catch` (with `finally` where appropriate)
- [ ] Console output is formatted and readable (section headers, clear labels)
- [ ] TypeScript comments show interfaces and `Promise<T>` return types
- [ ] Code runs without errors in the browser console
- [ ] No hardcoded API responses — all data comes from live fetch calls
- [ ] Files are named correctly (lowercase, hyphens, no spaces)

---

## Grading Criteria

| Criteria | Points |
|----------|--------|
| **Fetch Helper & Error Handling** — `fetchJSON()` with `response.ok` check, timeout, try/catch | 20 |
| **API Integration & Parallel Execution** — 2+ APIs, `Promise.all` for parallel fetching | 20 |
| **State Management & UX** — Loading/error/success states, `AbortController`, user-friendly error messages | 20 |
| **Advanced Patterns** — Retry logic with backoff, `Promise.allSettled` for partial failures | 20 |
| **Output & TypeScript** — Formatted console output, TypeScript type comments with interfaces | 10 |
| **Code Quality & Best Practices** — Clean formatting, meaningful variable names, guard clauses, comments | 10 |
| **Total** | **100** |

**Note:** Partial credit is awarded for incomplete but attempted requirements. A function that handles 2 out of 3 error cases still earns most of its points.

---

## Tips for Success

1. **Build piece by piece** — start with `fetchJSON()`, test it, then add parallel fetching, then retry logic
2. **Test each function individually** before combining them into the dashboard
3. **Check the Network tab** in DevTools to verify your API calls are working
4. **Reference the cheatsheet** — it contains every pattern you need for this assignment
5. **Don't memorize** — use the cheatsheet and MDN docs. Professional developers look things up constantly.

---

## Common Mistakes to Avoid

- Not checking `response.ok` — fetch resolves on 404/500, so your code silently processes error responses as data
- Forgetting `await` — you end up working with Promise objects instead of the actual values
- Sequential `await` in a loop when `Promise.all` would be faster — ask "do these depend on each other?"
- Not clearing timers or aborting controllers — causes memory leaks
- Over-wrapping with try/catch — catch specific failure points, not every single line
- Not guarding inputs before async operations — validate city names, user IDs, URLs before fetching
- Submitting without opening the browser console to check for errors

---

## Need Help?

- Review the **lecture recording** on Google Classroom
- Check the **`cheatsheet.md`** file for quick reference on all async patterns
- Post questions in the **Google Classroom comments** (classmates can help too)
- Attend office hours (schedule posted on Google Classroom)

Every React app you'll build in this course talks to APIs using exactly these patterns. The `fetchJSON` helper, the loading state pattern, the `Promise.all` parallelism — these aren't just assignment requirements, they're the building blocks of professional frontend development. Master them now and Module 3 (React) will feel like second nature. You've got this.
