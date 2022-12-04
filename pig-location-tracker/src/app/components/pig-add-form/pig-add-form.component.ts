import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PigsService } from 'src/app/services/pigs.service';

@Component({
  selector: 'app-pig-add-form',
  templateUrl: './pig-add-form.component.html',
  styleUrls: ['./pig-add-form.component.css']
})
export class PigAddFormComponent implements OnInit{
  submitStatus: string;
  pigs: any[];
  payload: any;
  // router service and HttpClient is injected here
  constructor(private _router: Router, private _pigService: PigsService, private _httpClient: HttpClient) {
    // add the disabled attribute back to the submit button
    document.getElementById("submit")?.setAttribute("disabled", "disabled");
    this.submitStatus = "no";
    this.pigs = [];
    this.payload = [];
    // if the user accesses this URL not through the "add button" on the main page then redirect them back.
    if (this._router.getCurrentNavigation()?.extras.state?.['legalNav'] == null) _router.navigateByUrl("")
  }

  ngOnInit(): void {
    // preload date and time (unchangable)
    (<HTMLInputElement>document.getElementById("date")).value = new Date().toLocaleDateString();
    (<HTMLInputElement>document.getElementById("time")).value = new Date().toLocaleTimeString(
      [], {hour: '2-digit', minute: '2-digit'});

    this.changeLocationFields();
    this.getPigs();
  }

  // updates the options for the pig select dropdown 
  updateSelectDropDown() {
    let locationOptionsParent = document.getElementById("location-options")
    let index = 0;
    this.pigs.forEach((pig) => {
      let location = pig.location;
      let longitude = pig.longitude;
      let latitude = pig.latitude;
      // create node, add values and add to dropdown
      const option = document.createElement("option");
      option.value = `${index}`;
      option.text = `${location} (${longitude}, ${latitude})`;
      locationOptionsParent?.appendChild(option);
      index++;
    });
  }

  getPigs() {
    this._pigService.getPigs()
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

  populateLocationData() {
    let sel = <HTMLSelectElement>document.querySelector("#location-options");

    // populate the location data with the index
    let locationField = <HTMLInputElement>document.getElementById("location");
    let longitudeField = <HTMLInputElement>document.getElementById("longitude");
    let latitudeField = <HTMLInputElement>document.getElementById("latitude");

    // we will use the value of the option as the index into our pigs list
    let selVal = sel.options[sel.selectedIndex].value;
    if (selVal == "blank") {
      locationField.value = ""
      longitudeField.value = ""
      latitudeField.value = ""
    } else {
      locationField.value = this.pigs[Number(selVal)].location;
      longitudeField.value = this.pigs[Number(selVal)].longitude;
      latitudeField.value = this.pigs[Number(selVal)].latitude;
    }
  }

  // toggles the "select own component" on and off
  toggleAddOwnLocation(e: Event) {
    e.preventDefault();
    this.changeLocationFields();
  }

  // for if the user wants to add their own input.
  changeLocationFields() {
    let toggleOwnLocation = <HTMLButtonElement>document.getElementById("toggle-own-location");
    let locationField = <HTMLInputElement>document.getElementById("location");
    let longitudeField = <HTMLInputElement>document.getElementById("longitude");
    let latitudeField = <HTMLInputElement>document.getElementById("latitude");
    let existingLocationsField = document.getElementById("select-existing-locations-section");
    let locationHint = document.getElementById("location-hint");

    switch(toggleOwnLocation.textContent) {
      case "Add existing location":
        toggleOwnLocation.textContent = "Add new location";
        locationField.setAttribute("disabled", "");
        longitudeField.setAttribute("disabled", "");
        latitudeField.setAttribute("disabled", "");
        existingLocationsField!.style.display = "block";
        locationHint!.textContent = "🐖Select from the dropdown"
        this.updateSelectDropDown(); // reinstate all children from the select node.
        break;
      case "Add new location":
        toggleOwnLocation.textContent = "Add existing location";
        locationField.removeAttribute("disabled");
        longitudeField.removeAttribute("disabled");
        latitudeField.removeAttribute("disabled");
        existingLocationsField!.style.display = "none";
        locationHint!.textContent = "🐖Add your own location below";
        this.deleteOptionChildren(); // delete all children from the select node.
        this.addBlankLocationChild(); // adds a blank text option. 
        break;
    }
  }

  addBlankLocationChild() {
    let locationOptionsParent = <HTMLSelectElement>document.getElementById("location-options");
    const option = document.createElement("option");
    option.value = "blank";
    locationOptionsParent.appendChild(option);
  }

  // deletes all the children of a node.
  deleteOptionChildren() {
    let locationOptionsParent = <HTMLSelectElement>document.getElementById("location-options");
        
    var child = locationOptionsParent.lastElementChild; 
    while (child) {
      locationOptionsParent.removeChild(child);
        child = locationOptionsParent.lastElementChild;
    }
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

  // just redirects the user back to the home screen.
  goHome() {
    this._router.navigateByUrl("");
  }

  // validates the form input.
  validateForm() {
    let submitButton = document.getElementById("submit");

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

    // only navigate back after the data has been fully posted. This way your GET is accurate.
    this._pigService.postPig(key, data).subscribe((data:any)=>{
      this._router.navigateByUrl("");
    }) 
  }

  // our key is the concatenation of the date and time (guarenteed to be unique)
  createKey(): string {
    let date = document.getElementById("date");
    let time = document.getElementById("time")

    let dateNum = (<HTMLInputElement>date)?.value.replaceAll("/", ""); // remove all slashes in the date
    let timeNum = (<HTMLInputElement>time)?.value.replaceAll(":", "") // remove the colon in the time
    timeNum = timeNum.replaceAll(" ", "") // remove empty space from time

    let key = dateNum + timeNum;
  
    return key;
  }

  // gathers then creates an object representing the data part to be posted to the server.
  createData() {
    return {
      "pigID" : (<HTMLInputElement>document.getElementById("pID")).value,
      "latitude": (<HTMLInputElement>document.getElementById("latitude")).value,
      "longitude": (<HTMLInputElement>document.getElementById("longitude")).value,
      "location":(<HTMLInputElement>document.getElementById("location")).value,
      "pigBreed": (<HTMLInputElement>document.getElementById("pig-breed")).value,
      "extraNotes": (<HTMLInputElement>document.getElementById("extra-notes")).value,
      "personName": (<HTMLInputElement>document.getElementById("person-name")).value,
      "dateReported": (<HTMLInputElement>document.getElementById("date")).value,
      "personNumber": (<HTMLInputElement>document.getElementById("person-number")).value,
      "timeReported": (<HTMLInputElement>document.getElementById("time")).value,
      "retrieved" : "READY FOR PICKUP"
    }
  }
}
