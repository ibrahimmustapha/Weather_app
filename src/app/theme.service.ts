import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeName = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'wx-theme';
  private readonly themeSubject = new BehaviorSubject<ThemeName>(this.resolveInitialTheme());
  readonly theme$ = this.themeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.applyTheme(this.themeSubject.value);
  }

  toggleTheme(): void {
    const nextTheme: ThemeName = this.themeSubject.value === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeName): void {
    if (theme === this.themeSubject.value) {
      return;
    }

    this.themeSubject.next(theme);
    this.applyTheme(theme);
    this.persistTheme(theme);
  }

  private resolveInitialTheme(): ThemeName {
    if (typeof window === 'undefined') {
      return 'light';
    }

    try {
      const stored = window.localStorage.getItem(this.storageKey);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignore storage access issues and fall back to preferences.
    }

    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private persistTheme(theme: ThemeName): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(this.storageKey, theme);
    } catch {
      // Swallow storage errors silently (private mode, etc.)
    }
  }

  private applyTheme(theme: ThemeName): void {
    const root = this.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.setAttribute('data-theme', theme);
  }
}
