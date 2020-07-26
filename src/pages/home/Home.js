import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <ul>
        <li>
          <Link to="/loja1">Loja 1</Link>
        </li>
        <li>
          <Link to="/loja2">Loja 2</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Home;
