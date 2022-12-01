import { Component, OnInit } from '@angular/core';
import { pig } from 'src/app/pig';
import { PigsService } from 'src/app/services/pigs.service';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.css']
})
export class PigTableComponent implements OnInit {
  // internal recording of pigs
  public pigs: pig[] = [];

  // inject the pig service here
  constructor(private _pigsService: PigsService) {}

  // populate the internal pigs list 
  ngOnInit(): void {
    this.pigs = this._pigsService.getPigs();
    console.log(this.pigs)
  }
}
