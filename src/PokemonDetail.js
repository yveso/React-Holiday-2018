import React from "react";
import { unstable_createResource as createResource } from "react-cache";

let PokemonResource = createResource(id =>
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json())
);

function PokemonDetail({ pokemonId: id }) {
  let pokemon = PokemonResource.read(id);
  return (
    <article>
      <h1>It's {pokemon.name}</h1>
      <img src={pokemon.sprites["front_default"]} alt={pokemon.name} />
    </article>
  );
}

export default PokemonDetail;
