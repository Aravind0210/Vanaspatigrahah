import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-pesticides',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponent],
  templateUrl: './pesticides.component.html',
  styleUrls: ['./pesticides.component.css']
})
export class PesticidesComponent implements OnInit {
  backgrounds = [
    '/photo2.avif',
    '/photo-1524247108137-732e0f642303.avif'
  ];
  currentImageIndex: number = 0;
  filterText: string = '';

  pesticides = [
    {
      name: 'Organic Pesticide',
      shopName: 'Green Solutions',
      price: 29.99,
      description: 'Natural and eco-friendly pesticide solution for your plants.'
    },
    {
      name: 'Bio Control',
      shopName: 'Plant Care Plus',
      price: 34.99,
      description: 'Biological pest control solution safe for organic farming.'
    },
    // Add more pesticide products as needed
  ];

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000);
  }

  get filteredPesticides() {
    return this.pesticides.filter(pesticide =>
      pesticide.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      pesticide.shopName.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
