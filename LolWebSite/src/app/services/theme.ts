import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private darkMode = new BehaviorSubject<boolean>(false);
  public isDarkMode = this.darkMode.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.setDarkMode(JSON.parse(savedTheme));
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setDarkMode(systemPrefersDark);
    }
  }

  toggleDarkMode(): void {
    this.darkMode.next(!this.darkMode.value);
    localStorage.setItem('darkMode', JSON.stringify(!this.darkMode.value));
  }

  setDarkMode(isDark: boolean): void {
    this.darkMode.next(isDark);
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }
}