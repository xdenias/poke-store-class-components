import React, { Component } from "react";
import api from "./services/api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      preco: [],
    };
  }

  async requestAPI(index) {
    const response = await (await api.get(`/plant`)).data.pokemon_species;
    this.setState({ pokemons: response });
    for (var i = 0; i < this.state.pokemons.length; i++) {
      this.state.preco[i] = Math.floor(
        Math.random(this.state.pokemons[i].valueOf) * 100
      );
    }
    return this.state.preco[index];
  }

  componentDidMount() {
    this.requestAPI();
  }

  render() {
    return (
      <React.Fragment>
        <header id="box_input">
          <nav className="input_name">
            <input></input>
          </nav>
        </header>
        <main id="container">
          <section className="wrapc">
            <div className="wrapc_box">
              <img src="" alt="" />
              <button className="wrapc_button">{this.state.preco}</button>
            </div>

            {this.state.pokemons.map((valor, index, x) => {
              return (
                <div className="wrapc_box" key={valor.name}>
                  <img src="" alt="" />
                  <h1>{valor.name}</h1>
                  <h4>precos</h4>
                  <button className="wrapc_button"></button>
                </div>
              );
            })}
          </section>
          <section className="wrapd">
            <h1>Carrinho</h1>
            <aside className="Itens">{/* <h4>{this.pokemons[0]}</h4> */}</aside>
            <h3>Total</h3>
            <button>Finalizar</button>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
