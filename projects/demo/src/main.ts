import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { SortablejsModule } from '@talentia/ngx-sortablejs';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [importProvidersFrom (
      BrowserModule, 
      AppRoutingModule, 
      SortablejsModule.forRoot({ animation: 200 })
    )
  ]
})
.catch(err => console.error(err));