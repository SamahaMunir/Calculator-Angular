import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumberFormat',
  standalone: true  // This makes the pipe standalone
})
export class CustomNumberFormatPipe implements PipeTransform {
  transform(value: any): string {
    let num = parseFloat(value);

    if (isNaN(num)) {
      return 'Invalid';  // Handle non-numeric values
    }

    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';  // Format millions
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';  // Format thousands
    }

    // For smaller numbers
    if (Number.isInteger(num)) {
      return num.toString();  // Return integer without decimals
    } else {
      return num.toFixed(2).replace(/\.00$/, '');  // Format to 2 decimal places and remove unnecessary ".00"
    }
  }
}
