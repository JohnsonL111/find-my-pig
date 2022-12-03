import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pig } from '../pig';

@Injectable({
  providedIn: 'root' // registers this service at the root module injector.
})
export class PigsService {
  pigs: any;

  constructor(private _http: HttpClient) { 
    // creats the pigs collection if not exist then updates the internal list
    // services cannot have ngOnInit lifecycle hook so do this in the constructor
    console.log("pig service constructor");
    this.pigs = []
  }

  getPigs() {
    console.log("get pig called")
    return this._http.get<Object>('https://272.selfip.net/apps/IebSX7E91f/collections/pigs/documents/');
  }

  postPig(key: string, data: Object) {
    return this._http.post('https://272.selfip.net/apps/IebSX7E91f/collections/pigs/documents/',
    {"key": key, 
    "data": data}
    )
  }

  putPig(key: string, data: Object) {
    return this._http.put('https://272.selfip.net/apps/IebSX7E91f/collections/pigs/documents/' + key
    , {"key": key, "data": data});
  }

  deletePig(key: string) {
    console.log("deleting pig", key);
    return this._http.delete('https://272.selfip.net/apps/IebSX7E91f/collections/pigs/documents/' + key);
  }
}
