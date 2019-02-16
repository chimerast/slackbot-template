import { config } from "dotenv";
import i18next from "i18next";
import { install } from "source-map-support";

export function prepare(locales?: any) {
  config();
  install();
  if (locales) {
    i18next.init({ resources: locales, fallbackLng: "en" });
  }
}
