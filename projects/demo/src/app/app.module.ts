import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SortablejsModule } from '@talentia/ngx-sortablejs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamplesModule } from './examples/examples.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // global settings
    SortablejsModule.forRoot({
      animation: 200
    }),
    BsDropdownModule.forRoot(),
    ExamplesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
