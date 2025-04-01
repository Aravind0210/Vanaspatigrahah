import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchQuery = '';
  showSearchResults = false;
  shops: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;
  paginatedShops: any[] = [];
  isAuthenticated = false; // Add this property

  constructor(private dataService: DataService) {}

  showResults() {
    if (this.searchQuery.trim()) {
      this.dataService.getShops(this.searchQuery).subscribe({
        next: (data) => {
          this.shops = data;
          this.showSearchResults = this.shops.length > 0;
          this.currentPage = 1;
          this.updatePagination();
        },
        error: (error) => {
          console.error('Error fetching shops:', error);
          this.showSearchResults = false;
        }
      });
    } else {
      this.showSearchResults = false;
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.shops.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedShops = this.shops.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  closeSearchResults() {
    this.showSearchResults = false;
    this.searchQuery = '';
  }
}
