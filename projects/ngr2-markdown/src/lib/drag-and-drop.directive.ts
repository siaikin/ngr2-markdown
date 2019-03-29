import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';
import {DragAndDropContainer} from './core/dad/dragAndDropContainer';

@Directive({
  selector: '[nbDragAndDrop]'
})
export class DragAndDropDirective implements OnInit, AfterViewInit {

  private DADContainer: DragAndDropContainer;

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.DADContainer = new DragAndDropContainer(this.el.nativeElement);
  }
}
