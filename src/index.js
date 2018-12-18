import React, { useState } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./error-boundary";
import Pokemon from "./pokemon";

function App() {
  let [selectedPokemonId, setSelectedPokemonID] = useState(1);

  return (
    <div>
      <h1>React Holiday 2018: Day 13</h1>
      <hr />

      <ErrorBoundary fallback={<Pokemon.ErrorFallback />}>
        <React.Suspense
          maxDuration={1000}
          fallback={<Pokemon.LoadDetailFallback />}
        >
          <Pokemon.Detail pokemonId={selectedPokemonId} />
        </React.Suspense>
        <hr />
        <React.Suspense
          maxDuration={1000}
          fallback={<Pokemon.LoadListFallback />}
        >
          <ul>
            <Pokemon.List
              renderItem={pokemon => (
                <Pokemon.ListItem
                  onClick={() => setSelectedPokemonID(pokemon.id)}
                  key={pokemon.id}
                >
                  {pokemon.name}
                </Pokemon.ListItem>
              )}
            />
          </ul>
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
