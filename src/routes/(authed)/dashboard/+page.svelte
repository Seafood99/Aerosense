<script lang="ts">
    export let data;
    
    // Get the latest record
    $: latestRecord = data.records[0] || {
        air_quality: "N/A",
        temperature: "N/A",
        humidity: "N/A",
        pressure: "N/A",
        created: new Date().toISOString()
    };

    $: lastUpdate = new Date(latestRecord.created).toLocaleTimeString();

    // Function to format numbers
    function formatNumber(value: any) {
        return value === "N/A" ? "N/A" : Number(value).toFixed(1);
    }

    let isLoggingOut = false;
    
    function handleLogout() {
        isLoggingOut = true;
    }
</script>

<main class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">AeroSense Dashboard</h1>
                <p class="text-sm text-gray-600">Last Updated: {lastUpdate}</p>
                <div class="absolute top-4 right-4">
                    <form 
                        action="/logout" 
                        method="POST" 
                        onsubmit={handleLogout}
                    >
                        <button 
                            type="submit" 
                            class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                            disabled={isLoggingOut}
                        >
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                    </form>
                </div>
            </div>

            <!-- Sensor Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Air Quality Card -->
                <div class="bg-blue-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Air Quality</h3>
                    <p class="text-3xl font-bold text-blue-600">
                        {formatNumber(latestRecord.air_quality)} <span class="text-lg">ppm</span>
                    </p>
                </div>

                <!-- Temperature Card -->
                <div class="bg-red-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Temperature</h3>
                    <p class="text-3xl font-bold text-red-600">
                        {formatNumber(latestRecord.temperature)} <span class="text-lg">°C</span>
                    </p>
                </div>

                <!-- Humidity Card -->
                <div class="bg-green-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Humidity</h3>
                    <p class="text-3xl font-bold text-green-600">
                        {formatNumber(latestRecord.humidity)} <span class="text-lg">%</span>
                    </p>
                </div>

                <!-- Pressure Card -->
                <div class="bg-purple-50 rounded-xl p-6 transition-all hover:shadow-md">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Pressure</h3>
                    <p class="text-3xl font-bold text-purple-600">
                        {formatNumber(latestRecord.pressure)} <span class="text-lg">hPa</span>
                    </p>
                </div>
            </div>

            <!-- History Table -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold text-gray-900 mb-4">History</h2>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Air Quality</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pressure</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {#each data.records as record}
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(record.created).toLocaleString()}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatNumber(record.air_quality)} ppm
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatNumber(record.temperature)}°C
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatNumber(record.humidity)}%
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatNumber(record.pressure)} hPa
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-8 text-center">
                <p class="text-sm text-gray-500">&copy; 2024 AeroSense | IoT Air Quality Monitoring</p>
            </div>
        </div>
    </div>
</main>