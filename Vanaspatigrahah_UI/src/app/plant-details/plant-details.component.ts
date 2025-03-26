import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plant-details',
  imports:[CommonModule],
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent {
  plant = {
    name: 'Recuerdos Plant',
    price: 9.99,
    tamilName: 'மரபுசார் செடி',
    family: 'Cactaceae',
    shopName: 'GreenLeaf Nursery',
    shopLocation: 'Chennai, Tamil Nadu',
    images: [
      'assets/plants/plant1.jpg',
      'assets/plants/plant2.jpg',
      'assets/plants/plant3.jpg'
    ],
    growthMethods: 'Water regularly, ensure well-drained soil, provide moderate sunlight.',
    commonDiseases: 'Root rot, powdery mildew, leaf spots.',
    diseaseControl: 'Use neem oil, maintain proper air circulation, avoid overwatering.',
    uses: 'Air purification, medicinal uses, home decor.',
    irrigation: 'Drip irrigation preferred, water twice a week in summer.'
  };

  selectedImage = this.plant.images[0];
  tabs = [
    'Growth & Maintenance Methods',
    'Common Diseases',
    'Disease Control',
    'Uses of Plants',
    'Irrigation Requirements and Equipment'
  ];
  selectedTab = this.tabs[0];

  changeImage(image: string) {
    this.selectedImage = image;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
