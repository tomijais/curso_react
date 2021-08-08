import React, { useState, useEffect, useRef } from "react"

const API_KEY = "f3a6a630b3259fd00e07ff09d222c32e"

const Weather = (props) => {
    const [city, setCity] = useState(props.city)
    const [cityWeather, setCityWeather] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [cityExist, setCityExist] = useState(false)

    const inputField = useRef(null)
    const formField = useRef(null)

    const getWeather = async (city) => {
        const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${API_KEY}`
        )
        const data = await response.json()
        return data
    }

    useEffect(() => {
        updateStates()
    }, [])

    const updateStates = async () => {
        if (city) {
            getWeather(city).then((data) => {
                if (data.cod === 200) {
                    setCityWeather(data)
                    setIsLoading(false)
                    setCityExist(true)
                }

                if (data.cod === 404) {
                    setCityWeather(null)
                    setIsLoading(false)
                    setCityExist(false)
                }
            })
        }
    }

    const searchCityWeather = async (e) => {
        e.preventDefault()
        setCity(inputField.current.value)
        setIsLoading(true)
        formField.current.reset()
    }



    // Component did update

    useEffect(() => {
        updateStates()
        console.log(`Se actualizo city: ${city}`)
        console.log(cityWeather ?? "No hay datos para esta ciudad")
    }, [city])

    return (
        <>
            {!city && <h3>Comienza buscando una ciudad</h3>}
            <form onSubmit={searchCityWeather} ref={formField}>
                <label>Busca tu ciudad:</label>
                <input type="text" name="cityName" ref={inputField} />
                <button type="submit">Buscar</button>
            </form>

            {isLoading && <p>Cargando...</p>}
            {!isLoading && cityExist && cityWeather && (
                <>
                    <h2>{cityWeather.name}</h2>
                    <br />
                    <img
                        src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
                        alt="weather icon"
                        width="50px"
                    />
                    <ul>
                        <li>
                            Temperatura actual:{" "}
                            {cityWeather.main.temp.toFixed()}°C
                        </li>
                        <li>
                            Sensación térmica:{" "}
                            {cityWeather.main.feels_like.toFixed()}°C
                        </li>
                        <li>Humedad: {cityWeather.main.humidity}%</li>
                        <li>Máxima: {cityWeather.main.temp_max.toFixed()}°C</li>
                        <li>Mínima: {cityWeather.main.temp_min.toFixed()}°C</li>
                    </ul>
                </>
            )}

            {!isLoading && !cityExist && (
                <p>No se ha encontrado ninguna ciudad con este nombre</p>
            )}
        </>
    )
}

export default Weather
