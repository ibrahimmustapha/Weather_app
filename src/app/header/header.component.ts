import { Component } from '@angular/core';
import { faGithub, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  githubIcon = faGithub;
  twitterIcon = faTwitterSquare;
  sunIcon = faSun;
  moonIcon = faMoon;
  theme$ = this.themeService.theme$;

  constructor(private readonly themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
