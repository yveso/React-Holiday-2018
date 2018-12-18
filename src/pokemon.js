import React from "react";
import { unstable_createResource as createResource } from "react-cache";
import sleep from "sleep-promise";

let Resource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(sleep(2000))
);

function Detail({ pokemonId: id }) {
  let pokemon = Resource.read(id);
  return (
    <article>
      <h1>It's {pokemon.name}</h1>
      <img src={pokemon.sprites["front_default"]} alt={pokemon.name} />
    </article>
  );
}

let CollectionResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    .then(sleep(1000))
);

function ListItem({ className, component: Component = "li", ...props }) {
  return (
    <Component
      className={["pokemon-list-item", className].join(" ")}
      {...props}
    />
  );
}

function List({ renderItem }) {
  return CollectionResource.read().results.map(pokemon =>
    renderItem({ id: pokemon.url.split("/")[6], ...pokemon })
  );
}

function ErrorFallback() {
  return (
    <div>
      Ooops{" "}
      <span role="img" aria-label="sad face">
        😢
      </span>
    </div>
  );
}

function LoadDetailFallback() {
  return <div>Loading details</div>;
}

function LoadListFallback() {
  return (
    <div>
      <h1>Gonna fetch 'em all!</h1>
    </div>
  );
}

export default {
  Detail,
  ListItem,
  List,
  ErrorFallback,
  LoadDetailFallback,
  LoadListFallback
};
