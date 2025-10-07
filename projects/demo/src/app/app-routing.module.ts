import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleSortableComponent } from './examples/simple-sortable/simple-sortable.component';
import { MultipleListsComponent } from './examples/multiple-lists/multiple-lists.component';
import { SortableFormArrayComponent } from './examples/sortable-form-array/sortable-form-array.component';
import { SortableWithOptionsComponent } from './examples/sortable-with-options/sortable-with-options.component';
import { CrossComponentsMultipleListsComponent } from './examples/cross-components-multiple-lists/cross-components-multiple-lists.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'sortable-array' 
  },
  {
    path: 'sortable-array',
    component: SimpleSortableComponent
  },
  {
    path: 'sortable-form-array',
    component: SortableFormArrayComponent
  },
  {
    path: 'custom-options',
    component: SortableWithOptionsComponent
  },
  {
    path: 'multiple-lists',
    component: MultipleListsComponent
  },
  {
    path: 'cross-components-multiple-list',
    component: CrossComponentsMultipleListsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
