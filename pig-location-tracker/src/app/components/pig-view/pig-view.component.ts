import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PigsService } from 'src/app/services/pigs.service';

@Component({
  selector: 'app-pig-view',
  templateUrl: './pig-view.component.html',
  styleUrls: ['./pig-view.component.css']
})
export class PigViewComponent implements OnInit {
  key: string | null;
  pigs: any[]
  payload: any;
  data: any;

  constructor(private _router: ActivatedRoute, private _returnRouter: Router, private _pigService: PigsService){
    this.key = "";
    this.pigs = [];
    this.payload = [];
    this.data = {}
  }

  ngOnInit(): void {
    this.key = this._router.snapshot.paramMap.get('key')
    this.getPigs();
  }

  populateFields() {
    this.payload.forEach((keyData: any) => {
      if (keyData.key == this.key) {
        this.data = keyData.data; // is an object.
      }
    });

    let pID = (<HTMLInputElement>document.getElementById("pID"))
    let latitude = (<HTMLInputElement>document.getElementById("latitude"))
    let longitude = (<HTMLInputElement>document.getElementById("longitude"))
    let location = (<HTMLInputElement>document.getElementById("location"))
    let pigBreed = (<HTMLInputElement>document.getElementById("pig-breed"))
    let extraNotes = (<HTMLInputElement>document.getElementById("extra-notes"))
    let personName = (<HTMLInputElement>document.getElementById("person-name"))
    let date = (<HTMLInputElement>document.getElementById("date"))
    let personNumber =  (<HTMLInputElement>document.getElementById("person-number"))
    let time = (<HTMLInputElement>document.getElementById("time"))
    let retrievedStatus =  (<HTMLInputElement>document.getElementById("retrieved"))

    // populate the fields
    pID.value = this.data.pigID;
    latitude.value = this.data.latitude;
    longitude.value = this.data.longitude;
    location.value = this.data.location;
    pigBreed.value = this.data.pigBreed;
    extraNotes.value = this.data.extraNotes;
    personName.value = this.data.personName;
    date.value = this.data.dateReported;
    personNumber.value = this.data.personNumber;
    time.value = this.data.timeReported;
    retrievedStatus.value = this.data.retrieved;

    
    // disable all fields
    pID.setAttribute("disabled", "")
    latitude.setAttribute("disabled", "")
    longitude.setAttribute("disabled", "")
    location.setAttribute("disabled", "")
    pigBreed.setAttribute("disabled", "")
    extraNotes.setAttribute("disabled", "")
    personName.setAttribute("disabled", "")
    date.setAttribute("disabled", "")
    personNumber.setAttribute("disabled", "")
    time.setAttribute("disabled", "")
    retrievedStatus.setAttribute("disabled", "")
  }

  goHome() {
    this._returnRouter.navigateByUrl("");
  }

  getPigs() {
    this._pigService.getPigs()
    .subscribe((data: any)=>{
      this.payload = data;
      this.extractData();
      this.populateFields();
    });
  }

  extractData() {
    // populate pigs with just the pig data
    this.payload.forEach((item: any) => { 
      this.pigs.push(item.data)
    });
  }
}
