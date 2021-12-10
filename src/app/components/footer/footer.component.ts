import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerText: string;
  constructor() {
    this.footerText = 'Saeid1992'
   }

  ngOnInit(): void {
  }

}
