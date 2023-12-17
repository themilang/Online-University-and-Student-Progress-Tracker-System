import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "./store/index.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorBoundaryPage from "./pages/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ErrorBoundary fallback={<ErrorBoundaryPage />}> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <App />
            </GoogleOAuthProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    {/* </ErrorBoundary> */}
  </React.StrictMode>
);
