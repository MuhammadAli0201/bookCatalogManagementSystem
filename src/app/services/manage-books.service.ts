import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { debounceTime, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageBooksService {
  private _url: string = "https://localhost:7046/api/Book/";
  constructor(private http: HttpClient) { }

  async getBooks(): Promise<Book[]> {
    return firstValueFrom(this.http.get<Book[]>(this._url));
  }

  async getBooksSearch(query: string): Promise<Book[]> {
    return firstValueFrom(this.http.get<Book[]>(this._url + `Search?query=${query}`));
  }
}
