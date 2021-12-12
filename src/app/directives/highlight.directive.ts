import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appHighlightDirective]'
})
export class HighlightDirective implements OnInit  {
  constructor(private elementRef: ElementRef,private renderer: Renderer2){

  }

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseover (eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','#80bfff');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color','white');
  }

  @HostListener('mouseleave') mouseleave (eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','transparent');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color','black');
  }
}
