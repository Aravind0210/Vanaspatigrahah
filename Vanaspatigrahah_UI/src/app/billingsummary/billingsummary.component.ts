import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-billingsummary',
  imports: [CommonModule],
  templateUrl: './billingsummary.component.html',
  styleUrl: './billingsummary.component.css'
})
export class BillingsummaryComponent {
data = [
    { weight: 7.009, lessWeight: 0.020, amount: 60978.30 },
    { weight: 2.558, lessWeight: 0.020, amount: 24838.18 }
  ];

  get totalWt(): string {
    return this.data.reduce((sum, row) => sum + row.weight, 0).toFixed(3);
  }

  get totalLessWt(): string {
    return this.data.reduce((sum, row) => sum + row.lessWeight, 0).toFixed(3);
  }

  get totalAmt(): string {
    return this.data.reduce((sum, row) => sum + row.amount, 0).toFixed(2);
  }

  get avgRate(): string {
    const netWt = parseFloat(this.totalWt) - parseFloat(this.totalLessWt);
    return netWt > 0 ? (parseFloat(this.totalAmt) / netWt).toFixed(2) : '0.00';
  }

  deleteRow(index: number): void {
    this.data.splice(index, 1);
  }

  exportToCSV(): void {
    if (this.data.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = ['SL NO', 'Weight (gm)', 'Less Weight (gm)', 'Amount (Rs.)'];
    const rows = this.data.map((row, index) => [
      index + 1,
      row.weight.toFixed(3),
      row.lessWeight.toFixed(3),
      row.amount.toFixed(2),
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const a = document.createElement('a');
    a.href = url;
    a.download = `billing_data_${today}.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
