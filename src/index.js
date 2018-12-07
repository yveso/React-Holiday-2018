import React from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";

let PokemonCollectionResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon-wahwah/").then(res => res.json())
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || <div>Something went wrong...</div>;
    }

    return this.props.children;
  }
}

let PokemonDetailResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/25/").then(res => res.json())
);

function PokemonDetail() {
  return (
    <div>
      {[PokemonDetailResource.read()].map(item => (
        <PokemonDetailComponent key={item.name} {...item} />
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
      <h1>React Holiday 2018: Day 6</h1>
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
          <PokemonList />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
