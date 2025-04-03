import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../service/data.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,  HeaderComponent], // ✅ Ensure HttpClientModule is imported
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchQuery = "";
  showSearchResults = false;
  shops: any[] = [];
  paginatedShops: any[] = [];
  pages: number[] = [];
  currentPage = 1;
  itemsPerPage = 12;
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
    }, 5000); // Change background every 5 seconds
  }

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
          console.error("Error fetching shops:", error);
        }
      });
    } else {
      this.showSearchResults = false;
    }
  }
  

  updatePagination() {
    // Calculate start and end index
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.shops.length);
    
    // Update paginated shops
    this.paginatedShops = this.shops.slice(startIndex, endIndex);
    
    // Generate page numbers
    const totalPages = Math.ceil(this.shops.length / this.itemsPerPage);
    this.pages = Array.from({length: totalPages}, (_, i) => i + 1);
    
    // Ensure current page is valid
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    // Log for debugging
    console.log('Current Page:', this.currentPage);
    console.log('Total Items:', this.shops.length);
    console.log('Items per Page:', this.itemsPerPage);
    console.log('Total Pages:', totalPages);
    console.log('Paginated Items:', this.paginatedShops.length);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToPage(page: number) {
    console.log('Navigating to page:', page);
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get totalPages() {
    return Math.ceil(this.shops.length / this.itemsPerPage);
  }

  onHeaderSearch(query: string) {
    this.searchQuery = query;
    this.showResults();
  }

  getPageRange(): (number | string)[] {
    const range: (number | string)[] = [];
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        range.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          range.push(i);
        }
        range.push('...');
        range.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        range.push(1);
        range.push('...');
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          range.push(i);
        }
      } else {
        range.push(1);
        range.push('...');
        range.push(this.currentPage - 1);
        range.push(this.currentPage);
        range.push(this.currentPage + 1);
        range.push('...');
        range.push(this.totalPages);
      }
    }
    return range;
  }
}
