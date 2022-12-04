import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PigAddFormComponent } from './components/pig-add-form/pig-add-form.component';
import { PigLandingPageComponent } from './components/pig-landing-page/pig-landing-page.component';
import { PigTableComponent } from './components/pig-table/pig-table.component';
import { PigViewComponent } from './components/pig-view/pig-view.component';
import { ReportMapComponent } from './components/report-map/report-map.component';


// name does not matter as long as its typed by Routes (which is an array of Route interface objects)
const routes: Routes = [
  { path: '', component: PigLandingPageComponent},
  { path: 'add', component: PigAddFormComponent },
  { path: 'info/:key', component: PigViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
