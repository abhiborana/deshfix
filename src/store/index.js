import { create } from "zustand";
import { devtools, redux } from "zustand/middleware";
import { reducer } from "./reducer";

export const initialState = {
  loading: false,
  error: null,
  user: null,
  authModalOpen: false,
  post: null,
};

const useDeshfixStore = create(
  devtools(redux(reducer, initialState), {
    name: "useDeshfixStore",
    enabled:
      (typeof window !== "undefined" &&
        Boolean(window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])) ||
      process.env.VERCEL_ENV !== "production",
  })
);

export default useDeshfixStore;
