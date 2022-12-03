import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent implements OnInit{
  submitStatus: string;
  // router service and HttpClient is injected here
  constructor(private _router: Router, private _http: HttpClient) {
    // add the disabled attribute back to the submit button
    document.getElementById("submit")?.setAttribute("disabled", "disabled");
    this.submitStatus = "no";
    // if the user accesses this URL not through the "add button" on the main page then redirect them back.
    if (this._router.getCurrentNavigation()?.extras.state?.['legalNav'] == null) _router.navigateByUrl("")
    console.log(this.createKey());
  }

  ngOnInit(): void {
    // preload date and time (unchangable)
    (<HTMLInputElement>document.getElementById("date")).value = new Date().toLocaleDateString();
    (<HTMLInputElement>document.getElementById("time")).value = new Date().toLocaleTimeString(
      [], {hour: '2-digit', minute: '2-digit'});
  }

  /**
 *  Prevents a "-" from being entered for the ID
 * @param e: the event object
 */
  preventNegatives(e: any) {
    if (e.key === "-") {
        e.preventDefault();
        return false;
    }
    return true;
  }

  // validates the form input.
  validateForm() {
    let submitButton = document.getElementById("submit");
    console.log("form has been changed")
    if (this.checkProperPhone() && this.checkRequiredFields()) {
      submitButton?.removeAttribute("disabled");
      this.submitStatus = "yes"
    } else {
      if (this.checkRequiredFields()) alert("All fields are filled, but phone number is invalid");
      document.getElementById("submit")?.setAttribute("disabled", "disabled");
      this.submitStatus = "no";
    }
  }

  // checks if all inputs are filled out.
  checkRequiredFields(): boolean {
    return (this.addRequiredFieldsChecked() ? true : false)
  }

  // helper to check if all input fields have something in it
  addRequiredFieldsChecked(): boolean {
    let allInputs = document.querySelectorAll("input");
    let allHasVal = true;
    
    allInputs.forEach((input) => {
      if (input.value == "") {
        allHasVal = false; 
      }
    }) 

    return allHasVal;
  }

  // checks if the phone number returned matches the regex.
  checkProperPhone() {
    const re = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{4}");
    let phoneNum = <HTMLInputElement>document.getElementById("person-number");
    return re.test(phoneNum?.value) ? true : false;
  }

  // adds the pig report to the server and navigates back to the main screen
  onClickFormSubmit() {
    // At this point it is confirmed that the pig is valid.
    let key = this.createKey();
    let data = this.createData();
    /*
    this._http.post('https://272.selfip.net/apps/IebSX7E91f/collections/pigs/documents/',
    {"key": key, 
    "data": data}
    ).subscribe((data:any)=>{
      console.log(data)
    })*/

    // reroute back to the main 
    this._router.navigateByUrl("")
  }

  // our key is the concatenation of the date and time (guarenteed to be unique)
  createKey(): string {
    let date = document.getElementById("date");
    let time = document.getElementById("time")

    let dateNum = (<HTMLInputElement>date)?.value.replaceAll("/", ""); // remove all slashes in the date
    let timeNum = (<HTMLInputElement>time)?.value.replaceAll(":", "") // remove the colon in the time

    let key = dateNum + timeNum;
    console.log(`our key is ${dateNum} + ${timeNum}`);
  
    return key;
  }

  // gathers then creates an object representing the data part to be posted to the server.
  createData(): Object{
    return {};
  }
}
