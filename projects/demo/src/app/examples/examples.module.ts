import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleSortableComponent } from './simple-sortable/simple-sortable.component';
import { SortablejsModule } from '@talentia/ngx-sortablejs';
import { MultipleListsComponent } from './multiple-lists/multiple-lists.component';
import { SortableFormArrayComponent } from './sortable-form-array/sortable-form-array.component';
import { SortableWithOptionsComponent } from './sortable-with-options/sortable-with-options.component';
import { CrossComponentsMultipleListsComponent } from './cross-components-multiple-lists/cross-components-multiple-lists.component';
import { ChildComponentComponent } from './cross-components-multiple-lists/child-component/child-component.component';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SimpleSortableComponent,
    SortableWithOptionsComponent,
    SortableFormArrayComponent,
    MultipleListsComponent,
    CrossComponentsMultipleListsComponent,
    ChildComponentComponent
  ],
})
export class ExamplesModule { }
