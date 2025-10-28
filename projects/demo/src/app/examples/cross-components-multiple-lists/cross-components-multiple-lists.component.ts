import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ChildComponentComponent } from './child-component/child-component.component';

@Component({
  standalone: true,
  selector: 'app-cross-components-multiple-lists',
  templateUrl: './cross-components-multiple-lists.component.html',
  styleUrls: ['./cross-components-multiple-lists.component.css'],
  imports: [
    JsonPipe,
    ChildComponentComponent
  ]
})
export class CrossComponentsMultipleListsComponent {

  list1 = [
    '1',
    '2',
    '3',
    '4',
    '5'
  ];

  list2 = [
    '6',
    '7',
    '8',
    '9',
    '10'
  ];

}
