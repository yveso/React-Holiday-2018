import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./error-boundary";
import Pokemon from "./pokemon";
import WindowWidthContext from "./window-width-context";

function useWindowWidth(initialWidth = window.innerWidth) {
  let [width, setWidth] = useState(initialWidth);
  useEffect(() => {
    let handler = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  });
  return width;
}

function App() {
  let [selectedPokemonId, setSelectedPokemonID] = useState(1);
  let width = useWindowWidth();

  return (
    <WindowWidthContext.Provider value={width}>
      <div>
        <h1>React Holiday 2018: Day 24</h1>
        <hr />

        <ErrorBoundary fallback={<Pokemon.ErrorFallback />}>
          {selectedPokemonId > 0 ? (
            <React.Suspense
              maxDuration={300}
              fallback={<Pokemon.LoadDetailFallback />}
            >
              <div>
                <button type="button" onClick={() => setSelectedPokemonID(0)}>
                  <span role="img" aria-label="back symbol">
                    👈
                  </span>{" "}
                  Back
                </button>
                <Pokemon.Detail pokemonId={selectedPokemonId} />
              </div>
            </React.Suspense>
          ) : (
            <React.Suspense
              maxDuration={300}
              fallback={<Pokemon.LoadListFallback />}
            >
              <ul>
                <Pokemon.List>
                  {pokemon => (
                    <Pokemon.ListItem
                      onClick={() => setSelectedPokemonID(pokemon.id)}
                      key={pokemon.id}
                    >
                      {pokemon.name}
                    </Pokemon.ListItem>
                  )}
                </Pokemon.List>
              </ul>
            </React.Suspense>
          )}
        </ErrorBoundary>
      </div>
    </WindowWidthContext.Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
