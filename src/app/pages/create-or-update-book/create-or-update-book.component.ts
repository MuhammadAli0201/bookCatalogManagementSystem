import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from "@angular/common";
import { iSBNValidator } from 'src/app/shared/isbnValidator';
import { Book } from 'src/app/models/book';
import { Chapter } from 'src/app/models/chapter';
import { Tag } from 'src/app/models/tag';

@Component({
  selector: 'app-create-or-update-book',
  templateUrl: './create-or-update-book.component.html',
  styleUrl: './create-or-update-book.component.css'
})
export class CreateOrUpdateBookComponent implements OnInit {
  @Output() bookEmitter = new EventEmitter<Book>();

  bookForm!: FormGroup;
  chapterFB!: FormGroup;
  minDate: Date = new Date('1900-01-01');
  maxDate: Date = new Date();
  errorMsg: string = "";
  emptyGuid: string = "00000000-0000-0000-0000-000000000000";

  //LIFE CYCLE
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: new FormControl(this.emptyGuid),
      title: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
      publicationYear: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required),
      isbn: new FormControl("", [Validators.required, iSBNValidator()]),
      genre: new FormControl("", Validators.required),
      tags: this.fb.array([], Validators.maxLength(5)),
      chapters: this.fb.array([]),
      totalPages: new FormControl(0, Validators.required)
    });

    this.chapterFB = this.fb.group({
      id: new FormControl(this.emptyGuid),
      chapterNo: new FormControl(1, Validators.required),
      title: new FormControl("", Validators.required),
      pageCount: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  //UI LOGIC
  addTag(event: any) {
    const tag = event.value;
    if (tag.length > 0) {
      const tagsFormArray = this.bookForm.get('tags') as FormArray;
      tagsFormArray.push(new FormGroup({
        id: new FormControl(this.emptyGuid),
        tagName: new FormControl(tag)
      }));
    }
    event.value = "";
  }

  getTags() {
    const tagsFormArray = this.bookForm.get('tags') as FormArray;
    return tagsFormArray.value;
  }

  removeTag(i: number) {
    const tagsFormArray = this.bookForm.get('tags') as FormArray;
    tagsFormArray.removeAt(i);
  }

  getChapterCount() {
    const chapterFormArray = this.bookForm.get('chapters') as FormArray;
    return chapterFormArray.length + 1;
  }

  removeChapter(i: number) {
    const chapterFormArray = this.bookForm.get('chapters') as FormArray;
    const totalPages = this.bookForm.value.totalPages - chapterFormArray.value[i].pageCount;
    this.bookForm.patchValue({
      totalPages: totalPages
    });
    chapterFormArray.removeAt(i);
  }

  getChapters() {
    const chapterFormArray = this.bookForm.get('chapters') as FormArray;
    return chapterFormArray.value;
  }

  addChapter() {
    if (this.chapterFB.valid) {
      const chapterFormArray = this.bookForm.get('chapters') as FormArray;
      chapterFormArray.push(new FormGroup({
        id: new FormControl(this.chapterFB.value.id),
        chapterNo: new FormControl(this.chapterFB.value.chapterNo),
        title: new FormControl(this.chapterFB.value.title),
        pageCount: new FormControl(this.chapterFB.value.pageCount)
      }));

      const totalPages = this.bookForm.value.totalPages + this.chapterFB.value.pageCount;
      this.bookForm.patchValue({
        totalPages: totalPages
      });

      this.chapterFB.reset({
        id: this.emptyGuid,
        chapterNo: this.getChapterCount()
      });
    }
    else {
      Object.values(this.chapterFB.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

  handleISBN() {
    const publicationYear = this.bookForm.value.publicationYear;
    const minDate = new Date("1970-01-01");
    const isbn = this.bookForm.get('isbn');
    if (new Date(publicationYear).getFullYear() <= minDate.getFullYear()) {
      isbn?.clearValidators();
      isbn?.setErrors(null);
    }
    else
      isbn?.addValidators([Validators.required, iSBNValidator()]);

    isbn?.updateValueAndValidity({ onlySelf: true });
  }


  //LOGIC
  createOrUpdate() {
    if (this.bookForm.value.tags.length > 5) {
      this.errorMsg = "Tags must only be 5.";
    }
    else if (this.bookForm.value.chapters.length > 50) {
      this.errorMsg = "Chapters must only be 50.";
    }
    else if (this.bookForm.valid) {
      const book: Book = {
        id: this.bookForm.value.id,
        title: this.bookForm.value.title,
        author: this.bookForm.value.author,
        publicationYear: this.bookForm.value.publicationYear,
        totalPages: this.bookForm.value.totalPages,
        isbn: this.bookForm.value.isbn,
        genre: this.bookForm.value.genre,
        chapters: this.bookForm.value.chapters.map((v: any) => <Chapter>{
          id: v.id,
          title: v.title,
          pageCount: v.pageCount,
          chapterNo: v.chapterNo
        }),
        tags: this.bookForm.value.tags.map((control: any) => ({
          id: control.id,
          tagName: control.tagName
        }))
      };

      this.bookEmitter.emit(book);
      this.bookForm.reset({
        id: this.emptyGuid
      });
    }
    else {
      this.errorMsg = "";
      Object.values(this.bookForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

}
