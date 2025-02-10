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
      <PersistGate
        // loading={
        //   <div className="flex items-center justify-center h-screen">
        //     Betöltés...
        //   </div>
        // }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
