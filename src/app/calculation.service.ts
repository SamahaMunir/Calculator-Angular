import { Injectable } from '@angular/core';
import { evaluate } from 'mathjs'; // Use mathjs for evaluation

@Injectable({
  providedIn: 'root',
})
export class CalculationService {

  constructor() {}

  evaluateExpression(expression: string): string {
    try {
      const result = evaluate(expression);  // Evaluate the expression
      return result.toString();  // Convert result to a string
    } catch (error) {
      console.error('Error evaluating expression:', error);
      return 'Error';  // Return 'Error' if evaluation fails
    }
  }
}
