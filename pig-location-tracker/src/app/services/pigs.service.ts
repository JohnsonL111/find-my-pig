import { Injectable } from '@angular/core';
import { pig } from '../pig';

@Injectable({
  providedIn: 'root' // registers this service at the root module injector.
})
export class PigsService {
  pigs: pig[] = [
    {
      personName : "bob",
      personNumber: "123",
      pigBreed: "bob",
      pigID: "123",
      location: "bobby",
      latitude: "-123",
      longitude: "-456",
      dateReported: "12312312",
      timeReported: "123123",
      extraNotes: "notes here"
    }
  ]

  constructor() { }

  getPigs() {
    return this.pigs;
  }
}
