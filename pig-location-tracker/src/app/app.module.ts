import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PigTableComponent } from './components/pig-table/pig-table.component';
import { PigAddFormComponent } from './components/pig-add-form/pig-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PigTableComponent,
    PigAddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
