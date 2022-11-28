import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
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
  private map!: L.Map;
  
  constructor() {}

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

      // adds two markers to the map (metrotown and SFU surrey)
      L.marker([49.2276, -123.0076]).addTo(this.map)
      .bindPopup("<b>Metrotown</b><br />cases reported.").openPopup();

      L.marker([49.1867, -122.8490]).addTo(this.map)
      .bindPopup("<b>SFU Surrey</b><br />cases reported.").openPopup();
  }
  
}
