import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-billingsummary',
  templateUrl: './billingsummary.component.html',
  styleUrls: ['./billingsummary.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class BillingsummaryComponent {

  @ViewChild('fromDateInput') fromDateInput!: ElementRef;
  @ViewChild('toDateInput') toDateInput!: ElementRef;

  gold: any[] = [];
  pagedGold: any[] = [];

  totalWeight: number = 0;
  totalAmount: number = 0;
  totalLessWeight: number = 0;
  avgRate: number = 0;

  fromDate: string = '';
  toDate: string = '';

  
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  isFilterActive: boolean = false; 

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.GETGOLDSUMMARY();
  }

  openFromDatePicker() {
    this.fromDateInput.nativeElement.click();
  }

  openToDatePicker() {
     this.toDateInput.nativeElement.showPicker?.(); // for modern browsers
  this.toDateInput.nativeElement.click(); // fallback for older browsers
  }

  
  filterByDate(): void {
    if (this.fromDate && this.toDate) {
      this.dataService.getgoldsummary(`?start_date=${this.fromDate}&end_date=${this.toDate}`).subscribe(
        (data) => {
          this.gold = data;
          this.isFilterActive = true;      // activate pagination visibility
          this.resetPagination();          // reset paging on new filtered data
          this.calculateSummary();
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    } else {
      alert('Please select both start and end dates.');
      this.isFilterActive = false;      // no filter applied if invalid
    }
  }

  GETGOLDSUMMARY(): void {
    this.dataService.getgoldsummary('').subscribe(
      (data) => {
        this.gold = data;
         this.isFilterActive = false;     // no filter applied on full data load
        this.resetPagination();
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

  resetPagination() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.gold.length / this.pageSize) || 1;
    this.setPagedData();
  }

  setPagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedGold = this.gold.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.setPagedData();
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
