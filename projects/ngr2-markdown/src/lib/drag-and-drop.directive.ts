import {AfterViewInit, Directive, ElementRef, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {DragAndDropService} from './service/drag-and-drop.service';
import {DragAndDropElement} from './core/dad/dragAndDrop';
import {DragAndDropContainer} from './core/dad/dragAndDropContainer';

@Directive({
  selector: '[nbDragAndDrop]'
})
export class DragAndDropDirective implements OnInit, AfterViewInit {

  // @HostListener('drag', ['$event']) drag = this.ondrag;
  // @HostListener('dragend', ['$event']) dragend = this.ondragend;
  // @HostListener('dragenter', ['$event']) dragenter = this.ondragenter;
  // @HostListener('dragleave', ['$event']) dragleave = this.ondragleave;
  // @HostListener('dragover', ['$event']) dragover = this.ondragover;
  // @HostListener('dragstart', ['$event']) dragstart = this.ondragstart;
  // @HostListener('drop', ['$event']) drop = this.ondrop;

  private dadEl: DragAndDropElement;
  private DADContainer: DragAndDropContainer;

  constructor(
    private el: ElementRef,
    private dadService: DragAndDropService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.dadEl = new DragAndDropElement(this.el.nativeElement,
    //   () => {
    //     return this.dadService.getCurrentElement();
    //   },
    //   (value) => {
    //     this.dadService.setCurrentElement(value);
    //   }
    // );
    this.DADContainer = new DragAndDropContainer(this.el.nativeElement);
  }
}
