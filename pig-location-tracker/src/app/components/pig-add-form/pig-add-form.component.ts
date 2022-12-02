import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent implements OnInit{
  // router service and HttpClient is injected here
  constructor(private _router: Router, private _http: HttpClient) {}

  ngOnInit(): void {
    // preload date and time (unchangable)
    (<HTMLInputElement>document.getElementById("date")).value = new Date().toLocaleDateString();
    (<HTMLInputElement>document.getElementById("time")).value = new Date().toLocaleTimeString(
      [], {hour: '2-digit', minute: '2-digit'});
  }

  onClickFormSubmit(evt: Event) {
    // do any input validation here
    this._router.navigateByUrl("")
  }

}
