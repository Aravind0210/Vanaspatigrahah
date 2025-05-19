import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billingsummary',
  templateUrl: './billingsummary.component.html',
  styleUrls: ['./billingsummary.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BillingsummaryComponent {
  gold: any[] = [];
  totalWeight: number = 0;
  totalAmount: number = 0;
  totalLessWeight: number = 0;
  avgRate: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.GETGOLDSUMMARY();
  }

  GETGOLDSUMMARY(): void {
    this.dataService.getgoldsummary('').subscribe(
      (data) => {
        this.gold = data;
        this.calculateSummary();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteGold(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.dataService.deletegoldsummary(id).subscribe(
        () => {
          this.gold = this.gold.filter((item: any) => item.id !== id);
          this.calculateSummary();
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    }
  }

  calculateSummary(): void {
    this.totalWeight = this.gold.reduce((sum, item) => sum + Number(item.weight || 0), 0);
    this.totalAmount = this.gold.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    this.totalLessWeight = this.gold.reduce((sum, item) => sum + Number(item.less_weight || 0), 0);
    this.avgRate = this.totalWeight > 0 ? this.totalAmount / this.totalWeight : 0;
  }

  exportToExcel(): void {
const worksheetData = this.gold.map((item, index) => ({
  'SL NO': index + 1 as number | string,
  'Wt (gm)': item.weight,
  'Less Wt (gm)': item.less_weight,
  'Amount (Rs.)': item.amount
}));

worksheetData.push({
  'SL NO': '',
  'Wt (gm)': undefined,
  'Less Wt (gm)': undefined,
  'Amount (Rs.)': undefined
});
worksheetData.push({
  'SL NO': 'Total Wt:' as string,
  'Wt (gm)': this.totalWeight.toFixed(2),
  'Less Wt (gm)': 'Total Rs:',
  'Amount (Rs.)': this.totalAmount.toFixed(2)
});
worksheetData.push({
  'SL NO': 'Avg Rate (1 gm):' as string,
  'Wt (gm)': this.avgRate.toFixed(2),
  'Less Wt (gm)': 'Total Less Wt:',
  'Amount (Rs.)': this.totalLessWeight.toFixed(2)
});


    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Gold Summary': worksheet },
      SheetNames: ['Gold Summary']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    FileSaver.saveAs(blob, 'gold-summary.xlsx');
  }
}
