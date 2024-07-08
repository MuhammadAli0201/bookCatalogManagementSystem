import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksHomeComponent } from './pages/books-home/books-home.component';
import { PATHS } from './shared/paths';

const routes: Routes = [
  {
    path:PATHS.default,
    component:BooksHomeComponent    
  },
  {
    path:PATHS.home,
    component:BooksHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
