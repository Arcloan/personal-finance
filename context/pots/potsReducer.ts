import { Pot, PotAction } from "./potsTypes";

export function potsReducer(state: Pot[], action: PotAction): Pot[] {
   switch (action.type) {
    case 'ADD_POT':
      return [...state, action.payload];
    case 'UPDATE_POT':
      return state.map(pot =>
        pot.name === action.payload.name ? action.payload.updatedPot : pot
      );
    case 'DELETE_POT':
      return state.filter(pot => pot.name !== action.payload.name);
    case 'UPDATE_POT_AMOUNT':
      return state.map((pot) =>
        pot.name === action.payload.name
          ? { ...pot, total: action.payload.newAmount }
          : pot
      );
    default:
      return state;
  }
}