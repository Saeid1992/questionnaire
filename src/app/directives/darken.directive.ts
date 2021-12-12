import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDarkenDirective]'
})
export class DarkenDirective implements OnInit  {
  constructor(private elementRef: ElementRef,private renderer: Renderer2){

  }

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseover (eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','#004080');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color','white');
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor','pointer');
  }

  @HostListener('mouseleave') mouseleave (eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color','#80bfff');
    this.renderer.setStyle(this.elementRef.nativeElement, 'color','black');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'cursor','pointer');
  }
}
