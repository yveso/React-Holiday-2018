import React, { useState } from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";
import ErrorBoundary from "./ErrorBoundary";

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

function PokemonList({ renderItem }) {
  return (
    <ul>
      {PokemonCollectionResource.read().results.map(pokemon =>
        renderItem({ id: pokemon.url.split("/")[6], ...pokemon })
      )}
    </ul>
  );
}

function App() {
  let [selectedPokemonId, setSelectedPokemonID] = useState(0);

  return (
    <div>
      <h1>React Holiday 2018: Day 10</h1>
      <hr />
      <strong>Selected Pokemon ID: {selectedPokemonId}</strong>
      <hr />
      <ErrorBoundary
        fallback={
          <div>
            Ooops{" "}
            <span role="img" aria-label="sad face">
              😢
            </span>
          </div>
        }
      >
        <React.Suspense fallback={<div>...loading</div>}>
          <PokemonList
            renderItem={pokemon => (
              <PokemonListItem
                onClick={() => setSelectedPokemonID(pokemon.id)}
                key={pokemon.id}
              >
                {pokemon.name}
              </PokemonListItem>
            )}
          />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
