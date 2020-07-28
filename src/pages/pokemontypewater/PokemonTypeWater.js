import React, { Component } from "react";
import api from "../../services/api";
import Modal from "../../components/Modal";
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
      show: false,
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
  showModal() {
    this.setState({
      show: !this.state.show,
    });
  }
  resetPrices() {
    localStorage.removeItem("dataw");
    this.setState({
      priceAside: [],
    });
    this.getData();
  }
  storeData() {
    const { priceAside } = this.state;
    localStorage.setItem("dataw", JSON.stringify(priceAside));
    // window.location.reload();
  }
  onClose(e) {
    this.props.onClose && this.props.onClose(e);
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
    const { priceAside } = this.state;
    this.getData();
    let dataStore = localStorage.getItem("dataw");
    if (dataStore === null) {
      this.setState({ priceAside: priceAside });
    } else {
      console.log(dataStore);
      this.setState({ priceAside: JSON.parse(dataStore) });
    }
  }
  render() {
    const { preco, priceAside, pokemons, isShowCart, valueField } = this.state;
    return (
      <React.Fragment>
        <header id="tw_box_input">
          <nav className="tw_input_name">
            <input
              id="tw_search"
              className="tw_search"
              placeholder="Digite qual pokemon deseja procurar"
              value={valueField}
              onChange={(valueParameter) => {
                this.updatePokemons(valueParameter);
              }}
            ></input>
          </nav>
          <button
            className="tw_carrinho-button"
            onClick={() => {
              this.showCart();
            }}
          >
            Cart
          </button>
        </header>
        <main id="tw_container">
          <section className="tw_wrapc">
            <div className="tw_wrapc_box">
              <img src="" alt="" />
              <button className="tw_wrapc_button">ADD</button>
            </div>
            {pokemons.map((valor, index) => {
              return (
                <div className="tw_wrapc_box" key={valor.name}>
                  <img src={valor.img} alt={valor.name} />
                  <h1>{valor.name}</h1>
                  <h4>{this.currency(preco[index])}</h4>
                  <button
                    className="tw_wrapc_button"
                    onClick={() => {
                      this.addPokemon(preco[index], valor.name);
                      this.storeData();
                    }}
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              );
            })}
          </section>
          <aside className={`tw_wrapd ${isShowCart ? "active" : ""}`}>
            <h1>Carrinho</h1>
            <div className="tw_Itens">
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
            <div className="tw_total_tag">
              <h3>Total: </h3>
              <h3>{this.currency(this.totalPrice())}</h3>
            </div>
            <button
              className="tw_total_button"
              onClick={() => {
                this.showModal();
                this.resetPrices();
              }}
            >
              Finalizar
            </button>
            <Modal
              onClose={() => {
                this.showModal();
              }}
              show={this.state.show}
            >
              New pokemon, new adventure hahaha!
            </Modal>
          </aside>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
