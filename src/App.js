import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Productos from "./components/Productos";
import Footer from "./components/Footer";

const App = () => (
  <div className="App">
    <Navbar />
    <Banner />
    <Productos name="parlante"/>
    <Footer />
  </div>
);

export default App;
