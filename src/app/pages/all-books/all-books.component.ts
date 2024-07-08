import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ManageBooksService } from 'src/app/services/manage-books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent {
  @Input() books: Book[] = [];
  @Output() bookUpdateEmitter = new EventEmitter<string>();
  @Output() bookDeleteEmitter = new EventEmitter<string>();

  //LIFE CYCLES
  constructor() { }

  update(id: string) {
    this.bookUpdateEmitter.emit(id);
  }

  delete(id: string) {
    this.bookDeleteEmitter.emit(id);
  }

  
}
