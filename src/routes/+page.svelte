<!-- src/routes/+page.svelte -->
<script>
    import { onMount } from 'svelte';

    let airQuality = "Loading...";
    let temperature = "Loading...";
    let humidity = "Loading...";
    let pressure = "Loading...";
    let lastUpdate = "--:--";
  
    async function fetchSensorData() {
        // Simulated API Response (Dummy Data)
        const data = {
            feeds: [
                {
                    field1: "120",
                    field2: "26.5",
                    field3: "60",
                    field4: "1012",
                    created_at: new Date().toISOString()
                }
            ]
        };
      
        if (data.feeds.length > 0) {
            airQuality = data.feeds[0].field1 || "N/A";
            temperature = data.feeds[0].field2 || "N/A";
            humidity = data.feeds[0].field3 || "N/A";
            pressure = data.feeds[0].field4 || "N/A";
            lastUpdate = new Date(data.feeds[0].created_at).toLocaleTimeString();
        }
    }
  
    onMount(() => {
        fetchSensorData();
        // Optional: Set up polling every 30 seconds
        const interval = setInterval(fetchSensorData, 30000);
        return () => clearInterval(interval);
    });
</script>

<main class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">AeroSense Dashboard</h1>
                <p class="text-sm text-gray-600">Last Updated: {lastUpdate}</p>
            </div>

            <!-- Sensor Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Air Quality Card -->
                <div class="bg-blue-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Air Quality</h3>
                    <p class="text-3xl font-bold text-blue-600">{airQuality} <span class="text-lg">ppm</span></p>
                </div>

                <!-- Temperature Card -->
                <div class="bg-red-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Temperature</h3>
                    <p class="text-3xl font-bold text-red-600">{temperature} <span class="text-lg">°C</span></p>
                </div>

                <!-- Humidity Card -->
                <div class="bg-green-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Humidity</h3>
                    <p class="text-3xl font-bold text-green-600">{humidity} <span class="text-lg">%</span></p>
                </div>

                <!-- Pressure Card -->
                <div class="bg-purple-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Pressure</h3>
                    <p class="text-3xl font-bold text-purple-600">{pressure} <span class="text-lg">hPa</span></p>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-8 text-center">
                <p class="text-sm text-gray-500">&copy; 2024 AeroSense | IoT Air Quality Monitoring</p>
            </div>
        </div>
    </div>
</main>