import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRatings } from './ProductRatings';

@Injectable({
  providedIn: 'root'
})
export class ProductRatingsService {

  baseUrl: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:4200/api/produtos";
    this.headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Accept', 'application/json')
                                    .set('Access-Control-Allow-Origin', '*')
                                    .set('Access-Control-Allow-Headers', '*')
                                    .set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  }

  getAll(product_id: number) {
    return this.http.get<ProductRatings[]>(this.baseUrl + '/' + product_id + '/ratings', {headers: this.headers});
  }

  getOne(product_id: number, id: number) {
    let url: string = this.baseUrl + '/' + product_id + '/ratings/' + id;
    return this.http.get<ProductRatings>(url, {headers: this.headers});
  }

  insert(product_id: number, ratings: ProductRatings) {
    return this.http.post<any>(this.baseUrl + '/' + product_id + '/ratings', ratings, {headers: this.headers});
  }

  update(product_id: number, ratings: ProductRatings) {
    return this.http.put<any>(this.baseUrl + '/' + product_id + '/ratings/' + ratings.id, ratings, {headers: this.headers});
  }

  delete(product_id: number, id: number) {
    let url: string = this.baseUrl + '/' + product_id + '/ratings/' + id;;
    return this.http.delete<ProductRatings>(url, {headers: this.headers});
  }
}
