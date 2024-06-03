"use client"
import { store } from "@/lib/store";
// import { useRef } from "react";
import { Provider } from "react-redux";

export function StoreProvider({ children }) {
  // const storeref = useRef()
  // if (!storeref.current){
  //   storeref.current = store;
  // }
  return <Provider store={store}>{children}</Provider>;
}