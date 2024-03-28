import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { ActionMap } from "../types";

export type LangageState = {
  langage: string | null;
};

export const langageInitialState: LangageState = {
  langage: null,
};

export enum LangageActionsType {
  SET_LANGAGE = "SET_LANGAGE",
}

export type LangagePayload = {
  [LangageActionsType.SET_LANGAGE]: string;
};

export type LangageActions =
  ActionMap<LangagePayload>[keyof ActionMap<LangagePayload>];

const langageReducer = (
  state: LangageState,
  action: LangageActions,
): LangageState => {
  switch (action.type) {
    case LangageActionsType.SET_LANGAGE: {
      return {
        ...state,
        langage: action.payload,
      };
    }
    default:
      throw new Error(`Unknown action: ${action}`);
  }
};

export const StateContext = createContext<LangageState | undefined>(
  langageInitialState,
);

export const DispatchContext = createContext<
  Dispatch<LangageActions> | undefined
>(undefined);

interface LangageContextProviderProps {
  initialState?: LangageState;
}

export default function LangageContextProvider({
  children,
  initialState = langageInitialState,
}: PropsWithChildren<LangageContextProviderProps>) {
  const [state, dispatch] = useReducer(langageReducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

const NOT_WITHIN_A_GLOBAL_CONTEXT_PROVIDER =
  "Must be used within a LangageContextProvider";

/**
 * Get the current state store.
 * @returns The current state store.
 */
export function useLangageState(): LangageState {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(NOT_WITHIN_A_GLOBAL_CONTEXT_PROVIDER);
  }
  return context;
}

export function useLangageDispatch(): Dispatch<LangageActions> {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error(NOT_WITHIN_A_GLOBAL_CONTEXT_PROVIDER);
  }
  return context;
}
