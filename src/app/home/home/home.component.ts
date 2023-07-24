import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = [
    {
      src: '../../../assets/images/jpeg/main-banner5.jpg',
    },
    {
      src: '../../../assets/images/jpeg/main-banner21.jpg',
    },
    {
      src: '../../../assets/images/jpeg/main-banner4.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
