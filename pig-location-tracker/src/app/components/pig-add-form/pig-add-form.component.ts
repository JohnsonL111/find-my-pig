import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent implements OnInit{
  // router service is injected
  constructor(private _router: Router) {}

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("date")).value = new Date().toLocaleDateString();
    (<HTMLInputElement>document.getElementById("time")).value = new Date().toLocaleTimeString(
      [], {hour: '2-digit', minute: '2-digit'});
  }

  onClickFormSubmit(evt: Event) {
    // do any input validation here
    this._router.navigateByUrl("")
  }

}
