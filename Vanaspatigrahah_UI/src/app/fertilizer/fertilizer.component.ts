import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-fertilizer',
  imports: [CommonModule, FormsModule, HeaderComponent],
  standalone: true,
  templateUrl: './fertilizer.component.html',
  styleUrls: ['./fertilizer.component.css'] 
})
export class FertilizerComponent {
  fertilizers = [
    {
      name: 'Nitrogen Fertilizer',
      description: 'Boosts plant growth and improves yield.',
      price: 20,
      image: 'assets/images/nitrogen-fertilizer.jpg',
      shopName: 'Green Garden Solutions'
    },
    {
      name: 'Phosphorus Fertilizer',
      description: 'Enhances root development and flowering.',
      price: 25,
      image: 'assets/images/phosphorus-fertilizer.jpg',
      shopName: 'Nature\'s Best Nursery'
    },
    {
      name: 'Potassium Fertilizer',
      description: 'Improves plant resistance and quality.',
      price: 30,
      image: 'assets/images/potassium-fertilizer.jpg',
      shopName: 'Organic Farm Supplies'
    }
  ];

  backgrounds = [
    '/photo2.avif',
    '/photo-1524247108137-732e0f642303.avif'
  ];
  currentImageIndex = 0;

  filterText: string = '';

  get filteredFertilizers() {
    return this.fertilizers.filter(fertilizer => 
      fertilizer.shopName.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  constructor() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000); // Change background every 5 seconds
  }
}
