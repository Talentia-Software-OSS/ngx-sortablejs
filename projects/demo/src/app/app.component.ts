import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class AppComponent {
  title = 'ngx sortablejs';

  navbarCollapsed = true;

  get showTestCases() {
    return localStorage.getItem('showTestCases') === 'true';
  }
}
