import React from "react";
import ReactDOM from "react-dom";
import { createCache, createResource } from "react-cache";

let cache = createCache();
let PokemonCollectionResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/").then(res => res.json())
);

function PokemonListItem({ className, component: Component = "li", ...props }) {
  return (
    <Component
      className={["pokeman-list-item", className].join(" ")}
      {...props}
    />
  );
}

function PokemonList() {
  return (
    <ul>
      {PokemonCollectionResource.read(cache).results.map(pokemon => (
        <PokemonListItem key={pokemon.name}>{pokemon.name}</PokemonListItem>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>React Holiday 2018: Day 3</h1>
      <React.Suspense fallback={<div>...loading</div>}>
        <PokemonList />
      </React.Suspense>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
