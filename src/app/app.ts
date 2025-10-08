import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';   // optional, only if you use routing
import { CountdownComponent } from './countdown/countdown'; // <-- adjust path if needed

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CountdownComponent,
    RouterModule   // keep any other imports you already have
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Change this to whatever future date you need
  upcoming = new Date('2025-10-17T23:00:00Z');
}
