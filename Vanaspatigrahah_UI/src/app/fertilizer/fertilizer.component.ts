import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service'; // Import the DataService
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
export class FertilizerComponent implements OnInit {
  fertilizers: any[] = [];
  allFertilizers: any[] = []; // Store all fertilizers
  filterText: string = '';

  backgrounds = [
    '/photo2.avif',
    '/photo-1524247108137-732e0f642303.avif'
  ];
  currentImageIndex = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Fetch all fertilizers when the component loads
    this.fetchFertilizers();

  }

  fetchFertilizers() {
    // Fetch all fertilizers from the backend and store them
    this.dataService.getFertilizers('').subscribe(
      (data) => {
        this.allFertilizers = data;  // Store all fertilizers
        this.fertilizers = data;     // Display all fertilizers initially
      },
      (error) => {
        console.error('Error fetching fertilizers:', error);
      }
    );
  }

  // Trigger the search when user types
  onSearch() {
    // Filter the fertilizers based on the search term
    this.fertilizers = this.allFertilizers.filter(fertilizer =>
      fertilizer.Name.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
}
