import { Component } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-addshop',
  templateUrl: './addshop.component.html',
  styleUrls: ['./addshop.component.css'],
})
export class AddShopComponent {
  constructor(private dataService: DataService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    // Check if any of the required fields is empty
    const requiredFields = [
      'SHOP_NAME',
      'SHOP_ADDRESS',
      'Phone_No',
      'location',
      'Common_Name',
      'Tamil_Name',
      'Botanical_Name',
      'Family',
      'Variety_of_Species',
      'Average_Price',
      'Growth_Maintenance_Methods',
      'Common_Diseases',
      'Disease_Control_Methods',
      'MFPs',
      'MFPDosage',
      'Commercial_Product_Prices',
      'Irrigation_Requirements_and_Equipment',
      'Irrigation_Frequency',
      'Profit_Margin_After_Maturity',
      'Uses_of_Plants',
      'Fertilizer_Recommendation',
      'Pesticide_Recommendation'
    ];

    let isFormValid = true;
    let missingFields = '';

    requiredFields.forEach((field) => {
      if (!formData.get(field)?.toString()) {
        isFormValid = false;
        missingFields += `${field}, `;
      }
    });

    if (!isFormValid) {
      alert(`Please enter all required fields: ${missingFields.slice(0, -2)}`);
      return;
    }

    // If all fields are filled, proceed with data submission
    const data = {
      shopName: formData.get('SHOP_NAME')?.toString(),
      shopAddress: formData.get('SHOP_ADDRESS')?.toString(),
      phoneNo: formData.get('Phone_No')?.toString(),
      location: formData.get('location')?.toString(),
      commonName: formData.get('Common_Name')?.toString(),
      tamilName: formData.get('Tamil_Name')?.toString(),
      botanicalName: formData.get('Botanical_Name')?.toString(),
      family: formData.get('Family')?.toString(),
      variety: formData.get('Variety_of_Species')?.toString(),
      avgPrice: formData.get('Average_Price')?.toString(),
      growth: formData.get('Growth_Maintenance_Methods')?.toString(),
      commonDiseases: formData.get('Common_Diseases')?.toString(),
      diseaseControl: formData.get('Disease_Control_Methods')?.toString(),
      mfps: formData.get('MFPs')?.toString(),
      mfpDosage: formData.get('MFPDosage')?.toString(),
      commercialPrices: formData.get('Commercial_Product_Prices')?.toString(),
      irrigationReq: formData.get('Irrigation_Requirements_and_Equipment')?.toString(),
      irrigationFreq: formData.get('Irrigation_Frequency')?.toString(),
      profitMargin: formData.get('Profit_Margin_After_Maturity')?.toString(),
      usesOfPlants: formData.get('Uses_of_Plants')?.toString(),
      fertilizerRec: formData.get('Fertilizer_Recommendation')?.toString(),
      pesticideRec: formData.get('Pesticide_Recommendation')?.toString(),
    };

    this.dataService.insertShopData(data).subscribe(
      (response) => {
        console.log('Data inserted successfully:', response);
        // Reset the form after submission
        form.reset();
        // Optionally, you can show a success message
        alert('Shop data added successfully!');
      },
      (error) => {
        console.error('Error:', error);
        // Show error message to the user
        alert('There was an error inserting the data. Please try again.');
      }
    );
  }
}
