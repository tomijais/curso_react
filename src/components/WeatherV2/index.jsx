import React, {Component} from 'react';

const API_KEY = "0f97f778280c1da915b85ba30be6fefe";

class Weather extends Component {
	constructor(props) { 
		super(props); 
		this.state = {
			city: props.city,
			cityWeather: null,
			isLoading: true,
			cityExist: false,
		}
	}

	getWeather = async city => {
		const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}&appid=${API_KEY}`).then(response => response.json())
		return data;
	}

	setStates = () => {
	const { city } = this.state;
		if (city !== undefined) {
			this.getWeather(city)
				.then(data => {
					if (data.cod === 200) {
						this.setState({ cityWeather: data, isLoading: false, cityExist: true });
					}
					if (data.cod === 404) {
						this.setState({ isLoading: false, cityExist: false, cityWeather: null });
					}
				})
		}
	}

	searchCityWeather = async e => {
		e.preventDefault();

		const form = e.currentTarget;
		const cityName = form.cityName.value;
		
		await this.setState({ city: cityName, isLoading: true });

		await this.setStates();
			
		form.reset();
	}
	
	componentDidMount() {
		this.setStates();
	}

	componentDidUpdate() {
		console.log('Datos del clima de: ' + this.state.city);
		console.log(this.state.cityWeather ? this.state.cityWeather : 'No hay datos para esta ciudad');
	}

	render() {
		const { cityWeather, isLoading, city, cityExist } = this.state;
		return (
			<div>
				<h2>Weather</h2>
				
				<form onSubmit={this.searchCityWeather}>
					<label>Busca tu ciudad:</label> 
					<input type="text" name="cityName" /> 
					<button type="submit">Buscar</button>
				</form>

				{ !city && <h3>Comienza buscando una ciudad</h3> }

				{ isLoading && city && cityExist && <p>Cargando...</p> }
				{
					!isLoading && cityExist && cityWeather && <>
						<h2>
							{cityWeather.name}
							<img src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt="weather icon" width="20px" />
						</h2>
						<ul>
							<li>Temperatura actual: {cityWeather.main.temp.toFixed()}°C</li>
							<li>Sensación térmica: {cityWeather.main.feels_like.toFixed()}°C</li>
							<li>Humedad: {cityWeather.main.humidity}%</li>
							<li>Máxima: {cityWeather.main.temp_max.toFixed()}°C</li>
							<li>Mínima: {cityWeather.main.temp_min.toFixed()}°C</li>
						</ul>
					</>
				}

				{ !isLoading && !cityExist && <p>No se ha encontrado ninguna ciudad con este nombre</p> }
			</div>
		)
	}
}

export default Weather;