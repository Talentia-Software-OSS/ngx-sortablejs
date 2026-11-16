# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@talentia/ngx-sortablejs` is a **fork of [SortableJS/ngx-sortablejs](https://github.com/SortableJS/ngx-sortablejs)**
(git remote `upstream`), an Angular binding for [SortableJS](https://github.com/SortableJS/Sortable)
(peer `sortablejs ~1.15.0`) kept current with Angular by Talentia. It is consumed by
`@talentia/components` (core-components) and by the HCM front-end — check real usage there before
changing behavior.

The workspace has two projects: the library (`projects/ngx-sortablejs`) and a demo app
(`projects/demo`, routes: sortable-array, sortable-form-array, custom-options, multiple-lists,
cross-components-multiple-list; styled with Bootstrap 4.6 CSS). The library version follows the
release branch name (e.g. `11.1.10`).

## Commands

```bash
npm run build          # clean:build + build:prod — production library build (dist/ngx-sortablejs)
npm run build:dev      # development build
npm start              # build:dev + ng serve demo (http://localhost:4200)
npm run watch          # lib + demo in watch mode
npm run demo:prod      # production build of the demo (also demo:dev); CI runs build:prod + demo:prod
npm run lint           # ng lint (lib + demo)
npm run lint:lib-fix   # ng lint of the library with --fix
npm run update-browserslist
```

There is no test framework (no Jest/Karma, no `*.spec.ts`): verify in the demo or in a consumer.
Node version: `.nvmrc`.

## Architecture

Everything lives in `projects/ngx-sortablejs/src/lib/`:

- **`sortablejs.directive.ts`** — `SortablejsDirective` (`[sortablejs]`, `standalone: false`).
  Inputs: `sortablejs` (the bound model: array, `FormArray` or `SortablejsBindings`),
  `sortablejsContainer` (CSS selector of the real container, e.g. for Angular Material),
  `sortablejsOptions` (SortableJS `Options`; change detection only sees a **new** options object),
  `sortablejsCloneFunction`; output `sortablejsInit` (the Sortable instance). `Sortable.create(...)`
  runs in a `setTimeout(0)` after init. The library intercepts `onAdd`/`onRemove`/`onUpdate` to apply
  the move to the bound model, then calls the user's handler from the options **inside the Angular
  zone** (`NgZone.run` in `proxyEvent`). `onAdd` is replayed after `onRemove` (`onAddOriginal` gives
  the original order). Clone mode copies the item via `sortablejsCloneFunction` (identity by default).
- **`sortablejs-binding.ts` / `sortablejs-bindings.ts`** — wrap a plain array (`splice`) or a
  `FormArray` (`insert`/`removeAt`, detected by duck typing) behind the same insert/get/remove API.
- **`sortablejs.service.ts`** — `SortablejsService` (root): holds a single global `transfer` callback used
  to move the item between two bound models, a workaround for SortableJS firing `onAdd` before
  `onRemove` (fine as long as only one drag happens at a time).
- **`globals.ts`** — `GLOBALS` `InjectionToken<Options>`, provided by `SortablejsModule.forRoot(options)`
  and merged under the per-directive options.
- **`sortablejs.module.ts`** — `SortablejsModule` (`forRoot()` in the root, plain import elsewhere).

## Working in this codebase

- Angular upgrades are done **without adopting new Angular features** (NgModule, `standalone: false`,
  zone.js in the demo via `provideZoneChangeDetection()`); the demo templates already used `@for` in v20.
- Use the `Options` type from `sortablejs` (there is no `SortablejsOptions` type in this fork).
- When testing drag & drop with Playwright, simulate native HTML5 drag with stepwise mouse moves and,
  between side-by-side lists, move the pointer above the lists: crossing another list of the same
  group moves/clones items into it (the HCM-8031 demo test in `tmp/` does this).
- `@angular/*` versions are pinned exactly; peer range `^<major>.0.0`. No `overrides` in
  `package.json`: transitive `@angular-devkit/*` are kept on the framework patch only by the lock.
- `tmp/` is git-ignored and may contain task worklogs/scripts.
