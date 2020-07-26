import React, { Component } from "react";
import api from "../../services/api";
import "../../pages/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      preco: [],
      priceAside: [],
      pokemonAside: [],
      totalP: 0,
      isShowCart: false,
    };
  }
  async getData() {
    const { data } = await api.get(`/plant`);
    const species = data.pokemon_species;
    let ar = [];
    const speciesWithSprites = species.map((pokemon) => {
      const pokemonID = pokemon.url.match(/\d+/g)[1];
      return {
        ...pokemon,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`,
      };
    });
    this.setState({ pokemons: speciesWithSprites });
    for (var i = 0; i < species.length; i++) {
      let price = Math.floor(Math.random(data.length) * 100);
      ar.push(price);
    }
    this.setState({ preco: ar });
  }
  addPokemon(value, name) {
    const { priceAside } = this.state;
    this.setState({
      priceAside: [...priceAside, { name: name, price: value }],
    });
  }
  currency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }
  totalPrice() {
    const { priceAside } = this.state;
    return priceAside
      .map((item) => item && item.price)
      .reduce((a, b) => a + b, 0);
  }
  showCart() {
    const { isShowCart } = this.state;
    this.setState({ isShowCart: !isShowCart });
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    const { preco, priceAside, pokemons, isShowCart } = this.state;
    return (
      <React.Fragment>
        <header id="box_input">
          <nav className="input_name">
            <input></input>
          </nav>
          <button
            className="carrinho-button"
            onClick={() => {
              this.showCart();
            }}
          >
            Cart
          </button>
        </header>
        <main id="container">
          <section className="wrapc">
            <div className="wrapc_box">
              <img src="" alt="" />
              <button className="wrapc_button">ADD</button>
            </div>
            {pokemons.map((valor, index) => {
              return (
                <div className="wrapc_box" key={valor.name}>
                  <img src={valor.img} alt={valor.name} />
                  <h1>{valor.name}</h1>
                  <h4>{this.currency(preco[index])}</h4>
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
          <aside className={`wrapd ${isShowCart ? "active" : ""}`}>
            <h1>Carrinho</h1>
            <div className="Itens">
              <table>
                <tbody>
                  {priceAside.map((item) => {
                    return (
                      <tr key={`${item.name}-${item.price}`}>
                        <td>{item.name}</td>
                        <td>R$ {item.price},00</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="total_tag">
              <h3>Total: </h3>
              <h3>{this.currency(this.totalPrice())}</h3>
            </div>
            <button>Finalizar</button>
          </aside>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
