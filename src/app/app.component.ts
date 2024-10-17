import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  screenValue: string = '';  // Holds the calculator display value

  constructor(private renderer: Renderer2) {}

  // Function to set the theme based on the number clicked (1, 2, or 3)
  setTheme(themeNumber: number) {
    // Remove any previously applied theme class
    this.renderer.removeClass(document.body, 'theme-1');
    this.renderer.removeClass(document.body, 'theme-2');
    this.renderer.removeClass(document.body, 'theme-3');

    // Apply the new theme class based on the clicked number
    if (themeNumber === 1) {
      this.renderer.addClass(document.body, 'theme-1');
    } else if (themeNumber === 2) {
      this.renderer.addClass(document.body, 'theme-2');
    } else if (themeNumber === 3) {
      this.renderer.addClass(document.body, 'theme-3');
    }
  }

  // Function to add characters to the screen
  addToScreen(value: string) {
    this.screenValue += value;
  }

  // Function to delete the last character from the screen
  deleteLast() {
    if (this.screenValue.length > 0) {
      this.screenValue = this.screenValue.slice(0, -1);
    }
  }

  // Function to reset the screen
  resetScreen() {
    this.screenValue = '';
  }

  // Function to evaluate the mathematical expression on the screen
  evaluateExpression() {
    try {
      // Use eval to evaluate the expression
      this.screenValue = eval(this.screenValue).toString();
    } catch (e) {
      // If there's an error in the expression, reset the screen
      this.screenValue = 'Error';
      setTimeout(() => {
        this.screenValue = '';
      }, 1500);  // Clear the screen after 1.5 seconds
    }
  }
}
