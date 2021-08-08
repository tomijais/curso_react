import "./App.css"
// import Navbar from "./components/Navbar"
// import Banner from "./components/Banner"
// import Productos from "./components/Productos"
import Footer from "./components/Footer"
 import db from "./rick_and_morty.json"
 import Characters from "./components/Characters"
import Quotes from "./components/Quotes"
// import Weather from "./components/WeatherV2";
import WeatherHooks from "./components/WeatherHooks"

const App = () => (
    <div className="App">
        {/* <Navbar /> */}
        <Quotes />
        <br/>
        <hr/>
        <br/>
        
        <WeatherHooks city="Buenos Aires"/>
        {/* <Weather city="Buenos aires"/> */}
        {/* <Banner /> */}
        <Characters characters={db} />
        {/* <Productos name="parlante" /> */}
        <Footer />
    </div>
)

export default App
