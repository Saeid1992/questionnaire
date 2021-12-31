import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appHighlightDirective]'
})
export class HighlightDirective {
  constructor(private elementRef: ElementRef,private renderer: Renderer2){

  }

  @HostListener('mouseenter') mouseover (eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','#1284f5');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color','white');
  }

  @HostListener('mouseleave') mouseleave (eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','transparent');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color','black');
  }
}
