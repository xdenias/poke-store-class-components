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
  async getData() {
    const { data } = await api.get(`/plant`);
    const species = data.pokemon_species;
    let ar = [];
    this.setState({ pokemons: species });

    for (var i = 0; i < this.state.pokemons.length; i++) {
      let price = Math.floor(Math.random(data.length) * 100);
      ar.push(price);
    }
    this.setState({ preco: ar });
    console.log(this.state.pokemons);
  }
  addPokemon(index) {
    console.log(index);
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { preco } = this.state;

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
              <button className="wrapc_button">ADD</button>
            </div>

            {this.state.pokemons.map((valor, index) => {
              return (
                <div className="wrapc_box" key={valor.name}>
                  <img src="" alt="" />
                  <h1>{valor.name}</h1>
                  <h4>R${preco[index]},00</h4>
                  <button
                    className="wrapc_button"
                    onClick={() => {
                      this.addPokemon(preco[index]);
                    }}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              );
            })}
          </section>
          <section className="wrapd">
            <h1>Carrinho</h1>
            <aside className="Itens"></aside>
            <h3>Total</h3>
            <button>Finalizar</button>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
