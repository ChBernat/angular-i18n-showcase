import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de-CH';
import localeEn from '@angular/common/locales/en';
import localePl from '@angular/common/locales/pl';
import { availableLocales } from 'src/env/available-locales';
import { env } from 'src/env/env';

export const initializeSupportedLocales = () => {
  registerLocaleData(localeEn, availableLocales.english);
  registerLocaleData(localeDe, availableLocales.german);
  registerLocaleData(localePl, availableLocales.polish);
  return env.defaultLocale;
};
