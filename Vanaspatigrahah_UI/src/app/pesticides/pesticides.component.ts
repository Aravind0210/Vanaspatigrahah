import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Pesticide {
  Name: string;
  Composition: string;
  Price_INR_kg_or_L: string;  // keeping it as string to match database type
  Usage_Instructions: string;
  Example_Plants: string;
}

@Component({
  selector: 'app-pesticides',
  standalone: true,
  imports: [FormsModule, HeaderComponent, CommonModule],
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

  pesticideProducts: Pesticide[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000);

    // Fetch data when component initializes
    this.fetchPesticideData();
  }


  fetchPesticideData() {
    this.http.get<Pesticide[]>('http://localhost:3000/api/pesticides')
      .subscribe(
        (data) => {
          this.pesticideProducts = data;
        },
        (error) => {
          console.error('Error fetching manure data:', error);
        }
      );
  }


  get filteredPesticides(): Pesticide[] {
    return this.pesticideProducts.filter(pesticide =>
      pesticide.Name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      pesticide.Name.toLowerCase().includes(this.filterText.toLowerCase()) // You can filter by name or shop
    );
  }
}
