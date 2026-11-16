# @talentia/ngx-sortablejs

This package is an Angular binding for [Sortable.js](https://github.com/RubaXa/Sortable).
Supports standard arrays and Angular `FormArray`.

Previously known as angular-sortablejs.

## Compatibility

| @talentia/ngx-sortablejs | Angular |
| ------------------------ | ------- |
| 11.1.10                  | 21.x    |
| 11.1.9                   | 20.x    |
| 11.1.7 - 11.1.8          | 19.x    |
| 11.1.5 - 11.1.6          | 18.x    |
| 11.1.4                   | 17.x    |
| 11.1.2 - 11.1.3          | 16.x    |
| 11.1.1                   | 15.x    |

## Demo

The demo app is in the `projects/demo` directory: run `npm run start` to build the library and serve the demo on [localhost:4200](http://localhost:4200).

Trees are also supported: [tree with fake root element (\*ngFor once, root can also be hidden anyway)](https://stackblitz.com/edit/angular-o1pq84) or [without (\*ngFor 2 times)](https://stackblitz.com/edit/angular-ptu94s).

## Installation

Install the library and its peer dependency `sortablejs` (1.15.x):

```sh
npm i @talentia/ngx-sortablejs sortablejs@~1.15.0
npm i -D @types/sortablejs
```

## Usage

First, import `SortablejsModule.forRoot({ /* and here some global settings if needed */ })` into the root module of your application (or in `importProvidersFrom(...)` when bootstrapping with `bootstrapApplication`):

```typescript
import { SortablejsModule } from '@talentia/ngx-sortablejs';

imports: [
  // ...
  SortablejsModule.forRoot({ animation: 150 }),
  // ...
]
```

Then import `SortablejsModule` into the other angular modules where you want to use it:

```typescript
imports: [
  // ...
  SortablejsModule,
  // ...
]
```

Then use `sortablejs` property on a container HTML element to tell Angular that this is a sortable container; also pass the `items` array to both `*ngFor` and `[sortablejs]` to register the changes automatically.

## Directive API

- `sortablejs` - directive, accepts model to be auto-updated (see examples below)
- `sortablejsContainer` - directive input, CSS selector for the sortable container, string. Mostly required for frameworks that wrap the content into the elements where it is impossible to access the real container element (e.g. @angular/material). Example: `sortablejsContainer=".mat-grid-list"`
- `sortablejsOptions` - directive input, sortable options to pass in. Please note that in order to change the options later the whole object needs to be recreated, see below
- `sortablejsInit` - directive output, returns the current Sortable instance. Example: `(sortablejsInit)="sortableInstance = $event"`

## Simple sortable list

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <h2>Drag / drop the item</h2>
      <div [sortablejs]="items">
        <div *ngFor="let item of items">{{ item }}</div>
      </div>
    `
})
export class AppComponent {
   items = [1, 2, 3, 4, 5];
}
```

### Passing the options

Pass the options with `sortablejsOptions` property.

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
      <h2>Drag / drop the item</h2>
      <div [sortablejs]="items" [sortablejsOptions]="{ animation: 150 }">
        <div *ngFor="let item of items">{{ item }}</div>
      </div>
    `
})
export class AppComponent {
   items = [1, 2, 3, 4, 5];
}
```

### Tracking lists update events

You can use the options' `onUpdate` method to track the changes (see also *Passing the options* section):

```ts
constructor() {
  this.options = {
    onUpdate: (event: any) => {
      this.postChangesToServer();
    }
  };
}
```

If you use FormArray you are able to choose a more elegant solution:

```ts
public items = new FormArray([
  new FormControl(1),
  new FormControl(2),
  new FormControl(3),
]);

constructor() {
  this.items.valueChanges.subscribe(() => {
    this.postChangesToServer(this.items.value);
  });
}
```

but note, that here you will be able to take the whole changed array only (no oldIndex / newIndex).

### Updating the options

You can pass a new options object at anytime via the `[sortablejsOptions]` binding and the Angular's change detection will check for the changes from the previous options and will call the low level option setter from [Sortable.js](https://github.com/RubaXa/Sortable) to set the new option values.
> Note: It will only detect changes when a brand new options object is passed, not deep changes.

### Drag & drop between two lists

The only thing which should be done is assigning the `group` option to the both list. Everything else is handled automatically.

```typescript
import { Component } from '@angular/core';
import { Options } from 'sortablejs';

@Component({
    selector: 'my-app',
    template: `
    <h2>Drag / drop the item</h2>
    <h3>list 1</h3>
    <div class="items1" [sortablejs]="items1" [sortablejsOptions]="options">
      <div *ngFor="let item of items1">{{ item }}</div>
    </div>
    <h3>list 2</h3>
    <div class="items2" [sortablejs]="items2" [sortablejsOptions]="options">
      <div *ngFor="let item of items2">{{ item }}</div>
    </div>
    `
})
export class AppComponent {
   items1 = [1, 2, 3, 4, 5];
   items2 = ['a', 'b', 'c', 'd', 'e'];

   options: Options = {
     group: 'test'
   };
}
```

### Drag & drop between two lists: clone mode

The clone mode is similar to the one above (of course the proper Sortablejs settings should be used; see demo). The only important thing is that the `ngx-sortablejs` does clone the HTML element but **does not clone the variable** (or `FormControl` in case of `FormArray` input). By default the variable will be taken as is: a primitive will be copied, an object will be referenced.

If you want to clone the item being sorted in a different manner, you can provide `sortablejsCloneFunction` as a parameter. This function receives an item and should return a clone of that item.

```typescript
import { Component } from '@angular/core';
import { Options } from 'sortablejs';

@Component({
    selector: 'my-app',
    template: `
    <h2>Drag / drop the item</h2>
    <h3>list 1</h3>
    <div class="items1" [sortablejs]="items1" [sortablejsOptions]="options" [sortablejsCloneFunction]="myCloneImplementation">
      <div *ngFor="let item of items1">{{ item }}</div>
    </div>
    <h3>list 2</h3>
    <div class="items2" [sortablejs]="items2" [sortablejsOptions]="options" [sortablejsCloneFunction]="myCloneImplementation">
      <div *ngFor="let item of items2">{{ item }}</div>
    </div>
    `
})
export class AppComponent {
  items1 = [1, 2, 3, 4, 5];
  items2 = ['a', 'b', 'c', 'd', 'e'];

  options: Options = {
    group: { name: 'test', pull: 'clone' }
  };

  myCloneImplementation = (item) => {
    return item; // this is what happens if sortablejsCloneFunction is not provided. Add your stuff here
  }

}
```

### Change detection

The event handlers passed in the options (`onUpdate`, `onAdd`, ...) are always called inside the Angular zone (`NgZone.run`), so the changes they make are picked up by change detection.

The library is tested with zone.js-based change detection: since Angular 21 new applications are zoneless by default, add `provideZoneChangeDetection()` to the providers of `bootstrapApplication` (as the demo does).

### Configure the options globally

If you want to use the same sortable options across different places of your application you might want to set up global configuration. Add the following to your main module to enable e.g. `animation: 150` everywhere:

```typescript
imports: [
  // ...
  // any properties and events available on original library work here as well
  SortablejsModule.forRoot({
    animation: 150
  }),
  // ...
]
```

This value will be used as a default one, but it can be overwritten by a local `sortablejsOptions` property.

## Angular Material specifics

### Expansion panel

There is a bug with expansion panel which appears because angular material does not really hide the content of panel, but uses `visibility: hidden`. What we need to do is to actually totally hide it from the DOM instead.

Just add this to your **global** styles

```css
mat-expansion-panel.sortable-drag .mat-expansion-panel-content {
  display: none;
}
```

and the issue should be resolved.

### Ripple effect

The elements with ripple effect like `mat-list-item` are affected. The dragging is broken because there is a [div created right under the cursor](https://github.com/angular/material2/blob/master/src/lib/core/ripple/ripple-renderer.ts#L142) and the webkit has no idea what to do with it.

There are two solutions:

1. Disable the ripple effect

```ts
<a mat-list-item [disableRipple]="true">
```

2. Use `handle` property and block propagation of `mousedown` and `touchstart` events on the handler to prevent ripple.

```ts
<div [sortablejs]="..." [sortablejsOptions]="{ handle: '.handle' }">
  <a mat-list-item *ngFor="let a of b" [routerLink]="..." routerLinkActive="active">
    <mat-icon matListIcon
              class="handle"
              (mousedown)="$event.stopPropagation()"
              (touchstart)="$event.stopPropagation()">drag_handle</mat-icon> {{ a }}
  </a>
</div>
```

## How it works

The model is automatically updated because you pass the `items` as `<div [sortablejs]="items">`. The `items` variable can be either an ordinary JavaScript array or a reactive forms `FormArray`.

If you won't pass anything, e.g. `<div sortablejs>`, the items won't be automatically updated, thus you should take care of updating the array on your own using standard `Sortable.js` events.

Original events `onAdd`, `onRemove`, `onUpdate` are intercepted by the library in order to reflect the sortable changes into the data. If you will add your own event handlers (inside of the options object) they will be called right after the data binding is done. If you don't pass the data, e.g. `<div sortablejs>` the data binding is skipped and only your event handlers will be fired.

Important: the original `onAdd` event happens before the `onRemove` event because the original library makes it like that. We change this behavior and call 'onAdd' after the 'onRemove'. If you want to work with original onAdd event you can use `onAddOriginal` which happens before `onRemove`.

## Further help

This project currently uses [Angular CLI](https://github.com/angular/angular-cli) version 21.2.25.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Reference

This project is forked from [ngx-sortablejs](https://github.com/SortableJS/ngx-sortablejs).

## License

MIT
