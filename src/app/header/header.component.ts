import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
  githubIcon = faGithub;
  twitterIcon = faTwitterSquare;
}
