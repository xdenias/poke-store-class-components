import React, { Component } from "react";
import api from "./services/api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      preco: [],
      priceAside: [],
      pokemonAside: [],
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
  }
  addPokemon(index, name) {
    const { priceAside, pokemonAside } = this.state;

    priceAside.push(name, index);
    this.setState({ priceAside: priceAside });
    console.log(priceAside);
  }
  // filterItems(query) {
  //   const { priceAside, pokemonAside } = this.state;
  //   return priceAside.filter((el) => {
  //     return el.toLowerCase.indexOf(query.toLowerCase()) > -1;
  //   });

  //   priceAside
  //     .filter((name) => name.includes("J"))
  //     .map((filteredName) => <li>{filteredName}</li>);
  // }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { preco, priceAside } = this.state;
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
                      this.addPokemon(preco[index], valor.name);
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
            <aside className="Itens">
              <table>
                <tbody>
                  <tr>
                    {this.state.priceAside.map((valor, index) => {
                      return <td>{priceAside[index]}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </aside>
            <h3>Total</h3>
            <button>Finalizar</button>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
