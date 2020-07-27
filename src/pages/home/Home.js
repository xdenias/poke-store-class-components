import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <React.Fragment>
      <main id="content">
        <section className="content_plant">
          <h1>
            <Link to="/store1">Store 1</Link>
          </h1>
        </section>
        <section className="content_water">
          <h1>
            <Link to="/store2">Store 2</Link>
          </h1>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
