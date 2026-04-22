// ============================================
// Lecture 14 — Asynchronous JavaScript
// Weather Dashboard & API Explorer
// NexusBerry Modern Frontend Course
// ============================================

// ============================================
// Part 1: Why Async Matters — Event Loop & Timers
// ============================================

// --- Demonstrating Blocking Behavior ---
// WARNING: Uncomment to freeze the page for 3 seconds!
// console.log("⏱️ Before blocking loop");
// const blockStart = Date.now();
// while (Date.now() - blockStart < 3000) {} // Block for 3 seconds
// console.log("⏱️ After blocking loop");

// --- setTimeout — Non-Blocking Timer ---
console.log("🔔 1. Before setTimeout");

setTimeout(() => {
  console.log("🔔 3. Inside setTimeout (runs AFTER current code finishes)");
}, 2000);  // 2 second delay

console.log("🔔 2. After setTimeout");

// Output order: 1, 2, 3
// setTimeout is non-blocking — JavaScript doesn't wait.
// The callback goes to the Web API, waits 2 seconds,
// then enters the callback queue, and the event loop
// moves it to the call stack when the stack is empty.

// --- The Famous 0ms setTimeout Puzzle ---
console.log("\n📋 A. First");

setTimeout(() => {
  console.log("📋 C. Inside setTimeout(fn, 0)");
}, 0);  // Zero milliseconds!

console.log("📋 B. Second");

// Output: A, B, C — even with 0ms delay!
// Why? setTimeout(fn, 0) still goes through:
//   1. Web API (registers timer)
//   2. Callback queue (after 0ms)
//   3. Event loop (waits for call stack to be empty)
// "B" runs first because it's on the call stack NOW.
// The setTimeout callback waits in the queue.

// --- setInterval — Repeated Timer ---
console.log("\n⏰ Starting interval...");

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`⏰ Tick ${count}`);

  if (count >= 3) {
    clearInterval(intervalId);  // MUST clear to prevent memory leak!
    console.log("⏰ Interval cleared — no more ticks");
  }
}, 1000);

// Important: Always store the interval ID and clear it when done.
// Forgetting clearInterval is a common memory leak in React apps.

// --- Multiple setTimeout — Demonstrating Async Ordering ---
console.log("\n🎯 Ordering demo:");
console.log("🎯 Start");

setTimeout(() => console.log("🎯 Timer 1 (500ms)"), 500);
setTimeout(() => console.log("🎯 Timer 2 (100ms)"), 100);
setTimeout(() => console.log("🎯 Timer 3 (300ms)"), 300);

console.log("🎯 End");

// Output: Start, End, Timer 2, Timer 3, Timer 1
// Timers execute based on delay duration, not code order.
// The synchronous code (Start, End) runs first regardless.


// ============================================
// Part 2: Callbacks & The Evolution to Promises
// ============================================

// --- Callback Pattern: The Original Async ---

// Simulating an async operation (like an API call)
function fetchUserData(userId, callback) {
  console.log(`\n📡 Fetching user ${userId}...`);
  setTimeout(() => {
    const user = { id: userId, name: "Rana Ajmal", city: "Lahore" };
    callback(user);  // "Call back" with the result
  }, 1000);
}

// Using the callback
fetchUserData(1, (user) => {
  console.log(`✅ Got user: ${user.name} from ${user.city}`);
});

// The function CALLS YOU BACK when it has the result.
// You don't get a return value — you provide a function to receive the result.

// --- Callback Hell: The Pyramid of Doom ---

function fetchUser(id, callback) {
  setTimeout(() => callback({ id, name: "Rana Ajmal" }), 500);
}

function fetchOrders(userId, callback) {
  setTimeout(() => callback([
    { id: 101, product: "Laptop", userId },
    { id: 102, product: "Keyboard", userId }
  ]), 500);
}

function fetchOrderDetails(orderId, callback) {
  setTimeout(() => callback({
    id: orderId, status: "Delivered", total: 89999
  }), 500);
}

// Nested callbacks — each depends on the previous result:
fetchUser(1, (user) => {
  console.log(`\n👤 User: ${user.name}`);
  fetchOrders(user.id, (orders) => {
    console.log(`📦 Orders: ${orders.length} found`);
    fetchOrderDetails(orders[0].id, (details) => {
      console.log(`📋 Order ${details.id}: ${details.status} — Rs. ${details.total.toLocaleString()}`);
      // Imagine 2 more levels deep...
    });
  });
});

// This works, but it's hard to read, hard to debug,
// and adding error handling makes it 3x worse.

// --- Promises: The Solution ---

// Converting callback functions to Promise-based functions:
function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("Invalid user ID"));
      }
      resolve({ id, name: "Rana Ajmal" });
    }, 500);
  });
}

function fetchOrdersPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userId) reject(new Error("User ID required"));
      resolve([
        { id: 101, product: "Laptop", userId },
        { id: 102, product: "Keyboard", userId }
      ]);
    }, 500);
  });
}

function fetchOrderDetailsPromise(orderId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!orderId) reject(new Error("Order ID required"));
      resolve({ id: orderId, status: "Delivered", total: 89999 });
    }, 500);
  });
}

// Promise chaining — flat, readable, maintainable:
fetchUserPromise(1)
  .then(user => {
    console.log(`\n✨ Promise User: ${user.name}`);
    return fetchOrdersPromise(user.id);       // Return a Promise → chain continues
  })
  .then(orders => {
    console.log(`✨ Promise Orders: ${orders.length} found`);
    return fetchOrderDetailsPromise(orders[0].id);  // Return next Promise
  })
  .then(details => {
    console.log(`✨ Order ${details.id}: ${details.status} — Rs. ${details.total.toLocaleString()}`);
  })
  .catch(error => {
    console.error(`❌ Error: ${error.message}`);  // ONE catch handles ALL errors in the chain
  })
  .finally(() => {
    console.log("🏁 Operation complete (runs success OR failure)");
  });

// Key differences from callbacks:
// 1. Flat chain instead of nested pyramid
// 2. ONE .catch() handles errors from ANY step
// 3. .finally() runs cleanup regardless of outcome
// 4. Each .then() RETURNS a value → next .then() receives it

// --- Creating Promises from Scratch ---

// Custom Promise: simulate weather API call
function getWeather(city) {
  return new Promise((resolve, reject) => {
    console.log(`\n🌤️ Requesting weather for ${city}...`);

    setTimeout(() => {
      const weatherData = {
        city,
        temp: Math.round(20 + Math.random() * 20),
        condition: ["Sunny", "Cloudy", "Rainy", "Windy"][Math.floor(Math.random() * 4)]
      };

      if (city === "") {
        reject(new Error("City name cannot be empty"));
      } else {
        resolve(weatherData);
      }
    }, 1000);
  });
}

// Consuming the Promise:
getWeather("Lahore")
  .then(data => {
    console.log(`🌡️ ${data.city}: ${data.temp}°C, ${data.condition}`);
  })
  .catch(error => {
    console.error(`❌ Weather error: ${error.message}`);
  });

// Error case:
getWeather("")
  .then(data => console.log(data))            // Skipped on rejection
  .catch(error => console.error(`❌ ${error.message}`))  // Handles the error
  .finally(() => console.log("🏁 Weather request complete"));


// ============================================
// Part 3: Promise Combinators & async/await
// ============================================

// Helper: simulate weather fetch for a city
function getWeatherForCity(city) {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2000 + 500;  // 500-2500ms random delay
    setTimeout(() => {
      if (city === "Atlantis") {
        reject(new Error(`City not found: ${city}`));
      } else {
        resolve({
          city,
          temp: Math.round(20 + Math.random() * 25),
          humidity: Math.round(40 + Math.random() * 40)
        });
      }
    }, delay);
  });
}

// --- Promise.all — All Must Succeed ---
console.log("\n🌍 Promise.all — Fetching 3 cities simultaneously...");

Promise.all([
  getWeatherForCity("Lahore"),
  getWeatherForCity("Karachi"),
  getWeatherForCity("Islamabad")
])
  .then(results => {
    console.log("✅ All cities loaded:");
    results.forEach(w => console.log(`  ${w.city}: ${w.temp}°C, ${w.humidity}% humidity`));
  })
  .catch(error => {
    console.error(`❌ Promise.all failed: ${error.message}`);
  });

// What happens when one fails?
Promise.all([
  getWeatherForCity("Lahore"),
  getWeatherForCity("Atlantis"),  // This will reject!
  getWeatherForCity("Karachi")
])
  .then(results => console.log("This never runs"))
  .catch(error => console.error(`❌ All failed because: ${error.message}`));
// One bad apple spoils the bunch!

// --- Promise.allSettled — Collect Everything ---
console.log("\n📊 Promise.allSettled — Tolerant of failures...");

Promise.allSettled([
  getWeatherForCity("Lahore"),
  getWeatherForCity("Atlantis"),  // Will fail
  getWeatherForCity("Karachi")
])
  .then(results => {
    console.log("📊 All settled (never rejects):");
    results.forEach(result => {
      if (result.status === "fulfilled") {
        console.log(`  ✅ ${result.value.city}: ${result.value.temp}°C`);
      } else {
        console.log(`  ❌ Failed: ${result.reason.message}`);
      }
    });
  });
// allSettled NEVER rejects — you always get all results
// Each result has { status: "fulfilled", value } or { status: "rejected", reason }

// --- Promise.race — First One Wins ---
console.log("\n🏁 Promise.race — First to settle wins...");

// Timeout pattern: race fetch against a timer
function fetchWithTimeout(city, timeoutMs) {
  const fetchPromise = getWeatherForCity(city);
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout: ${city} took too long`)), timeoutMs);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout("Lahore", 1000)
  .then(data => console.log(`🏁 Got ${data.city} within timeout: ${data.temp}°C`))
  .catch(error => console.error(`🏁 ${error.message}`));

// --- Promise.any — First SUCCESS Wins ---
console.log("\n🎯 Promise.any — First success wins...");

Promise.any([
  getWeatherForCity("Atlantis"),  // Will fail
  getWeatherForCity("Lahore"),    // Will succeed
  getWeatherForCity("Karachi")    // Will succeed
])
  .then(fastest => {
    console.log(`🎯 First successful: ${fastest.city} at ${fastest.temp}°C`);
  })
  .catch(error => {
    // Only rejects if ALL promises reject
    console.error(`🎯 All failed: ${error.message}`);
  });

// --- async/await — The Modern Syntax ---

async function loadWeatherData() {
  console.log("\n⚡ async/await — Loading weather...");

  // await pauses HERE until the Promise resolves
  const lahore = await getWeatherForCity("Lahore");
  console.log(`  ${lahore.city}: ${lahore.temp}°C`);

  // This line doesn't run until the above await completes
  const karachi = await getWeatherForCity("Karachi");
  console.log(`  ${karachi.city}: ${karachi.temp}°C`);

  return [lahore, karachi];  // async functions always return a Promise
}

// Calling an async function:
loadWeatherData().then(cities => {
  console.log(`⚡ Loaded ${cities.length} cities total`);
});

// --- Error Handling: try/catch with await ---
// THIS is where L13's try/catch/finally pays off!

async function loadWeatherSafe(city) {
  try {
    console.log(`\n🛡️ Safely loading weather for ${city}...`);
    const data = await getWeatherForCity(city);
    console.log(`🛡️ Success: ${data.city} — ${data.temp}°C`);
    return data;
  } catch (error) {
    console.error(`🛡️ Error: ${error.message}`);
    return null;  // Return a fallback instead of crashing
  } finally {
    console.log(`🛡️ Request for ${city} complete (success or failure)`);
  }
}

// Works with valid city:
loadWeatherSafe("Lahore");

// Handles error gracefully:
loadWeatherSafe("Atlantis");

// --- Combining async/await with Promise.all ---
// Best of both worlds: parallel execution + clean syntax

async function loadAllCities() {
  console.log("\n🚀 Parallel fetch with async/await...");

  try {
    // Launch ALL requests simultaneously, then await all at once
    const cities = await Promise.all([
      getWeatherForCity("Lahore"),
      getWeatherForCity("Karachi"),
      getWeatherForCity("Islamabad")
    ]);

    cities.forEach(c => console.log(`  🚀 ${c.city}: ${c.temp}°C`));
    return cities;
  } catch (error) {
    console.error(`🚀 Failed: ${error.message}`);
    return [];
  }
}

loadAllCities();


// ============================================
// Part 4: The fetch API & Working with REST APIs
// ============================================

// --- Basic fetch — GET Request to JSONPlaceholder ---
console.log("\n📡 Fetching a todo from JSONPlaceholder...");

async function fetchTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  // response.ok is true for HTTP 200-299
  console.log(`  Status: ${response.status}`);    // 200
  console.log(`  OK: ${response.ok}`);            // true
  console.log(`  Content-Type: ${response.headers.get("content-type")}`);

  // Parse JSON body (also async!)
  const todo = await response.json();
  console.log("  Todo:", todo);
  // { userId: 1, id: 1, title: "delectus aut autem", completed: false }

  return todo;
}

fetchTodo();

// --- Proper Error Handling — The Two Error Checks ---

async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Check 1: HTTP errors (404, 500, etc.) — fetch does NOT reject on these!
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Check 2: Parse the body — this can also fail (invalid JSON)
    const data = await response.json();
    return data;

  } catch (error) {
    // This catches: network errors, HTTP errors (from our throw), JSON parse errors
    console.error(`❌ Fetch failed: ${error.message}`);
    return null;  // Return fallback instead of crashing
  }
}

// Success case:
fetchData("https://jsonplaceholder.typicode.com/users/1")
  .then(user => {
    if (user) console.log(`\n👤 User: ${user.name} (${user.email})`);
  });

// HTTP error case (404):
fetchData("https://jsonplaceholder.typicode.com/users/99999")
  .then(user => {
    if (user) console.log(user);
    else console.log("📭 No user found (404)");
  });

// --- AbortController — Canceling Fetch Requests ---
console.log("\n🛑 AbortController demo...");

async function fetchWithCancel(url, timeoutMs = 5000) {
  const controller = new AbortController();

  // Automatic timeout — cancel the request after timeoutMs
  const timeoutId = setTimeout(() => {
    controller.abort();  // Sends AbortError
  }, timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);  // Cancel the timeout if fetch completes in time

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();

  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      console.log("🛑 Request was canceled (timeout)");
      return null;
    }
    throw error;  // Re-throw non-abort errors
  }
}

// Using AbortSignal.timeout() — cleaner alternative (modern browsers)
async function fetchWithModernTimeout(url, timeoutMs = 5000) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    if (error.name === "TimeoutError") {
      console.log("⏱️ Request timed out");
      return null;
    }
    if (error.name === "AbortError") {
      console.log("🛑 Request canceled");
      return null;
    }
    throw error;
  }
}

// --- Loading / Error / Success State Pattern ---
console.log("\n🔄 State pattern demo...");

async function loadUserDashboard(userId) {
  // State: LOADING
  let state = { status: "loading", data: null, error: null };
  console.log(`  Status: ${state.status} ⏳`);

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // State: SUCCESS
    state = { status: "success", data, error: null };
    console.log(`  Status: ${state.status} ✅`);
    console.log(`  Welcome, ${data.name}!`);

  } catch (error) {
    // State: ERROR
    state = { status: "error", data: null, error: error.message };
    console.log(`  Status: ${state.status} ❌`);
    console.log(`  Error: ${state.error}`);
  }

  return state;
}

loadUserDashboard(1);   // Success
loadUserDashboard(999); // Error (404 user)

// --- Fetching Multiple Resources in Parallel ---
console.log("\n🌐 Parallel API fetching...");

async function loadDashboard() {
  try {
    const [users, posts, todos] = await Promise.all([
      fetchData("https://jsonplaceholder.typicode.com/users"),
      fetchData("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      fetchData("https://jsonplaceholder.typicode.com/todos?_limit=5")
    ]);

    console.log(`  📊 Dashboard loaded:`);
    if (users) console.log(`    👥 ${users.length} users`);
    if (posts) console.log(`    📝 ${posts.length} posts`);
    if (todos) console.log(`    ✅ ${todos.length} todos`);

  } catch (error) {
    console.error(`  ❌ Dashboard failed: ${error.message}`);
  }
}

loadDashboard();


// ============================================
// Part 5: Weather Dashboard Capstone + TypeScript Async
// ============================================

// --- City Coordinates Database ---
const CITIES = {
  "Lahore":     { lat: 31.55, lon: 74.35 },
  "Karachi":    { lat: 24.86, lon: 67.01 },
  "Islamabad":  { lat: 33.69, lon: 73.04 },
  "Dubai":      { lat: 25.20, lon: 55.27 },
  "London":     { lat: 51.51, lon: -0.13 }
};

// --- Reusable fetch helper (from Part 4) ---
async function fetchJSON(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000)  // 10 second timeout
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

// --- Fetch weather for a single city ---
async function getRealWeather(cityName) {
  const coords = CITIES[cityName];
  if (!coords) throw new Error(`Unknown city: ${cityName}`);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`;

  const data = await fetchJSON(url);

  return {
    city: cityName,
    temperature: data.current_weather.temperature,
    windSpeed: data.current_weather.windspeed,
    weatherCode: data.current_weather.weathercode,
    condition: decodeWeatherCode(data.current_weather.weathercode)
  };
}

// --- Weather code decoder ---
function decodeWeatherCode(code) {
  const codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    51: "Light drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    80: "Rain showers",
    95: "Thunderstorm"
  };
  return codes[code] || `Code ${code}`;
}

// --- Sequential vs Parallel Comparison ---

// SEQUENTIAL — one after another (slow)
async function fetchSequential(cities) {
  console.log("\n🐢 Sequential fetching...");
  const start = Date.now();
  const results = [];

  for (const city of cities) {
    const weather = await getRealWeather(city);  // Waits for EACH one
    results.push(weather);
  }

  const elapsed = Date.now() - start;
  console.log(`  ⏱️ Sequential time: ${elapsed}ms`);
  return results;
}

// PARALLEL — all at once (fast!)
async function fetchParallel(cities) {
  console.log("\n🚀 Parallel fetching...");
  const start = Date.now();

  const results = await Promise.all(
    cities.map(city => getRealWeather(city))  // All fire simultaneously
  );

  const elapsed = Date.now() - start;
  console.log(`  ⏱️ Parallel time: ${elapsed}ms`);
  return results;
}

// --- Display formatted results ---
function displayWeather(weatherData) {
  console.log("\n" + "=".repeat(50));
  console.log("  WEATHER DASHBOARD");
  console.log("=".repeat(50));

  weatherData.forEach(w => {
    console.log(`\n  📍 ${w.city}`);
    console.log(`     🌡️ Temperature: ${w.temperature}°C`);
    console.log(`     💨 Wind Speed:  ${w.windSpeed} km/h`);
    console.log(`     ${w.condition}`);
  });

  console.log("\n" + "=".repeat(50));
}

// --- Run the dashboard ---
async function runDashboard() {
  const cities = ["Lahore", "Karachi", "Islamabad", "Dubai", "London"];

  try {
    // Parallel (fast — the production pattern!)
    const results = await fetchParallel(cities);
    displayWeather(results);

    // Uncomment to compare with sequential:
    // const seqResults = await fetchSequential(cities);
    // displayWeather(seqResults);

  } catch (error) {
    console.error(`❌ Dashboard error: ${error.message}`);
  }
}

// Run the dashboard after a short delay so earlier demos log first
setTimeout(() => runDashboard(), 5000);

// --- Retry Logic with Exponential Backoff ---
async function fetchWithRetry(fn, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;

      if (isLastAttempt) {
        console.error(`❌ Failed after ${maxRetries} attempts: ${error.message}`);
        throw error;
      }

      const delay = Math.pow(2, attempt) * 1000;  // 2s, 4s, 8s
      console.log(`⚠️ Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage example (uncomment to test):
// fetchWithRetry(() => getRealWeather("Lahore"))
//   .then(data => console.log("Retry success:", data))
//   .catch(err => console.error("Retry failed:", err.message));


// --- TypeScript Async Types (Preview) ---
// These won't run in the browser without a compiler,
// but this is what async TypeScript looks like:

/*
// Promise<T> — the return type of async functions
interface WeatherData {
  city: string;
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
}

// Typed async function
async function getWeatherTyped(city: string): Promise<WeatherData> {
  const response = await fetch(url);
  const data = await response.json();
  return {
    city,
    temperature: data.current_weather.temperature,
    windSpeed: data.current_weather.windspeed,
    weatherCode: data.current_weather.weathercode,
    condition: decodeWeatherCode(data.current_weather.weathercode)
  };
}

// Generic fetch helper — works with ANY type!
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json() as Promise<T>;
}

// Usage with type inference:
const weather = await fetchJSON<WeatherData>(url);
//    ^ TypeScript knows this is WeatherData

const users = await fetchJSON<User[]>("/api/users");
//    ^ TypeScript knows this is User[]
*/
