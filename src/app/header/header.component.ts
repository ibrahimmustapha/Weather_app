import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  githubLink = 'https://img.icons8.com/?size=512&id=AZOZNnY73haj&format=png';
  twitterLink = 'https://img.icons8.com/?size=512&id=8824&format=png';
  allTodos: any;
  books: any;
  products: any;
  name = '';
  message = '';
  randomQuote: any;
  githubIcon = faGithub;
  twitterIcon = faTwitterSquare;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTodos();
    this.getBooks();
    this.getProducts();
    this.getRandomQuotes();
  }

  getTodos() {
    this.http
      .get('https://jsonplaceholder.typicode.com/photos')
      .subscribe((todos) => {
        this.allTodos = todos;
      });
  }

  getBooks() {
    this.http
      .get('http://localhost:4200/assets/books.json')
      .subscribe((books) => {
        this.books = books;
      });
  }

  getProducts() {
    this.http
      .get('http://localhost:4200/assets/products.json')
      .subscribe((response) => {
        this.products = response;
      });
  }

  greetNewCustomer() {
    if (this.name.trim().length === 0)
      return (this.message = 'Please enter you name :)');

    return (this.message = `Welcome to CodeMicky Tv Mr/Mrs/Miss ${this.name}`);
  }

  getRandomQuotes() {
    this.http
      .get('http://localhost:4200/assets/quotes.json')
      .subscribe((response) => {
        const quotesArray = response as any[];
        const randomIndex = Math.floor(Math.random() * quotesArray.length);
        this.randomQuote = quotesArray[randomIndex];
        console.log(this.randomQuote);
      });
  }
}
