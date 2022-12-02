import { Component, OnInit } from '@angular/core';
import { pig } from 'src/app/pig';
import { PigsService } from 'src/app/services/pigs.service';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.css']
})
export class PigTableComponent implements OnInit {
  pigs: pig[] = [];
  // inject the pig service here
  constructor(private _pigsService: PigsService) {
  }

  // log the pigs from the service
  ngOnInit(): void {
    this.pigs = this._pigsService.getPigs();
  }
}
