import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

interface Manure {
  Name: string;
  Composition: string;
  Price_INR_kg: string;  // keeping it as string to match database type
  Usage_Instructions: string;
  Example_Plants: string;
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

  manureProducts: Manure[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.backgrounds.length;
    }, 5000);

    this.fetchManureData();
  }

  fetchManureData() {
    this.http.get<Manure[]>('http://localhost:3000/api/manure')
      .subscribe(
        (data) => {
          this.manureProducts = data;
        },
        (error) => {
          console.error('Error fetching manure data:', error);
        }
      );
  }

  get filteredManure(): Manure[] {
    return this.manureProducts.filter(manure =>
      manure.Name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      manure.Name.toLowerCase().includes(this.filterText.toLowerCase()) // You can filter by name or shop
    );
  }


}
