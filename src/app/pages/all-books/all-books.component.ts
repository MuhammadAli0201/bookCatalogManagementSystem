import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ManageBooksService } from 'src/app/services/manage-books.service';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent {
  @Input() books : Book[] = [];

  //LIFE CYCLES
  constructor(  ){}

}
