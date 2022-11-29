import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PigTableComponent } from './components/pig-table/pig-table.component';
import { PigAddFormComponent } from './components/pig-add-form/pig-add-form.component';
import { ReportMapComponent } from './components/report-map/report-map.component';
import { PigLandingPageComponent } from './components/pig-landing-page/pig-landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PigTableComponent,
    PigAddFormComponent,
    ReportMapComponent,
    PigLandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
