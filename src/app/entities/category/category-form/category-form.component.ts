import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit{
  mode: "NEW" | "UPDATE" = "NEW";
  categoryId?: number;
  category?: Category;
  categories: Category[] = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {

  }
  ngOnInit(): void {

    const entryParam: string = this.route.snapshot.paramMap.get("categoryId") ?? "new";
    if (entryParam !== "new") {
      this.categoryId = +this.route.snapshot.paramMap.get("categoryId")!;
      this.mode = "UPDATE";
      this.getCategoryById(this.categoryId!);
    } else {
      this.mode = "NEW";
      this.initializeCategory();
    }
  }

  public getAllCategories(event?: any): void {
    let categorySearch: string | undefined;
    if (event?.query) {
      categorySearch = event.query;
    }
    this.categoryService.getAllCategories(categorySearch).subscribe({
      next: (categoriesFiltered) => { this.categories = categoriesFiltered; },
      error: (err) => { this.handleError(err); }
    })
  }

  public saveCategory(): void {
    if (this.mode === "NEW") {
      this.insertCategory();
    }
    if (this.mode === "UPDATE") {
      this.updateCategory();
    }
  }

  public categoryUnselected(): void {
    this.category!.id = undefined;
    this.category!.name = "";
  }

  public includeImageInCategory(event: any): void {
    const inputFile = event.target as HTMLInputElement;
    const file: File | null = inputFile.files?.item(0) ?? null;

    this.readFileAsString(file!).then(
      (result) => {
        const imageType: string = this.getImageType(result);
        console.log(imageType);
        const imageBase64: string = this.getImageBase64(result);
        console.log(imageBase64);

        this.category!.image = imageBase64;
      },
      (error) => {
        console.log("No se pudo cargar la imagen")
      }
    )
  }

  private getImageType(imageString: string): string{
    const imageStringParts: string[] = imageString.split(",");
    if (imageStringParts.length == 2){
      return imageStringParts[0];
    }else{
      return "";
    }
  }

  private getImageBase64(imageString: string): string{
    const imageStringParts: string[] = imageString.split(",");
    if (imageStringParts.length == 2){
      return imageStringParts[1];
    }else{
      return "";
    }
  }

  private readFileAsString(file: File){
    return new Promise<string>(function(resolve,reject){
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(){
        resolve(this.result as string)
      }
    })
  }


  private insertCategory(): void {
    this.categoryService.insert(this.category!).subscribe({
      next: (categoryInserted) => {
        console.log("Insertada correctamente");
        console.log(categoryInserted);
      },
      error: (err) => { this.handleError(err); }
    })
  }

  private updateCategory(): void {
    this.categoryService.update(this.category!).subscribe({
      next: (categporyUpdate) => {
        console.log("Modificada correctamente");
        console.log(categporyUpdate);
      },
      error: (err) => { this.handleError(err); }
    })
  }

  private getCategoryById(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (CategoryRequest) => {
        this.category = CategoryRequest;
        new Category(CategoryRequest.id!, CategoryRequest.name!, CategoryRequest.image!);
      },
      error: (err) => { this.handleError(err); }
    })
  }

  private initializeCategory(): void {
    this.category = new Category(undefined, "", undefined, undefined);
  }

  private handleError(err: any): void {

  }
}
