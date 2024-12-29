"use client";

import { Pokemon } from "@/app/pokemon.interface";
import PokemonCard from "@/components/Card";

import { gql, useSuspenseQuery, TypedDocumentNode } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export default function Home() {
  const query: TypedDocumentNode<{ pokemons: Pokemon[] }> = gql`
    query Pokemons {
      pokemons(first: -1) {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        maxHP
        image
      }
    }
  `;

  const { data } = useSuspenseQuery(query);

  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);

  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    if (search) {
      setPokemonsList(
        data.pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setPokemonsList(data.pokemons);
    }
  }, [search, data]);

  return (
    <div>
      <div
        className="hero h-96"
        style={{
          backgroundImage:
            "url(https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/pokemon-chromebook-wallpaper.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">Pokemon Finder</h1>
            <p className="mb-5">
              Find your favourite pokemons right here and learn what they are.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto my-6">
        {search && (
          <p className="text-2xl font-bold mb-6">
            Result of : {search} ({pokemonsList.length})
          </p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {pokemonsList.length === 0 ? (
            <div className="col-span-4 flex justify-center w-full">
              Pokemon not found
            </div>
          ) : (
            pokemonsList.map((item) => (
              <Fragment key={item.id}>
                <PokemonCard data={item} />
              </Fragment>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
