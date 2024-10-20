import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumberFormat',
  standalone: true  // This makes the pipe standalone
})
export class CustomNumberFormatPipe implements PipeTransform {
  transform(value: any): string {
    let num = parseFloat(value);

    if (isNaN(num)) {
      return '0';  // Handle non-numeric values
    }

    // Use `toLocaleString` to format numbers with commas and fixed decimal places
    if (Number.isInteger(num)) {
      return num.toLocaleString();  // Format integers with commas
    } else {
      return num.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 50 });
    }
  }
}

export class NumberFormatPipe {
}
