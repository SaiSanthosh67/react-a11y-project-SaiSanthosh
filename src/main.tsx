import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App.tsx";
import { messages, defaultLocale } from "./locales";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IntlProvider locale={defaultLocale} messages={messages[defaultLocale]}>
      <App />
    </IntlProvider>
  </StrictMode>
);
