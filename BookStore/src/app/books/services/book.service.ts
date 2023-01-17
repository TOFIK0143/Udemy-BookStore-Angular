import { Injectable } from '@angular/core';
import { BookModel } from '../models/book.model';

@Injectable({
  "providedIn": "root"
})
export class BookService {

  constructor() { }

  public getBooks(): any[] {
    return [
      {
        "id": 1,
        "title": "Angular fundamentals",
        "totalPages": 453,
        "author": "Jeevan Appa",
        "price": {
          "currency": "INR",
          "value": 199
        }
      },
      {
        "id": 2,
        "title": "Java fundamentals",
        "totalPages": 753,
        "author": "Sanket Mane",
        "price": {
          "currency": "INR",
          "value": 299
        }
      },
      {
        "id": 3,
        "title": "Typescript fundamentals",
        "totalPages": 243,
        "author": "Datta Dev",
        "price": {
          "currency": "INR",
          "value": 799
        }
      }
      
    ]
  }

  public recentBooks(): any[] {
    return [
      {
        "id": 1,
        "title": "Angular fundamentals",
        "totalPages": 453,
        "author": "Jeevan Appa",
        "price": {
          "currency": "INR",
          "value": 199
        }
      },
      {
        "id": 2,
        "title": "Java fundamentals",
        "totalPages": 753,
        "author": "Sanket Mane",
        "price": {
          "currency": "INR",
          "value": 299
        }
      } 
    ]
  }
}

