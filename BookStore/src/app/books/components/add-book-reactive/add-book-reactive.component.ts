import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book-reactive',
  templateUrl: './add-book-reactive.component.html',
  styleUrls: ['./add-book-reactive.component.scss']
})
export class AddBookReactiveComponent implements OnInit {

  public titleErrorMessage: string;
  public authorErrorMessage: string;

  prices: any[] = [
    { value: 100, viewValue: '100' },
    { value: 200, viewValue: '200' },
    { value: 300, viewValue: '300' },
  ];

  currencies: any[] = [
    { value: 'USD', viewValue: 'US Dollar' },
    { value: 'INR', viewValue: 'Indian Ruppees' },
  ];

  public addBookForm: FormGroup;


  constructor(private _bookService: BookService) {

  }

  ngOnInit(): void {
    this.initForm();

    const titleControl = this.addBookForm.get('title');
    titleControl?.valueChanges.subscribe(x => {
      this.validateTitleControl(titleControl as FormControl);
    })

    const formatTypeControl = this.addBookForm.get('formatType');
    formatTypeControl?.valueChanges.subscribe(x => {
      this.formatTypeChanged(x);
    })

   /*  const authorControl = this.addBookForm.get('author');
    authorControl?.valueChanges.subscribe(x => {
      this.validateTitleControl(authorControl as FormControl);
    }) */

  }

  updateFormValues(): void {
    this.addBookForm.patchValue({
      title: 'Tofik Maniyar',
      author: 'default Sample'
    });
  }

  saveBook(): void {
    console.log(this.addBookForm.value);
    /*  const book: BookModel = new BookModel();
        book.title = value.title;
        book.author = value.author;
        book.totalPages = value.pages;
        book.price = { 
          currency: "$",
          value: value.price  
        };
        book.isPublished = value.isPublished;
        book.publishedOn = value.publishedOn; */

    if (this.addBookForm.valid) {
      this._bookService.addBook(this.addBookForm.value);
    }
    else {
      alert('Form invalid')
    }
  }

  private initForm(): void {
    this.addBookForm = new FormGroup({
      title: new FormControl('Tofik', [Validators.required, Validators.minLength(6)]),
      author: new FormControl('', Validators.required),
      totalPages: new FormControl(),
      price: new FormGroup({
        currency: new FormControl(),
        value: new FormControl()
      }),
      publishedOn: new FormControl(),
      isPublished: new FormControl(),
      formatType: new FormControl(),
      pdfFormat: new FormControl(),
      docFormat: new FormControl()
    });

  }

  private validateTitleControl(titleControl: FormControl): void {
    this.titleErrorMessage = '';
    if (titleControl.errors && (titleControl.touched || titleControl.dirty)) {
      if(titleControl.errors?.['required']) {
        this.titleErrorMessage = 'This is a required field';
      }else if (titleControl.errors?.['minlength']) {
        this.titleErrorMessage = 'Min length is '+ titleControl.errors?.['minlength']?.requiredLength;;
      }
    }
  }

  private formatTypeChanged(formatType: string): void{
    const pdfControl = this.addBookForm.get('pdfFormat');
    const docControl = this.addBookForm.get('docFormat');
    
    if(formatType === 'pdf') {
      pdfControl?.addValidators([Validators.required, Validators.minLength(10)]);
      docControl?.clearValidators();
    }else if(formatType === 'doc'){
      docControl?.addValidators(Validators.required);
      pdfControl?.clearValidators();
    }else {

    }

    pdfControl?.updateValueAndValidity();
    docControl?.updateValueAndValidity();
  } 

}
