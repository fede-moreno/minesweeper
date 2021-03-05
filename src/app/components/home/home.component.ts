import { Component, OnInit } from '@angular/core';
import { AppPages } from '../../enums/app-pages.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  AppPagesEnum = AppPages;

  constructor() {
  }

  ngOnInit(): void {
  }

}
