import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent {
  // router service is injected
  constructor(private router: Router) {}

  onClickFormSubmit() {
    // do any input validation here
    this.router.navigateByUrl("")
  }
}
