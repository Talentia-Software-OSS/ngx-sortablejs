import { Component, input } from '@angular/core';
import { SortablejsModule } from '@talentia/ngx-sortablejs';
import {Options} from 'sortablejs';

@Component({
  standalone: true,
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
  imports: [
    SortablejsModule
  ]
})
export class ChildComponentComponent {

  readonly list = input<string[]>();

  options: Options = {
    group: 'test'
  };

}
