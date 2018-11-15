import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MyMaterialModuleModule } from './my-material-module/my-material-module.module';
import { AppComponent } from './app.component';
import { SwMoviesComponent } from './sw-movies/sw-movies.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SwSelectComponent } from './sw-select/sw-select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwOpeningCrawlComponent } from './sw-opening-crawl/sw-opening-crawl.component';
import { SwCharactersComponent } from './sw-characters/sw-characters.component';
import { LoaderComponent } from './loader/loader.component';
import { SwMoviesService } from './sw-movies/sw-movies.service';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    SwMoviesComponent,
    SwSelectComponent,
    SwOpeningCrawlComponent,
    SwCharactersComponent,
    LoaderComponent,
    ErrorNotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MyMaterialModuleModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
