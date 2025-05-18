import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-smart-billing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-billing.component.html',
  styleUrls: ['./smart-billing.component.css']
})
export class SmartBillingComponent {
  weight: number = 0;
  lessWeight: number = 0;
  rate: number = 0;

  netWeight: number = 0;
  totalAmount: number = 0;
  billDateTime: string = '';
  statusMessage: string = '';
  currentDateTime: string = '';

  constructor() {
    setInterval(() => {
      this.currentDateTime = new Date().toLocaleString();
    }, 1000);
  }

  calculate() {
    const net = Math.max(0, this.weight - this.lessWeight);
    this.netWeight = net;
    this.totalAmount = net * this.rate;
    this.billDateTime = new Date().toLocaleString();
    return {
      weight: this.weight,
      lessWeight: this.lessWeight,
      netWeight: this.netWeight,
      rate: this.rate,
      totalAmount: this.totalAmount,
      dateTime: this.billDateTime
    };
  }

  async generateAndSendBill() {
    this.statusMessage = 'Saving bill...';
    const billData = this.calculate();
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(billData)
      });
      if (!response.ok) throw new Error('Network response was not OK');
      const data = await response.json();
      this.statusMessage = `Bill saved successfully! (ID: ${data.id})`;
    } catch (error: any) {
      this.statusMessage = `Error saving bill: ${error.message}`;
    }
  }

  printBill() {
    window.print();
  }
}
