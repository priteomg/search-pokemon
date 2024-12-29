"use client";
import { gql, useSuspenseQuery, TypedDocumentNode } from "@apollo/client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { PokemonDetail } from "../pokemon.interface";

function Detail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pokemonName = searchParams.get("name");

  const query: TypedDocumentNode<{ pokemon: PokemonDetail }> = gql`
    query Pokemon {
      pokemon(name: "${pokemonName}") {
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
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
        evolutions {
          id
          number
          name
          classification
          types
          image
        }
        evolutionRequirements {
          amount
          name
        }
      }
    }
  `;

  const { data } = useSuspenseQuery(query);

  const onClickEvo = (name: string) => {
    router.push(`/detail?name=${name}`);
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto my-2">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-2">
          <div className="bg-white border rounded-lg border-white overflow-hidden  col-span-1 flex justify-center">
            <img
              src={data.pokemon.image}
              alt="pokemon"
              className="object-contain"
            />
          </div>
          <div className="lg:col-span-2 border rounded-lg border-white  p-4 flex flex-col gap-2">
            <div className="flex gap-4">
              <p className="text-label">Name:</p>
              <p>{data.pokemon.name}</p>
            </div>
            <div className="flex gap-4">
              <p className="text-label">Classification:</p>
              <p>{data.pokemon.classification}</p>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <p className="text-label">Types:</p>
              {data.pokemon.types.map((type: string) => (
                <div
                  className={`badge badge-outline type ${type.toLocaleLowerCase()}`}
                  key={type}
                >
                  {type}
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <p className="text-label">Resistant:</p>
              {data.pokemon.resistant.map((item: string) => (
                <div
                  className={`badge badge-outline type ${item.toLocaleLowerCase()}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <p className="text-label">Weaknesses:</p>
              {data.pokemon.weaknesses.map((item: string) => (
                <div
                  className={`badge badge-outline type ${item.toLocaleLowerCase()}`}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <p className="text-label">Weigth:</p>
              <div className="flex flex-col">
                <p>Max: {data.pokemon.weight.maximum}</p>

                <p>Min: {data.pokemon.weight.minimum}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <p className="text-label">Height:</p>
              <div className="flex flex-col">
                <p>Max: {data.pokemon.height.maximum}</p>

                <p>Min: {data.pokemon.height.minimum}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className="text-label">Max HP:</p>
              <p>{data.pokemon.maxHP}</p>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2  lg:col-span-3 border rounded-lg border-white p-4">
            <h2 className="text-2xl font-bold mb-4">Attacks</h2>
            <div className="flex gap-4 mb-4">
              <div className="grid grid-cols-2 md:grid-cols-8 gap-4 w-full">
                <div className="text-xl font-semibold col-span-2">Fast</div>

                {data.pokemon.attacks.fast.map((item) => (
                  <div key={item.name} className="col-span-1 md:col-span-2">
                    <p>{item.name}</p>
                    <div
                      className={`badge badge-outline type ${item.type.toLocaleLowerCase()}`}
                    >
                      {item.type}
                    </div>
                    <p>
                      <span className="text-label">DMG:</span> {item.damage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid grid-cols-2 md:grid-cols-8 gap-4 w-full">
                <div className="text-xl font-semibold col-span-2">Special</div>
                {data.pokemon.attacks.special.map((item) => (
                  <div key={item.name} className="col-span-1 md:col-span-2">
                    <p>{item.name}</p>

                    <div
                      className={`badge badge-outline type ${item.type.toLocaleLowerCase()}`}
                    >
                      {item.type}
                    </div>
                    <p>
                      {" "}
                      <span className="text-label">DMG: </span>
                      {item.damage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 border rounded-lg border-white p-4">
            <h2 className="text-2xl font-bold mb-4">Evolutions</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {data.pokemon.evolutions && data.pokemon.evolutions?.length ? (
                data.pokemon.evolutions.map((item) => (
                  <div key={item.id} className="flex gap-2 items-center">
                    <img
                      src={item.image}
                      alt="pokemon"
                      className="object-contain w-32 h-32 rounded-lg bg-white cursor-pointer"
                      onClick={() => onClickEvo(item.name)}
                    />
                    <div>
                      <p
                        className="font-bold underline  cursor-pointer"
                        onClick={() => onClickEvo(item.name)}
                      >
                        {item.name}
                      </p>

                      {item.types.map((item: string) => (
                        <div
                          className={`badge badge-outline type ${item.toLocaleLowerCase()} mr-2`}
                          key={item}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div>This seems to be the highest level of evolution.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
