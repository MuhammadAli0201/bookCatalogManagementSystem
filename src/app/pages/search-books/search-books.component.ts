import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css'
})
export class SearchBooksComponent {
  @Output() bookSearchQuery = new EventEmitter<string>();

  constructor() { }

  emitSearchQuery(event: any) {
    const value = event.target.value;
    this.bookSearchQuery.emit(value);
  }
}
