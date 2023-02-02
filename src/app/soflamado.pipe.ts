import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'soflamado'
})
export class SoflamadoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
