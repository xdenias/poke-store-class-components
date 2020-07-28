import React, { Component } from "react";
import api from "../../services/api";
import "./PokemonTypeWater.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      preco: [],
      priceAside: [],
      pokemonAside: [],
      valueField: "",
      pokemonsFitered: [],
      isShowCart: false,
    };
  }
  async getData() {
    const { data } = await api.get(`/water1`);
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
  updatePokemons(valueParameter) {
    const { valueField, pokemons } = this.state;
    let { pokemonsFitered } = this.state;
    this.setState({ valueField: valueParameter.target.value });
    console.log(valueField);
    if (valueField === "") {
      this.getData();
    } else {
      pokemonsFitered = pokemons.filter((eachPokemon) =>
        eachPokemon.name.includes(valueField)
      );
    }

    this.setState({ pokemons: pokemonsFitered });
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
    const { preco, priceAside, pokemons, isShowCart, valueField } = this.state;
    return (
      <React.Fragment>
        <header id="sw_box_input">
          <nav className="sw_input_name">
            <input
              id="search"
              className="search"
              placeholder="Digite qual pokemon deseja procurar"
              value={valueField}
              onChange={(valueParameter) => {
                this.updatePokemons(valueParameter);
              }}
            ></input>
          </nav>
          <button
            className="sw_carrinho-button"
            onClick={() => {
              this.showCart();
            }}
          >
            Cart
          </button>
        </header>
        <main id="sw_container">
          <section className="sw_wrapc">
            <div className="sw_wrapc_box">
              <img src="" alt="" />
              <button className="sw_wrapc_button">ADD</button>
            </div>
            {pokemons.map((valor, index) => {
              return (
                <div className="sw_wrapc_box" key={valor.name}>
                  <img src={valor.img} alt={valor.name} />
                  <h1>{valor.name}</h1>
                  <h4>{this.currency(preco[index])}</h4>
                  <button
                    className="sw_wrapc_button"
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
          <aside className={`sw_wrapd ${isShowCart ? "active" : ""}`}>
            <h1>Carrinho</h1>
            <div className="sw_Itens">
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
            <div className="sw_total_tag">
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
