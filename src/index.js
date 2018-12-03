import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function PokemonListItem({ className, component: Component = "li", ...props }) {
  return (
    <Component
      className={["pokeman-list-item", className].join(" ")}
      {...props}
    />
  );
}

let characterData = [
  { name: "Pikachu" },
  { name: "Bisasam" },
  { name: "Eevee" }
];

function App() {
  return (
    <div>
      <h1>React Holiday 2018</h1>
      <ul>
        {characterData.map(item => (
          <PokemonListItem>{item.name}</PokemonListItem>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
