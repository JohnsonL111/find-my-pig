import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pig-table',
  templateUrl: './pig-table.component.html',
  styleUrls: ['./pig-table.component.css']
})
export class PigTableComponent {
  constructor(private router: Router) {

  }

  onClickAdd() {
    //this.router.navigate(['/', 'add']);
    this.router.navigateByUrl("add")
  }
}
