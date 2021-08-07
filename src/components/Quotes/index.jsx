import React, { Component } from "react";
import quotesDB from "../../quotes.json";

class Quotes extends Component {
  constructor() {
    super();
    this.state = {
      quotesList: [],
      quoteToShow: null,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        quotesList: quotesDB,
      });

      this.setState({ quoteToShow: this.state.quotesList[Math.floor(Math.random() * this.state.quotesList.length)] });
    }, 3000);
  }

  getRandomQuote() {
    this.setState({ quoteToShow: this.state.quotesList[Math.floor(Math.random() * this.state.quotesList.length)] })

  }

  render() {
    const { quotesList, quoteToShow } = this.state;
    return (
      <div>
        {!quotesList.length && <h3>Cargando...</h3>}
        {quoteToShow && <h3>{quoteToShow.text}</h3>}
        {quoteToShow && <p>{quoteToShow.author}</p>}

        <button onClick={() => this.getRandomQuote()}>Get random quote</button>
      </div>
    );
  }
}

export default Quotes;
