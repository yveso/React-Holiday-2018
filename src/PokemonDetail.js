import React from "react";
import { unstable_createResource as createResource } from "react-cache";

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
