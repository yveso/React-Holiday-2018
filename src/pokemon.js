import React, { useContext } from "react";
import { unstable_createResource as createResource } from "react-cache";
import sleep from "sleep-promise";
import "./pokemon.css";
import WindowWidthContext from "./window-width-context";

let Resource = createResource(
  id =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(res => res.json())
  //.then(sleep(2000))
);

const ImageResource = createResource(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    })
);

function Img({ src, alt, ...rest }) {
  return <img src={ImageResource.read(src)} alt={alt} {...rest} />;
}

function Detail({ pokemonId: id }) {
  let pokemon = Resource.read(id);
  let width = useContext(WindowWidthContext);

  function TypeItem({ style, ...props }) {
    return (
      <li
        style={{
          backgroundColor: "gray",
          color: "white",
          display: "inline-flex",
          marginRight: ".25em",
          borderRadius: ".25em",
          padding: ".5em 1em",
          ...style
        }}
        {...props}
      />
    );
  }

  return (
    <article>
      <strong>width: {width}</strong>
      <section>
        <h1>It's {pokemon.name}</h1>
        <React.Suspense maxDuration={500} fallback="Loading image">
          <Img src={pokemon.sprites["front_default"]} alt={pokemon.name} />
        </React.Suspense>
      </section>
      <section>
        <h2>Types</h2>
        <ul style={{ padding: 0 }}>
          {pokemon.types.map(({ type }) => {
            switch (type.name) {
              case "grass":
                return (
                  <TypeItem style={{ backgroundColor: "green" }}>
                    {type.name}
                  </TypeItem>
                );
              case "poison":
                return (
                  <TypeItem style={{ backgroundColor: "purple" }}>
                    {type.name}
                  </TypeItem>
                );
              default:
                return <TypeItem>{type.name}</TypeItem>;
            }
          })}
        </ul>
      </section>
      <section>
        <dl>
          <dl>Height</dl>
          <dd>{pokemon.height}</dd>
          <dl>Weight</dl>
          <dd>{pokemon.height}</dd>
          <dl>Abilities</dl>
          <dd>
            {pokemon.abilities.map(({ ability }) => ability.name).join(", ")}
          </dd>
        </dl>
      </section>
      <section>
        <h2>Stats</h2>
        <table>
          <tbody>
            <tr>
              {pokemon.stats.map(({ base_stat }, i) => (
                <td key={base_stat.toString() + i}>{base_stat}</td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              {pokemon.stats.map(({ stat }, i) => (
                <th key={stat.name + i}>{stat.name}</th>
              ))}
            </tr>
          </tfoot>
        </table>
      </section>
    </article>
  );
}

let CollectionResource = createResource(() =>
  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(res => res.json())
    //.then(sleep(1000))
    .then(res => ({
      ...res,
      results: res.results.map(pokemon => ({
        id: pokemon.url.split("/")[6],
        ...pokemon
      }))
    }))
);

function ListItem({ className, component: Component = "li", ...props }) {
  return (
    <Component
      className={["pokemon-list-item", className].join(" ")}
      {...props}
    />
  );
}

function List({ children }) {
  return CollectionResource.read().results.map(children);
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
