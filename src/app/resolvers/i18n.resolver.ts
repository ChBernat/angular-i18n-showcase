import { Injectable } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { Resolve } from '@angular/router';
import { availableLocales } from 'src/env/available-locales';
import { env } from 'src/env/env';
import { LanguageService } from '../services/language/language.service';

@Injectable({
  providedIn: 'root',
})
export class I18nResolver implements Resolve<boolean> {
  constructor(private languageService: LanguageService) {}
  resolve(): Promise<boolean> {
    const languageCode = this.getLocaleFromLocalStorage() || env.defaultLocale;
    return this.initializeLanguage(languageCode);
  }

  private getLocaleFromLocalStorage(): availableLocales | undefined {
    return this.languageService.language;
  }

  private initializeLanguage(languageCode: availableLocales): Promise<boolean> {
    return fetch(`/assets/locale/${languageCode}.json`)
      .then((response) => response.json())
      .then((response) => {
        console.log(`language ${languageCode}`, response);
        this.languageService.language = languageCode;
        loadTranslations(response);
      })
      .then(() => true);
  }
}
