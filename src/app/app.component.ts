import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for built-in pipes
import { evaluate } from 'mathjs';  // Import the evaluate function from mathjs

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule if needed
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  screenValue: string = '';  // Keep as string to handle inputs and operations

  constructor(private renderer: Renderer2) {
  }

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
    this.screenValue += value;
  }

  deleteLast() {
    if (this.screenValue.length > 0) {
      this.screenValue = this.screenValue.slice(0, -1);
    }
  }

  resetScreen() {
    this.screenValue = '';
  }

  evaluateExpression() {
    try {
      let result = evaluate(this.screenValue);
      this.screenValue = result.toString();

      // Explicitly remove trailing .00 if present
      if (this.screenValue.endsWith('.00')) {
        this.screenValue = this.screenValue.substring(0, this.screenValue.length - 3);
      }
    } catch (e) {
      this.screenValue = 'Error';
      setTimeout(() => {
        this.screenValue = '';
      }, 1500);  // Clear the screen after 1.5 seconds if an error occurs
    }
  }
}
