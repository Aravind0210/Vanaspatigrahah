import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchQuery = "";
  showSearchResults = false;
  shops: any[] = [];
  paginatedShops: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  backgrounds = [
    'https://images.unsplash.com/photo-1524247108137-732e0f642303?w=600&auto=format&fit=crop&q=60',
    'https://plus.unsplash.com/premium_photo-1679765926730-78765a8b7802?w=600&auto=format&fit=crop&q=60'
  ];
  currentImageIndex = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.startBackgroundRotation();
  }

  startBackgroundRotation() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000);
  }

  showResults() {
    if (this.searchQuery.trim()) {
      this.dataService.getShops(this.searchQuery).subscribe({
        next: (data) => {
          this.shops = data;
          this.showSearchResults = this.shops.length > 0;
          this.currentPage = 1;
          this.updatePagination();
          console.log("Shops Loaded:", this.shops);
        },
        error: (error) => {
          console.error("Error fetching shops:", error);
        }
      });
    } else {
      this.showSearchResults = false;
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedShops = this.shops.slice(startIndex, startIndex + this.itemsPerPage);
    console.log("Paginated Shops:", this.paginatedShops);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      console.log("Next Page:", this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      console.log("Previous Page:", this.currentPage);
    }
  }

  get totalPages() {
    const pages = Math.ceil(this.shops.length / this.itemsPerPage);
    console.log("Total Pages:", pages);
    return pages;
  }

  onHeaderSearch(query: string) {
    this.searchQuery = query;
    this.showResults();
  }
}
