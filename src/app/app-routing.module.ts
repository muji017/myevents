import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

const routes: Routes = [
  {path:"",redirectTo:'dashboard',pathMatch:'full'},
  {path:'dashboard',component:HomeComponent},
  {path:'events',component:EventsComponent},
  {path:'events/:eventId',component:EventDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
