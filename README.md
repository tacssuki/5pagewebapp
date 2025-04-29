# 5 Page Web App

Hey there! This little web app is something I put together for a mini-project/activity during my 3rd year, 1st semester studies in System Integration and Architecture. It's mainly for compliance stuff, but I wanted to get it up on GitHub anyway!

It features five different pages/mini-applications:

1.  **Landing Page:** The main entry point.
2.  **Weather App:** Fetches and displays weather information for a given city using the OpenWeatherMap API.
3.  **Basic Calculator:** Performs simple arithmetic operations (addition, subtraction, multiplication, division, average).
4.  **Currency Converter:** Converts amounts between different currencies using the ExchangeRate-API.
5.  **Profiles Page:** Shows the developer profiles.

## Features

*   Uses Express.js for routing and middleware.
*   Uses EJS as the templating engine.
*   Integrates with external APIs (OpenWeatherMap, ExchangeRate-API).
*   Provides basic calculation and currency conversion functionality.

## Setup & Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd 5pagewebapp
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  You might need to add your API keys for OpenWeatherMap and ExchangeRate-API in `app.js` if they are not hardcoded (or use environment variables).
5.  Start the server:
    ```bash
    npm start
    ```
6.  Open your browser and go to `http://localhost:8080` (or the specified port).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 