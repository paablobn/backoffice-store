import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './entities/category/category-list/category-list.component';
import { ItemListComponent } from './entities/item/item-list/item-list.component';
import { ItemFormComponent } from './entities/item/item-form/item-form.component';
import { ItemRectiveFormComponent } from './entities/item/item-rective-form/item-rective-form.component';
import { CategoryFormComponent } from './entities/category/category-form/category-form.component';
import { UserComponent } from './entities/user/user/user.component';
import { RegistrateComponent } from './entities/user/register/registrate.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'categories', component: CategoryListComponent},
  {path: 'items', component: ItemListComponent},
  {path: 'categories/:categoryId/items', component: ItemListComponent},
  {path: 'items/:itemId', component: ItemFormComponent},
  {path: 'categories/:categoryId', component: CategoryFormComponent},
  {path: 'items/reactive/:itemId', component: ItemRectiveFormComponent},
  {path: 'users', component: UserComponent},
  {path: 'users/register', component: RegistrateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
