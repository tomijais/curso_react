import React, { Component } from "react";

export default class Weather extends Component {
  constructor(props) {
    super();
    this.state = {
      city: props.city,
      cityWeather: null,
      isLoading: true,
      cityExist: false,
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?appid=0f97f778280c1da915b85ba30be6fefe&units=metric&q=${this.state.city}`
    );
    const data = await response.json();

    if (data.cod === 404) {
      this.setState({
        cityWeather: null,
        isLoading: false,
        cityExist: false,
      });
    } else if (data.cod === 200) {
      this.setState({
        cityWeather: data,
        isLoading: false,
        cityExist: true,
      });
    }
  }

  searchCityWheather = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = form.city.value;
    this.setState({
      city: value,
    });
    this.getWeatherData();
    form.reset();
  };

  componentDidUpdate() {
    console.log(`Datos de clima de ${this.state.city}`);
    console.log(this.state.cityWeather ?? "No hay datos para mostrar");
  }

  async getWeatherData() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?appid=0f97f778280c1da915b85ba30be6fefe&units=metric&q=${this.state.city}`
    ).catch((e) => {
      console.log("no existe");
      this.setState({
        cityWeather: null,
        isLoading: false,
        cityExist: false,
      });
    });
    const data = await response.json();

    if (data.cod === 404) {
      console.log("no existe");
      this.setState({
        cityWeather: null,
        isLoading: false,
        cityExist: false,
      });
    } else if (data.cod === 200) {
      this.setState({
        cityWeather: data,
        isLoading: false,
        cityExist: true,
      });
    }
  }

  render() {
    const { city } = this.props;
    return (
      <div>
        <h2>{this.state.city}</h2>
        {!city && <h2>Comienza buscando una ciudad</h2>}
        {city && this.state.cityExist && this.state.isLoading && (
          <h2>Comienza buscando una ciudad</h2>
        )}

        <form action="" onSubmit={this.searchCityWheather}>
          <label htmlFor="city">Escriba una cuidad para buscar</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Escriba una cuidad"
          />
          <button type="submit">Buscar</button>
        </form>

        {this.state.cityWeather != null &&
          this.state.cityExist &&
          this.state.isLoading === false && (
            <div>
              <p>El nombre de la cuidad es: {this.state.city}</p>
              <p>
                La temperatura actual es de:{" "}
                {this.state.cityWeather?.main?.temp} grados
              </p>
              <p>
                La temperatura minima es de:{" "}
                {this.state.cityWeather?.main?.temp_min} grados
              </p>
              <p>
                La temperatura maxima es de:{" "}
                {this.state.cityWeather?.main?.temp_max} grados
              </p>
              <p>La humedad es de: {this.state.cityWeather?.main?.humidity}</p>
              <p>
                La sensation termica de:{" "}
                {this.state.cityWeather?.main?.feels_like}
              </p>
            </div>
          )}

        {this.state.isLoading === false &&
          this.state.cityExist === false &&
          this.state.weather && (
            <p>No se ha encontrado ninguna ciudad con este nombre</p>
          )}
      </div>
    );
  }
}
