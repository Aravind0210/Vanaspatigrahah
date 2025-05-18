import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-billingsummary',
  imports: [CommonModule],
  templateUrl: './billingsummary.component.html',
  styleUrl: './billingsummary.component.css'
})
export class BillingsummaryComponent {
  gold: any;


  ngOnInit() {

    // Fetch data when component initializes
    this.GETGOLDSUMMARY();
  }

    constructor(private dataService: DataService) {}



  GETGOLDSUMMARY(): void {
    this.dataService.getgoldsummary('').subscribe(
      (data) => {
        this.gold = data;
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
        // Remove the deleted item from local list
        this.gold = this.gold.filter((item: any) => item.id !== id);
        console.log('Deleted successfully');
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }
}


}
