import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
export declare class DragAndDropDirective implements OnInit, AfterViewInit {
    private el;
    private DADContainer;
    constructor(el: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
