import React, { Component } from "react";
import api from "./services/api";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: {},
      nome: "Squirtle",
      preco: "R$180,00",
    };
    // this.listagemHome = this.listagemHome.bind(this);
    // this.produtoRedirecionamento = this.produtoRedirecionamento.bind(this);
  }

  async requestAPI() {
    const response = JSON.stringify(await api.get(`/plant`));
    // console.log(response);
    this.setState({ pokemons: [...response.data] });
    console.log(this.state.pokemons);
  }
  componentDidMount() {
    this.requestAPI();
  }
  render() {
    return (
      <React.Fragment>
        <body>
          <header id="box_input">
            <nav className="input_name">
              <input></input>
            </nav>
          </header>
          <main id="container">
            <section className="wrapc">
              <div className="wrapc_box">
                <img src="" alt="" />
                <button className="wrapc_button"></button>
              </div>
              <div className="wrapc_box">
                <img src="" alt="" />
                <h3>{this.state.nome}</h3>
                <h3>{this.state.preco}</h3>
                <button className="wrapc_button"></button>
              </div>
              <div className="wrapc_box">
                <img src="" alt="" />
                <h3>{this.state.nome}</h3>
                <h3>{this.state.preco}</h3>
                <button className="wrapc_button"></button>
              </div>
              <div className="wrapc_box">
                <img src="" alt="" />
                <h3>{this.statenome}</h3>
                <h3>{this.statepreco}</h3>
                <button className="wrapc_button"></button>
              </div>
              <div className="wrapc_box">
                <img src="" alt="" />
                <h3>{this.state.nome}</h3>
                <h3>{this.state.preco}</h3>
                <button className="wrapc_button"></button>
              </div>
              <div className="wrapc_box">
                <img src="" alt="" />
                <h3>{this.state.nome}</h3>
                <h3>{this.state.preco}</h3>
                <button className="wrapc_button"></button>
              </div>
            </section>
            <section className="wrapd">
              <h1>Carrinho</h1>
              <aside className="Itens">
                <h4>{this.state.nome}</h4>
              </aside>
              <h3>Total</h3>
              <button>Finalizar</button>
            </section>
          </main>
        </body>
      </React.Fragment>
    );
  }
}

export default App;
