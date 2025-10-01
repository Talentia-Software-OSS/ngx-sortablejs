import {SortableData} from './sortablejs.directive';

export class SortablejsBinding {

  constructor(private target: SortableData) {
  }

  insert(index: number | undefined, item: any): void {
    if (this.isFormArray) {
      this.target.insert(index, item);
    } else {
      this.target.splice(index, 0, item);
    }
  }

  get(index: number | undefined): any {
    if (index === undefined || index === null) {
      return undefined;
    }
    
    return this.isFormArray ? this.target.at(index) : this.target[index];
  }

  remove(index: number | undefined): any {
    let item;

    if (this.isFormArray) {
      item = this.target.at(index);
      this.target.removeAt(index);
    } else {
      item = this.target.splice(index, 1)[0];
    }

    return item;
  }

  // we need this to identify that the target is a FormArray
  // we don't want to have a dependency on @angular/forms just for that
  private get isFormArray(): boolean {
    // just checking for random FormArray methods not available on a standard array
    return !!this.target.at && !!this.target.insert && !!this.target.reset;
  }

}
