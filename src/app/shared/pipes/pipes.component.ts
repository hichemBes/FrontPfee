import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], filters: Object) {
    const keys = Object.keys(filters).filter(key => filters[key]);
    const filterObject = object => keys.every(key =>
      (typeof object[key]) == 'string' ?
        object[key].toUpperCase().indexOf(filters[key].toUpperCase()) != -1 :
        (typeof object[key]) == 'boolean' ?
          object[key] : object[key] === object[key]
    );

    return keys.length ? list.filter(filterObject) : list;
  }

}