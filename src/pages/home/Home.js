import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <main id="content">
        <section className="content_plant">
          <h1>Pokemon tipo planta</h1>
        </section>
        <section className="content_water">
          <h1>Pokemon tipo água</h1>
        </section>
      </main>
      {/* <ul>
        <li>
          <Link to="/loja1">Loja 1</Link>
        </li>
        <li>
          <Link to="/loja2">Loja 2</Link>
        </li>
      </ul> */}
    </React.Fragment>
  );
};

export default Home;
