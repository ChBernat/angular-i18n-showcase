import { Injectable } from '@angular/core';
import { availableLocales } from 'src/env/available-locales';
import { env } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public static LOCAL_STORAGE_KEY = 'languageCode';
  public set language(locale: availableLocales) {
    localStorage.setItem(
      LanguageService.LOCAL_STORAGE_KEY,
      locale || env.defaultLocale
    );
  }
  public get language(): availableLocales {
    return localStorage.getItem(
      LanguageService.LOCAL_STORAGE_KEY
    ) as availableLocales;
  }
}
