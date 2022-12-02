import { Component, OnInit } from '@angular/core';
import { pig } from 'src/app/pig';
import { PigsService } from 'src/app/services/pigs.service';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.css']
})
export class PigTableComponent implements OnInit {
  pigs: any[];
  payload: any;

  // inject the pig service here
  constructor(private _pigsService: PigsService) {
    this.pigs = [];
    this.payload = [];
  }

  // log the pigs from the service
  ngOnInit(): void {
    this.payload = this._pigsService.getPigs(); // the entire request payload

    // populate pigs with just the pig data
    this.payload.forEach((item: any) => { 
      this.pigs.push(item.data)
    });
  }
}
