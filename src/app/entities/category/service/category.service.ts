import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getAllCategories(partialName?: string): Observable<Category[]>{
    let urlEndpoint: string = "http://localhost:8080/store/categories";
    if(partialName){
      urlEndpoint = urlEndpoint + "?partialName=" + partialName;
    }
    return this.http.get<Category[]>(urlEndpoint);
  }

  public deleteCategory(categoryIdToDelete: number): Observable<any> {
    let urlEndpoint: string = "http://localhost:8080/store/categories/" + categoryIdToDelete;
    return this.http.delete<any>(urlEndpoint);
  }

  public getCategoryById(categoryId: number): Observable<Category> {
    let urlEndpoint: string = "http://localhost:8080/store/categories/" + categoryId;
    return this.http.get<Category>(urlEndpoint);
  }

  public insert(category: Category): Observable<Category> {
    let urlEndpoint: string = "http://localhost:8080/store/categories/";
    return this.http.post<Category>(urlEndpoint, category);
  }

  public update(category: Category): Observable<Category> {
    let urlEndpoint: string = "http://localhost:8080/store/categories/";
    return this.http.patch<Category>(urlEndpoint, category);
  }
}
