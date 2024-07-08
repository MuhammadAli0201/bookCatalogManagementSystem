import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {

  private _url: string = "https://localhost:7046/api/Book/";
  constructor(private http: HttpClient) { }

  async getBooks(): Promise<Book[]> {
    return await firstValueFrom(this.http.get<Book[]>(this._url));
  }

  async getBooksSearch(query: string): Promise<Book[]> {
    return await firstValueFrom(this.http.get<Book[]>(this._url + `Search?query=${query}`));
  }
  
  async getBookById(id: string): Promise<Book> {
    return await firstValueFrom(this.http.get<Book>(this._url + `GetById?id=${id}`));
  }

  async delete(id: string): Promise<Book> {
    return await firstValueFrom(this.http.delete<Book>(this._url + `?id=${id}`));
  }

  async createOrUpdateBook(book: Book) : Promise<Book | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return await firstValueFrom(this.http.post<Book>(this._url,book,httpOptions));
  }
}
