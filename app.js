const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 8080;
const API_KEY_WEATHER = 'aa3fe23c16b6cb288cc79b2c50b2372d';
const API_KEY_CURRCNVRTR = '43ae0b74131da9f25c57189a';
app.set('view engine', 'ejs');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routers?
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/weather', (req, res) => {
    res.render('weatherApp',{weather:null, error:null});
});
app.get('/calculator', (req, res) => {
    res.render('basicCalculator');
});
app.get('/currencyconverter', async (req, res) => {
    const currConvURL = `https://v6.exchangerate-api.com/v6/${API_KEY_CURRCNVRTR}/latest/PHP`; 

    try {
        const response = await axios.get(currConvURL);
        const currResponse = response.data.conversion_rates;
        const currencies = Object.keys(currResponse);
        // console.log(currencies)
        
        res.render('currencyConverter', { currencies });
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).send('Failed to load currencies. Please check internet connection or the API.');
    }
})
app.get('/profiles', (req, res) => {
    res.render('profiles'); 
});


//WeatherApp
app.get('/weatherCheck', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.send('<div class="text-red-600">Please enter a city name</div>');
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`;

    try {
        const weatherResponse = await axios.get(weatherUrl);
        const weatherData = weatherResponse.data;
        
        const timezoneOffset = weatherData.timezone / 3600;
        const timezone = `GMT${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset}`;

        const weather = {
            location: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: weatherData.weather[0].icon,
            country: weatherData.sys.country,
            windspeed: weatherData.wind.speed,
            maxtemp: weatherData.main.temp_max,
            humidity: weatherData.main.humidity,
            timezone: timezone
        };

        res.render('partials/weatherResult', { weather, error: null });
    } catch (error) {
        res.send('<div class="text-red-600">Failed to fetch weather data. Please check the location or API key.</div>');
    }
});

//Basic Calculator
app.post('/calculate', (req, res) => {
    const { firstValue, secondValue } = req.body;

    const firstNum = parseFloat(firstValue) || 0;
    const secondNum = parseFloat(secondValue) || 0;

    const add = firstNum + secondNum;
    const mul = firstNum * secondNum;
    const sub = firstNum - secondNum;
    const div = firstNum !== 0 && secondNum !== 0 ? firstNum / secondNum : "0";
    const ave = (add) / 2;

    res.json({
        add: isNaN(add) ? '0' : add,
        mul: isNaN(mul) ? '0' : mul,
        sub: isNaN(sub) ? '0' : sub,
        div: isNaN(div) ? '0' : div,
        ave: isNaN(ave) ? '0' : ave
    });
});

//Currency Exchange
app.post('/currencyConvert', async (req, res) => {
        const { currency1, currency2, amount1 } = req.body;

        if (!currency1 || !currency2 || !amount1) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const currConvURL = `https://v6.exchangerate-api.com/v6/${API_KEY_CURRCNVRTR}/latest/${currency1}`;

        try {
            const response = await axios.get(currConvURL);
            const ratesResponse = response.data.conversion_rates;
            // console.log(rates)
            const rate = ratesResponse[currency2];
            
            const convertedAmount = (amount1 * rate).toFixed(2);

            res.json({ convertedAmount });
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            res.status(500).json({ error: 'Failed to fetch exchange rates' });
        }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
