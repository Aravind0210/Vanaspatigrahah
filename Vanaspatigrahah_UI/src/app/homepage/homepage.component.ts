import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Shop {
  name: string;
  plant: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  searchQuery = '';
  showSearchResults = false;
  shops: Shop[] = [];
  filteredShops: Shop[] = [];
  paginatedShops: Shop[] = [];
  currentPage = 1;
  itemsPerPage = 6;

  backgrounds = [
    'https://images.unsplash.com/photo-1524247108137-732e0f642303?w=600&auto=format&fit=crop&q=60',
    'https://plus.unsplash.com/premium_photo-1679765926730-78765a8b7802?w=600&auto=format&fit=crop&q=60'
  ];
  currentImageIndex = 0;

  ngOnInit() {
    this.fetchShops();
    this.startBackgroundRotation();
  }

  startBackgroundRotation() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000); // Change background every 5 seconds
  }

  fetchShops() {
    this.shops = [
      { name: 'Green Paradise', plant: 'Rose', price: 150, category: 'flowers' },
      { name: 'Nature’s Hub', plant: 'Lily', price: 200, category: 'flowers' },
      { name: 'Flora World', plant: 'Lily', price: 300, category: 'rare' },
      { name: 'Plant Haven', plant: 'Lily', price: 100, category: 'succulents' },
      { name: 'Blooming Garden', plant: 'Lily', price: 250, category: 'flowers' },
      { name: 'Eco Nursery', plant: 'Bonsai', price: 500, category: 'rare' }
    ];
    this.filteredShops = [...this.shops];
    this.updatePagination();
  }

  showResults() {
    this.filteredShops = this.searchQuery.trim()
      ? this.shops.filter(shop =>
          shop.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          shop.plant.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : [...this.shops];

    this.showSearchResults = this.filteredShops.length > 0;
    this.currentPage = 1;
    this.updatePagination();
  }

  resetSearch() {
    this.searchQuery = '';
    this.filteredShops = [...this.shops];
    this.showSearchResults = false;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedShops = this.filteredShops.slice(startIndex, startIndex + this.itemsPerPage);
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

  get totalPages() {
    return Math.ceil(this.filteredShops.length / this.itemsPerPage);
  }
}
