"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Pokemon } from "../app/pokemon.interface";

interface Props {
  data: Pokemon;
}

const PokemonCard = ({ data }: Props) => {
  const router = useRouter();
  const onClickCard = (data: Pokemon) => {
    router.push(`/detail?name=${data.name}`);
  };

  return (
    <div
      className="card bg-base-100 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-105 transition overflow-hidden"
      onClick={() => onClickCard(data)}
    >
      <img
        src={data.image}
        alt="pokemon"
        className="h-[250px] bg-white object-contain"
      />

      <div className="card-body p-5 gap-3">
        <div className="flex justify-between items-end">
          <h2 className="card-title">{data.name}</h2>
          <h2>{data.maxHP} HP</h2>
        </div>

        <div className="card-actions items-center">
          <div>Types</div>
          {data.types.map((type: string) => (
            <div
              className={`badge badge-outline type ${type.toLocaleLowerCase()}`}
              key={type}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
