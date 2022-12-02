import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PigsService } from './services/pigs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pig-location-tracker';

  constructor() {
  }
  
  ngOnInit(): void {
  }
}
