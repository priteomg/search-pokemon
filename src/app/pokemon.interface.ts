export interface Pokemon {
  id: string;
  number: number;
  name: string;
  weight: {
    minimum: number;
    maximum: number;
  };
  height: {
    minimum: number;
    maximum: number;
  };
  classification: string;
  types: [string];
  resistant: [string];
  weaknesses: [string];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
}

export interface PokemonDetail extends Pokemon {
  attacks: {
    fast: [
      {
        name: string;
        type: string;
        damage: number;
      }
    ];
    special: [
      {
        name: string;
        type: string;
        damage: number;
      }
    ];
  };
  evolutions: [PokemonDetail];
}
