import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../service/data.service';
import { CommonModule } from '@angular/common';  // ✅ Import this
@Component({
  selector: 'app-plant-details',
  imports: [
    CommonModule,  // ✅ Add this to enable ngClass
  ],

  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css'],
})
export class PlantDetailsComponent implements OnInit {
  plant: any;
  tabs = ['Growth & Maintenance Methods', 'Common Diseases', 'Disease Control', 'Uses of Plants', 'Irrigation Requirements and Equipment'];
  selectedTab = this.tabs[0];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    const plantId = this.route.snapshot.paramMap.get('id');
    if (plantId) {
      this.dataService.getPlantById(plantId).subscribe((data) => {
        this.plant = data;
      });
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
