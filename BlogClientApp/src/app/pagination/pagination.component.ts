import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() page:number;
  @Input() count:number;
  @Input() prev:boolean;
  @Input() next:boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();

 
  constructor() { }

  ngOnInit() {
  }

  onPrev(){
    this.goPrev.emit(true);
  }

  onNext(){
    this.goNext.emit(true);
  }

}
