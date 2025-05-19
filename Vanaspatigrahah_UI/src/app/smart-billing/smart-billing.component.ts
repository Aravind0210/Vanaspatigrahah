import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DataService } from '../service/data.service';
@Component({
  selector: 'app-smart-billing',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './smart-billing.component.html',
  styleUrls: ['./smart-billing.component.css']
})
export class SmartBillingComponent {
  weight: number = 0;
  lessWeight: number = 0;
  rate: number = 0;
phoneNumber: string = '';

  netWeight: number = 0;
  totalAmount: number = 0;
  billDateTime: string = '';
  statusMessage: string = '';
  currentDateTime: string = '';

  constructor(private dataService: DataService) {
    setInterval(() => {
      this.currentDateTime = new Date().toLocaleString();
    }, 1000);
  }

handleGenerateAndSave() {
  const billData = this.calculate(); // generate once

  this.generateAndSendBill();        // send to fake API
  this.generateAndSendBilltoinsert(); // send to backend
  this.sendWhatsAppMessage(billData);         // send to WhatsApp
}


    generateAndSendBilltoinsert() {
    this.statusMessage = 'Saving bill...';
    const billData = this.calculate();

    this.dataService.saveBill(billData).subscribe({
      next: (res) => {
        this.statusMessage = 'Bill saved successfully!';
      },
      error: (err) => {
        this.statusMessage = `Error: ${err.message}`;
      }
    });
  }

sendWhatsAppMessage(billData: any) {
  const phoneNumber = this.phoneNumber?.trim();
  if (!phoneNumber || phoneNumber.length < 10) {
    this.statusMessage = 'Please enter a valid phone number with country code.';
    return;
  }

  const message = `🧾 *Gold Bill*\n\n` +
                  `Weight: ${billData.weight}g\n` +
                  `Less Weight: ${billData.lessWeight}g\n` +
                  `Net Weight: ${billData.netWeight}g\n` +
                  `Rate: ₹${billData.rate}\n` +
                  `Total Amount: ₹${billData.totalAmount}\n\n` +
                  `🗓 Date: ${this.currentDateTime}`;

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(url, '_blank');
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
