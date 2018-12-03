import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function PokemonListItem(props) {
  return <li {...props} />;
}

function App() {
  return (
    <div>
      <h1>React Holiday</h1>
      <ul>
        <PokemonListItem>Pokemon</PokemonListItem>
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
