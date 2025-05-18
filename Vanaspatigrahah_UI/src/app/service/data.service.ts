import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
    private apiUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) {}


  getgoldsummary(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/gold-summary`);
  }
  deletegoldsummary(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/api/deletegoldsummary/${id}`);

  }

  
}

