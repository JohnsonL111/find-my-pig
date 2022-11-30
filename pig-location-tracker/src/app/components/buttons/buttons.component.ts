import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  constructor(private router: Router) {}
  
  onClickAdd() {
    //this.router.navigate(['/', 'add']);
    this.router.navigateByUrl("add")
  }
}
