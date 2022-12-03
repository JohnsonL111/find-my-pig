import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private _pigsService: PigsService, private _router: Router) {
    this.pigs = [];
    this.payload = [];
  }

  // log the pigs from the service
  ngOnInit(): void {
    this._pigsService.getPigs()
    .subscribe((data: any)=>{
      this.payload = data;
      this.extractData();
    });
  }

  extractData() {
    // populate pigs with just the pig data
    this.payload.forEach((item: any) => { 
      this.pigs.push(item.data)
    });
  }

  //** Button navigation related */

  onClickAdd() {
    //this.router.navigate(['/', 'add']); // another way to do page nav
    this._router.navigateByUrl("add", { state: {legalNav : "true"}});
  }

  onClickUpdate() { 
    let idx;
    do {
      idx = prompt("Please enter the pigs index");
    } while (this.isInvalidIdx(idx));
  }

  isInvalidIdx(idx: string | null): boolean {
    // is invalid if is alphanumeric, negative, or greater than the max length-1
    return isNaN(Number(idx)) || this.isInvalidAccess(Number(idx)) ? true : false;
  }

  // is invalid access if out of bounds
  isInvalidAccess(idx: number) {
    return (idx > this.pigs.length-1) || (idx < 0) ? true : false;
  }
}
