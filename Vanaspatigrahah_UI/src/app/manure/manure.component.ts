import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

interface Manure {
  name: string;
  shopName: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-manure',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './manure.component.html',
  styleUrl: './manure.component.css'
})
export class ManureComponent implements OnInit {
  backgrounds = [
    '/photo2.avif',
    '/photo-1524247108137-732e0f642303.avif'
  ];
  currentImageIndex = 0;
  filterText = '';

  manureProducts: Manure[] = [
    {
      name: 'Organic Compost',
      shopName: 'Green Earth Supply',
      price: 15.99,
      description: 'Premium quality organic compost for healthy plant growth'
    },
    {
      name: 'Cow Manure',
      shopName: 'Farm Fresh',
      price: 12.50,
      description: 'Natural cow manure, aged and ready to use'
    },
    {
      name: 'Vermicompost',
      shopName: 'Earthworm Farms',
      price: 24.99,
      description: 'High-quality worm castings for superior plant nutrition'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000);
  }

  get filteredManure(): Manure[] {
    return this.manureProducts.filter(manure =>
      manure.shopName.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
