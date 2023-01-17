import { Injectable } from '@angular/core';
import { CounterService } from './counter.service';

@Injectable(
  {
    providedIn: "root"
  }
)
export class Counter2Service extends CounterService {

  public override counter: number = 0;
  constructor() { super(); }

  public override incCounter(): void{
    this.counter += 2;
  }
  public override decCounter(): void{
    this.counter -= 2;    
  }
}
