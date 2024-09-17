import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/store/store";
import Router from "./Router/Router";
import NotificationProvider from "./components/common/NotificationProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <NotificationProvider>
        <Router />
      </NotificationProvider>
    </PersistGate>
  </Provider>
);
