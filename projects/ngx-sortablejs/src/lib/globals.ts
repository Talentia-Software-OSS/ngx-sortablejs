import { InjectionToken } from '@angular/core';
import { Options } from 'sortablejs';

export const GLOBALS = new InjectionToken<Options>('Global config for sortablejs');
