import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
import { PigsService } from 'src/app/services/pigs.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-report-map',
  templateUrl: './report-map.component.html',
  styleUrls: ['./report-map.component.css']
})
export class ReportMapComponent implements AfterViewInit{
  title = 'pig-location-tracker';
  pigs: any[];
  payload: any;
  private map!: L.Map;
  
  constructor(private _pigsService: PigsService) {
    this.pigs = [];
    this.payload = [];
  }

  ngAfterViewInit(): void {
      // sets view to the lower mainland [longitude, latitude]
      this.map = L.map("mapid").setView([49.2, -123], 11);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamtsNTMiLCJhIjoiY2xiMDZicTM5MHNhNjN3cnp1cHIzaTl0dCJ9.KvsL7iklzinKiRem_fbEiw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
      }).addTo(this.map);

      this.getPigsAndAddMarkers()
  }

  // calls service method to update internal pig storage
  getPigsAndAddMarkers() {
    this._pigsService.getPigs()
    .subscribe((data: any)=>{
      this.payload = data;
      this.extractData();
      this.addMarkers();
    });
  }

  // helper to extract the data from the payload
  extractData() {
    // populate pigs with just the pig data
    this.payload.forEach((item: any) => { 
      this.pigs.push(item.data)
    });
  }

  // goes through the data and populates markers
  addMarkers() {
    this.pigs.forEach((pig) => {
      let location = pig.location;
      let longitude = Number(pig.longitude);
      let latitude =  Number(pig.latitude);
      console.log(`
      In addMarkers method.
      location = ${location}
      longitude = ${longitude}
      latitude = ${latitude}
      `)

      L.marker([longitude, latitude]).addTo(this.map)
      .bindPopup(`<b>${location}</b><br />cases reported.`).openPopup();
    })
  }
  
}
