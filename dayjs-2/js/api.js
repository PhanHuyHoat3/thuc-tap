    // Giả lập API thời tiết
    const fakeWeatherAPI = (city) => {
        const delay = Math.random() * 2000 + 1000; // Delay 1-3 giây
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.1) { // 10% khả năng lỗi
            reject(new Error(`Không thể lấy dữ liệu thời tiết cho ${city}`));
            } else {
            const temp = Math.floor(Math.random() * 50); // Nhiệt độ ngẫu nhiên 0-50°C
            resolve({ city, temp, timestamp: new Date() });
            }
        }, delay);
        });
    };
    
    // 1. Web APIs & Callback Hell → Async
    // Callback Hell
    function fetchWeatherCallbackHell(city1, city2, city3, callback) {
        fakeWeatherAPI(city1).then(data1 => {
        fakeWeatherAPI(city2).then(data2 => {
            fakeWeatherAPI(city3).then(data3 => {
            callback([data1, data2, data3]);
            }).catch(err => callback(null, err));
        }).catch(err => callback(null, err));
        }).catch(err => callback(null, err));
    }
    
    // Refactor bằng async/await
    async function fetchWeatherAsync(city1, city2, city3) {
        try {
        const [data1, data2, data3] = await Promise.all([
            fakeWeatherAPI(city1),
            fakeWeatherAPI(city2),
            fakeWeatherAPI(city3)
        ]);
        return [data1, data2, data3];
        } catch (error) {
        throw error;
        }
    }
    
    // 2. Advanced Promises
    // Promise.race
    async function fetchFastestWeather(cities) {
        const mirrors = cities.map(city => fakeWeatherAPI(city));
        return await Promise.race(mirrors);
    }
    
    // Promise.allSettled
    async function fetchAllWeather(cities) {
        const results = await Promise.allSettled(cities.map(city => fakeWeatherAPI(city)));
        return results.map(result => ({
        status: result.status,
        data: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
        }));
    }
    
    // Promise Pool giới hạn 2 request song song
    function promisePool(tasks, limit) {
        return new Promise((resolve) => {
        let results = [];
        let running = 0;
        let index = 0;
    
        function runTask() {
            if (index >= tasks.length && running === 0) {
            resolve(results);
            return;
            }
            while (running < limit && index < tasks.length) {
            const currentIndex = index++;
            running++;
            tasks[currentIndex]()
                .then(result => {
                results[currentIndex] = { status: 'fulfilled', value: result };
                })
                .catch(error => {
                results[currentIndex] = { status: 'rejected', reason: error };
                })
                .finally(() => {
                running--;
                runTask();
                });
            }
        }
        runTask();
        });
    }
    
    // 3. Observer Pattern
    class WeatherStation {
        constructor() {
        this.listeners = [];
        this.cities = [];
        this.intervals = {};
        this.failures = {};
        }
    
        subscribe(listener) {
        this.listeners.push(listener);
        }
    
        unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
        }
    
        notify(data) {
        this.listeners.forEach(listener => listener(data));
        }
    
        addCity(city) {
        if (!this.cities.includes(city)) {
            this.cities.push(city);
            this.failures[city] = 0;
            this.startPolling(city);
        }
        }
    
        removeCity(city) {
        this.cities = this.cities.filter(c => c !== city);
        clearInterval(this.intervals[city]);
        delete this.intervals[city];
        delete this.failures[city];
        this.notify({ type: 'remove', city });
        }
    
        startPolling(city) {
        this.intervals[city] = setInterval(async () => {
            try {
            const data = await fakeWeatherAPI(city);
            this.failures[city] = 0;
            this.notify({ type: 'update', data });
            } catch (error) {
            this.failures[city] = (this.failures[city] || 0) + 1;
            if (this.failures[city] >= 3) {
                this.removeCity(city);
                this.notify({ type: 'error', city, message: `Dừng cập nhật ${city} sau 3 lần thất bại` });
            }
            }
        }, 5000);
        }
    }
    
    // 4. Functional Programming
    const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32;
    const isHot = (temp) => temp > 35;
    
    // Hàm pipe
    const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
    
    // Hàm curry cho logTemp
    const logTemp = (unit) => (temp) => `${temp}°${unit}`;
    
    // Tạo các phiên bản curry
    const logCelsius = logTemp('C');
    const logFahrenheit = logTemp('F');
    
    // UI Observer
    const uiObserver = (data) => {
        const container = document.getElementById('weatherContainer');
        if (data.type === 'update') {
        const { city, temp, timestamp } = data.data;
        let cityDiv = document.getElementById(`city-${city}`);
        if (!cityDiv) {
            cityDiv = document.createElement('div');
            cityDiv.id = `city-${city}`;
            cityDiv.className = 'city';
            container.appendChild(cityDiv);
        }
        const fahrenheit = celsiusToFahrenheit(temp);
        cityDiv.innerHTML = `
            <h3>${city}</h3>
            <p>Nhiệt độ: ${logCelsius(temp)} (${logFahrenheit(fahrenheit)})</p>
            <p>Cập nhật: ${timestamp.toLocaleTimeString()}</p>
            ${isHot(temp) ? '<p class="alert">Cảnh báo: Nhiệt độ cao!</p>' : ''}
            <button onclick="weatherStation.removeCity('${city}')">Xóa</button>
        `;
        } else if (data.type === 'remove') {
        const cityDiv = document.getElementById(`city-${data.city}`);
        if (cityDiv) cityDiv.remove();
        }
    };
    
    // Log Observer
    const logObserver = (data) => {
        const logContainer = document.getElementById('logContainer');
        const logEntry = document.createElement('p');
        if (data.type === 'update') {
        const { city, temp, timestamp } = data.data;
        logEntry.textContent = `[${timestamp.toLocaleTimeString()}] ${city}: ${logCelsius(temp)}`;
        } else if (data.type === 'error') {
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] Lỗi: ${data.message}`;
        logEntry.style.color = 'red';
        }
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    };
    
    // Alert Observer
    const alertObserver = (data) => {
        if (data.type === 'update' && isHot(data.data.temp)) {
        const logContainer = document.getElementById('logContainer');
        const logEntry = document.createElement('p');
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] Cảnh báo: ${data.data.city} quá nóng (${logCelsius(data.data.temp)})!`;
        logEntry.style.color = 'red';
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
        }
    };
    
    // Khởi tạo WeatherStation
    const weatherStation = new WeatherStation();
    weatherStation.subscribe(uiObserver);
    weatherStation.subscribe(logObserver);
    weatherStation.subscribe(alertObserver);
    
    // Hàm thêm thành phố từ giao diện
    function addCity() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        if (city) {
        weatherStation.addCity(city);
        cityInput.value = '';
        }
    }
    
    // Khởi tạo với một số thành phố
    weatherStation.addCity('Hà Nội');
    weatherStation.addCity('TP.HCM');
    weatherStation.addCity('Đà Nẵng');
    
    // Demo Advanced Promises
    async function demoAdvancedPromises() {
        console.log('Demo Promise.race:');
        const fastest = await fetchFastestWeather(['Hà Nội', 'TP.HCM', 'Đà Nẵng']);
        console.log('Nhanh nhất:', fastest);
    
        console.log('Demo Promise.allSettled:');
        const allResults = await fetchAllWeather(['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Huế', 'Cần Thơ']);
        console.log('Tất cả kết quả:', allResults);
    
        console.log('Demo Promise Pool (limit 2):');
        const tasks = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Huế', 'Cần Thơ'].map(city => () => fakeWeatherAPI(city));
        const poolResults = await promisePool(tasks, 2);
        console.log('Kết quả Promise Pool:', poolResults);
    }
    demoAdvancedPromises();