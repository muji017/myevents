import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { EventsComponent } from './components/events/events.component';
import { CreateEventDialogComponent } from './components/create-event-dialog/create-event-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EventsComponent,
    CreateEventDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule
  ],
  providers: [
    provideToastr({
      timeOut: 2000,
      preventDuplicates: true,
      progressBar: true
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
