import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './entities/category/category-list/category-list.component';
import { ItemListComponent } from './entities/item/item-list/item-list.component';
import { ItemFormComponent } from './entities/item/item-form/item-form.component';
import { ItemRectiveFormComponent } from './entities/item/item-rective-form/item-rective-form.component';
import { CategoryFormComponent } from './entities/category/category-form/category-form.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'categories', component: CategoryListComponent},
  {path: 'items', component: ItemListComponent},
  {path: 'categories/:categoryId/items', component: ItemListComponent},
  {path: 'items/:itemId', component: ItemFormComponent},
  {path: 'categories/:categoryId', component: CategoryFormComponent},
  {path: 'items/reactive/:itemId', component: ItemRectiveFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
