import React from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";

let PokemonCollectionResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/").then(res => res.json())
);

function PokemonListItem({ className, component: Component = "li", ...props }) {
  return (
    <Component
      className={["pokemon-list-item", className].join(" ")}
      {...props}
    />
  );
}

function PokemonList() {
  return (
    <ul>
      {PokemonCollectionResource.read().results.map(pokemon => (
        <PokemonListItem key={pokemon.name}>{pokemon.name}</PokemonListItem>
      ))}
    </ul>
  );
}

let PokemonDetailResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/25/").then(res => res.json())
);

function PokemonDetail() {
  return (
    <div>
      {[PokemonDetailResource.read()].map(item => (
        <PokemonDetailComponent {...item} />
      ))}
    </div>
  );
}

function PokemonDetailComponent(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>
        Weight: <strong>{props.weight}</strong>
      </p>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>React Holiday 2018: Day 5</h1>
      <hr />
      <React.Suspense fallback={<div>loading details</div>}>
        <PokemonDetail />
      </React.Suspense>
      <hr />
      <React.Suspense fallback={<div>...loading</div>}>
        <PokemonList />
      </React.Suspense>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
