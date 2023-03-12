import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language/language.service';
import { availableLocales } from 'src/env/available-locales';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css'],
})
export class ShowcaseComponent {
  public title = $localize`angular-i18n-showcase`;
  availableLanguages = availableLocales;
  chosenLanguage = this.languageService.language;
  mySubscription: any;

  constructor(private readonly languageService: LanguageService) {}

  changeLanguage({ target: { value } }: any) {
    this.languageService.language = value;
    window.location.reload();
  }
}
