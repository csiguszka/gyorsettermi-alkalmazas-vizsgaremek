"use client";

import { persistor, store } from "@/state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}
