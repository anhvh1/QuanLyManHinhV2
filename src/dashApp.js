import React from "react";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";
import PublicRoutes from "./router";
import { ThemeProvider } from "styled-components";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import themes from "./settings/themes";
// import AppLocale from './languageProvider';
import config, {
  getCurrentLanguage,
} from "./containers/LanguageSwitcher/config";
import { themeConfig } from "./settings";
import DashAppHolder from "./dashAppStyle";
import Boot from "./redux/boot";
import "./index.css";
const DashApp = () => (
  <IntlProvider locale={"en"}>
    <ThemeProvider theme={themes[themeConfig.theme]}>
      <DashAppHolder>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
      </DashAppHolder>
    </ThemeProvider>
  </IntlProvider>
);

Boot(history, store)
  .then(() => ClearCacheComponent())
  .catch((error) => console.error(error));

export default DashApp;
