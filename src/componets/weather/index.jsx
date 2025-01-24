import Search from "../search";
import { useEffect, useState } from "react";


export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);


    async function fetchWeatherData(param) {
        setLoading(true)
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=fe80c8216feb6ecdfbb3a1558ea970c6`)

            const data = await response.json();

            if (data) {
                setWeatherData(data)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    function handleSearch() {
        fetchWeatherData(search)
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: "numeric",
            year: "numeric"
        })
    }


    useEffect(() => {

        fetchWeatherData("Denver")

    }, [])

    console.log(weatherData);
    

    return (
        <div>

            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                loading ? <div className="loading">Loading...</div> :
                    <div>
                        <div className="city-name">
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className="date">
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className="temp">
                            {weatherData?.main?.temp}
                        </div>
                        <p className="description">
                            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                        </p>
                        <div className="weather-info">
                            <div className="column">
                                <div>
                                    <p>Wind Speed</p>
                                    <p className="wind">{weatherData?.wind?.speed}</p>
                                </div>
                            </div>
                            <div className="column">
                                <div>
                                    <p>humidity</p>
                                    <p className="humidity">{weatherData?.main?.humidity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}