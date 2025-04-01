import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
    private apiUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) {}

  getShops(searchQuery: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/shops?search=${searchQuery}`);
  }

  getFertilizers(searchTerm: string): Observable<any[]> {
    let params = new HttpParams().set('search', searchTerm);
    return this.http.get<any[]>(`${this.apiUrl}/api/fertilizers`, { params });
  }
  

  getPlantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/shopsby/${id}`);
  }
  
}
