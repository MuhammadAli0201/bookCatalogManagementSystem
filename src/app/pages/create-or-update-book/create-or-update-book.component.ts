import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from "@angular/common";
import { iSBNValidator } from 'src/app/shared/isbnValidator';

@Component({
  selector: 'app-create-or-update-book',
  templateUrl: './create-or-update-book.component.html',
  styleUrl: './create-or-update-book.component.css'
})
export class CreateOrUpdateBookComponent implements OnInit {
  bookForm!: FormGroup;
  chapterFB!: FormGroup;
  minDate: Date = new Date('1990-01-01');
  maxDate: Date = new Date();

  //LIFE CYCLE
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      id: new FormControl(null),
      title: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
      publicationYear: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required),
      isbn: new FormControl("", [Validators.required, iSBNValidator()]),
      genre: new FormControl("", Validators.required),
      tags: this.fb.array([], Validators.maxLength(5)),
      chapters: this.fb.array([]),
      totalPages: new FormGroup(0, Validators.required)
    });

    this.chapterFB = this.fb.group({
      id: new FormControl(null),
      chapterNo: new FormControl({ value: this.getChapterCount(), disabled: true }, Validators.required),
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
        id: new FormControl(null),
        tagName: new FormControl(tag)
      }));
    }
    event.value = "";
  }

  getTags() {
    const tagsFormArray = this.bookForm.get('tags') as FormArray;
    console.log(tagsFormArray.value);
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

  removeChapter(i:number)
  {
    const chapterFormArray = this.bookForm.get('chapters') as FormArray;
    chapterFormArray.removeAt(i);
  }

  getChapters() {
    const chapterFormArray = this.bookForm.get('chapters') as FormArray;
    return chapterFormArray.value;
  }

  addChapter() {
    if(this.chapterFB.valid)
    {      
    const chapterFormArray = this.bookForm.get('chapters') as FormArray;
    chapterFormArray.push(this.chapterFB);
    }
    else
    {
      Object.values(this.chapterFB.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

  //LOGIC
  createOrUpdate() {
    if(this.bookForm.valid)
    {

    }
    else
    {
      Object.values(this.bookForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      })
    }
  }

}
