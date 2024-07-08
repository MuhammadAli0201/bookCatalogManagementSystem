import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksHomeComponent } from './books-home/books-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AllBooksComponent } from './all-books/all-books.component';
import { CreateOrUpdateBookComponent } from './create-or-update-book/create-or-update-book.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    BooksHomeComponent,
    AllBooksComponent,
    CreateOrUpdateBookComponent,
    SearchBooksComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzFlexModule,
    NzInputModule,
    NzDropDownModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzPopoverModule,
    NzIconModule
  ]
})
export class PagesModule { }
