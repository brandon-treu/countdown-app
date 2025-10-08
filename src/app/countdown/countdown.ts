import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';   // ← add this import

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.html',
  styleUrls: ['./countdown.css'],
  imports: [CommonModule]                       // ← make the Number pipe available
})
export class CountdownComponent implements OnInit, OnDestroy {
  /** Target date/time – pass a string or Date object from the parent */
  @Input() targetDate!: string | Date;

  /** Remaining time broken into parts */
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;

  private timerSub!: Subscription;

  ngOnInit(): void {
    const target = new Date(this.targetDate);
    if (isNaN(target.getTime())) {
      console.error('Invalid targetDate supplied to <app-countdown>');
      return;
    }

    // Tick every second
    this.timerSub = interval(1000).subscribe(() => this.updateCountdown(target));
    // Show the first value immediately
    this.updateCountdown(target);
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }

  private updateCountdown(target: Date): void {
    const now = Date.now();
    const distance = target.getTime() - now;

    if (distance <= 0) {
      this.days = this.hours = this.minutes = this.seconds = 0;
      this.timerSub?.unsubscribe();
      return;
    }

    this.days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }
}
