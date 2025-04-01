import { Component } from '@angular/core';

@Component({
  selector: 'app-addshop',
  standalone: true,
  templateUrl: './addshop.component.html',
  styleUrls: ['./addshop.component.css']
})
export class AddShopComponent {
  // ...component logic...

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      shopName: formData.get('SHOP_NAME'),
      shopAddress: formData.get('SHOP_ADDRESS'),
      phoneNo: formData.get('Phone_No'),
      location: formData.get('location'),
      commonName: formData.get('Common_Name'),
      tamilName: formData.get('Tamil_Name'),
      botanicalName: formData.get('Botanical_Name'),
      family: formData.get('Family'),
      variety: formData.get('Variety_of_Species'),
      avgPrice: formData.get('Average_Price'),
      growth: formData.get('Growth_Maintenance_Methods'),
      commonDiseases: formData.get('Common_Diseases'),
      diseaseControl: formData.get('Disease_Control_Methods'),
      mfps: formData.get('MFPs'),
      mfpDosage: formData.get('MFPDosage'),
      commercialPrices: formData.get('Commercial_Product_Prices'),
      irrigationReq: formData.get('Irrigation_Requirements_and_Equipment'),
      irrigationFreq: formData.get('Irrigation_Frequency'),
      profitMargin: formData.get('Profit_Margin_After_Maturity'),
      usesOfPlants: formData.get('Uses_of_Plants'),
      fertilizerRec: formData.get('Fertilizer_Recommendation'),
      pesticideRec: formData.get('Pesticide_Recommendation')
    };
    console.log(data);
    // ...existing code for further handling...
  }

  // ...existing methods...
}
