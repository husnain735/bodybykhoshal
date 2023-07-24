import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  trainers = [
    {
      name: 'Trainer 1',
      submenuItems: ['Submenu Item 1', 'Submenu Item 2', 'Submenu Item 3'],
    },
    {
      name: 'Trainer 2',
      submenuItems: ['Submenu Item 4', 'Submenu Item 5'],
    },
  ];

  constructor(public router: Router) {

  }

  ngOnInit() {
    
  }

  
}
