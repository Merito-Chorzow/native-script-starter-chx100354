import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

export interface Product {
  id: string;
  name: string;
  code: string;
  description: string;
  imageUrl: string;
  status: "available" | "pending" | "archived";
  createdAt: Date;
}

@Injectable({ providedIn: "root" })
export class ProductService {
  private apiUrl = "https://jsonplaceholder.typicode.com/posts";
  private offlineMode$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadOfflineSettings();
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleOfflineMode(enabled: boolean) {
    this.offlineMode$.next(enabled);
  }

  getOfflineMode(): Observable<boolean> {
    return this.offlineMode$.asObservable();
  }

  private loadOfflineSettings() {
    // Init
  }
}
