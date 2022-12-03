import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.getPigs();
  }

  getPigs() {
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

  onClickDelete() {
    if (this.promptPassword()) {
      let idx;
      do {
        idx = prompt("Please enter the pigs index");
      } while (this.isInvalidIdx(idx));

      // terminate if user clicks cancel (strict null return) or no input
      // without this guard it will treat the empty return as idx = 0.
      if (idx === null || idx === "") return;

      let idxNum = Number(idx);
      this._pigsService.deletePig(this.payload[idxNum].key).subscribe((data: any) => {
        location.reload();
      })
    } 
  }

  onClickUpdate() { 
    if (this.promptPassword()) {
      let idx;
      do {
        idx = prompt("Please enter the pigs index");
      } while (this.isInvalidIdx(idx));

      // terminate if user clicks cancel (strict null return) or no input
      // without this guard it will treat the empty return as idx = 0.
      if (idx === null || idx === "") return;

      let idxNum = Number(idx);
      this.pigs[idxNum].retrieved = "RETRIEVED"
      this._pigsService.putPig(this.payload[idxNum].key, this.pigs[idxNum]).subscribe((data: any) => {
      })
    } 
  }

  // used for if the user wants to update the status or delete a pig
  promptPassword(): boolean {
    let pw = prompt("Please enter the password");
    if (pw == "OINK!!") return true  // right password
    else if (pw === null) return false; // user clicked cancel
    else alert("incorrect password"); // wrong password

    return false;
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
