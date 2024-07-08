import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from 'src/app/models/book';
import { ManageBooksService } from 'src/app/services/manage-books.service';
@Component({
  selector: 'app-books-home',
  templateUrl: './books-home.component.html',
  styleUrls: ['./books-home.component.css']
})
export class BooksHomeComponent implements OnInit {
  books: Book[] = [];

  //LIFECYLCE CYCLES
  constructor(private manageBooksService: ManageBooksService) { }

  async ngOnInit(): Promise<void> {
    await this.populateBooks();
  }

  //UI LOGIC
  async populateBooks(): Promise<void> {
    this.books = await this.getBooks();
  }

  async populateBooksSearch(query: string): Promise<void> {
    this.books = await this.getBookSearch(query);
  }

  async createOrUpdateBook(book: Book){
    const result = await this.manageBooksService.createOrUpdateBook(book);
    await this.populateBooks();
  }

  async deleteBook(id:string): Promise<void> {
    const result = await this.delete(id);
    await this.populateBooks();
  }

  //DATA LOGIC
  async getBooks(): Promise<Book[]> {
    return await this.manageBooksService.getBooks();
  }

  async getBookById(id:string): Promise<Book> {
    return await this.manageBooksService.getBookById(id);
  }

  async getBookSearch(query: string): Promise<Book[]> {
    return await this.manageBooksService.getBooksSearch(query);
  }

  async delete(id: string): Promise<Book> {
    return await this.manageBooksService.delete(id);
  }

}
