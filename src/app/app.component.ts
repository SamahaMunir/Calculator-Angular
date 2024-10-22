import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomNumberFormatPipe } from './number-format.pipe'; // Custom pipe
import { CalculationService } from './calculation.service'; // Import CalculationService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CustomNumberFormatPipe],  // Import CustomNumberFormatPipe
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  screenValue: string = '';  // Keep as string to handle inputs and operations
  operatorPressed: boolean = false; // Track if an operator was pressed
  expression: string = '';  // This will hold the complete expression (operands + operator)

  constructor(private renderer: Renderer2, private calcService: CalculationService) {} // Inject CalculationService

  setTheme(themeNumber: number) {
    this.renderer.removeClass(document.body, 'theme-1');
    this.renderer.removeClass(document.body, 'theme-2');
    this.renderer.removeClass(document.body, 'theme-3');

    if (themeNumber === 1) {
      this.renderer.addClass(document.body, 'theme-1');
    } else if (themeNumber === 2) {
      this.renderer.addClass(document.body, 'theme-2');
    } else if (themeNumber === 3) {
      this.renderer.addClass(document.body, 'theme-3');
    }
  }

  addToScreen(value: string) {
    // If an operator was pressed, clear the screen for new operand input
    if (this.operatorPressed) {
      this.screenValue = '';
      this.operatorPressed = false;
    }
    this.screenValue += value;
    this.expression += value;  // Append the value to the expression
  }

  addOperator(operator: string) {
    // Avoid appending multiple operators consecutively
    if (!this.operatorPressed && this.screenValue.length > 0) {
      this.screenValue += operator;
      this.expression += operator;  // Add the operator to the expression
      this.operatorPressed = true;  // Set flag that operator was pressed
    }
  }

  deleteLast() {
    if (this.screenValue.length > 0) {
      this.screenValue = this.screenValue.slice(0, -1);
      this.expression = this.expression.slice(0, -1);  // Update the expression accordingly
    }
  }

  resetScreen() {
    this.screenValue = '';
    this.expression = '';  // Reset the entire expression
    this.operatorPressed = false;  // Reset operator flag
  }

  evaluateExpression() {
    const result = this.calcService.evaluateExpression(this.expression);  // Use CalculationService
    this.screenValue = result;

    // Explicitly remove trailing .00 if present
    if (this.screenValue.endsWith('.00')) {
      this.screenValue = this.screenValue.substring(0, this.screenValue.length - 3);
    }

    this.expression = this.screenValue;  // After evaluation, the result becomes the new expression
    this.operatorPressed = false;  // Reset operator flag after evaluation
  }
}
