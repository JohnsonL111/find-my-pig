import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  constructor(private _router: Router) {}
  
  onClickAdd() {
    //this.router.navigate(['/', 'add']); // another way to do page nav
    this._router.navigateByUrl("add", { state: {legalNav : "true"}});
  }
}
