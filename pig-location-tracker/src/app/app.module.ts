import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PigTableComponent } from './components/pig-table/pig-table.component';
import { PigAddFormComponent } from './components/pig-add-form/pig-add-form.component';
import { ReportMapComponent } from './components/report-map/report-map.component';
import { PigLandingPageComponent } from './components/pig-landing-page/pig-landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonsComponent } from './components/buttons/buttons.component';


@NgModule({
  declarations: [
    AppComponent,
    PigTableComponent,
    PigAddFormComponent,
    ReportMapComponent,
    PigLandingPageComponent,
    HeaderComponent,
    ButtonsComponent
  ],
  imports: [
    BrowserModule, // for interacting with DOM
    AppRoutingModule, // for angular routing
    HttpClientModule // for using http as the communication method to consume APIs 
  ],
  providers: [], // likely empty, since I'm registering all services via providedIn
  bootstrap: [AppComponent]
})
export class AppModule { }
