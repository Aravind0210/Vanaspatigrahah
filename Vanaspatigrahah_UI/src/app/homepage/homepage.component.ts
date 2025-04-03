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

  onHeaderSearch(query: string) {
    this.searchQuery = query;
    this.showResults();
  }
}
