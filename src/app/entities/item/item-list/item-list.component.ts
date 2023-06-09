import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';
import { FavoriteService } from '../../favorites/service/favorite.service';
import { User } from '../../user/user/model/user.model';
import { UserService } from '../../user/user/service/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  categoryId?: number;
  title: string = "";
  items: Item[] = [];

  page: number = 0;
  size: number = 2;
  sort: string = "name,asc";

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  nameFilter?: string;
  priceFilter?: number;

  itemIdToDelete?: number;

  item?: Item;

  user?: User;

  constructor(private route: ActivatedRoute, private itemService: ItemService, private favoriteService: FavoriteService, private userService: UserService) { }


  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("categoryId")) {
      this.categoryId = +this.route.snapshot.paramMap.get("categoryId")!;
      this.title = "Articulo de la categoria " + this.categoryId;
    } else {
      this.title = "LISTA ARTICULOS";
    }
    this.getAllItems();
  }

  public userIsRegister(){
    this.user = this.userService.user!;
    return this.user !== undefined;
  }

  public isFavorite(item: Item): boolean {
    return this.favoriteService.isFavorite(item);
  }

  public newFavorite(item: Item): void {
    this.favoriteService.newFavorite(item);
  }

  public deleteFavorite(item: Item): void {
    this.favoriteService.deleteFavorite(item);
  }

  public nextPage(): void {
    this.page = this.page + 1;
    this.getAllItems();
  }

  public previousPage(): void {
    this.page = this.page - 1;
    this.getAllItems();
  }

  public searchByFilters(): void {
    this.getAllItems();
  }

  public prepareItemToDelete(itemId: number):void{
    this.itemIdToDelete = itemId;
  }

  public deleteItem():void{
    if(this.itemIdToDelete){
      this.itemService.deleteItem(this.itemIdToDelete!).subscribe({
        next: (data) => {
          this.getAllItems();
        },
        error: (err) => {this.handleError(err)}
      })
    }
  }

  private buildFilters(): string | undefined {
    const filters: string[] = [];

    if( this.categoryId){
      filters.push("category.id:EQUAL:" + this.categoryId);
    }

    if (this.nameFilter) {
      filters.push("name:MATCH:" + this.nameFilter);
    }
    if (this.priceFilter) {
      filters.push("price:LESS_THAN_EQUAL:" + this.priceFilter);
    }
    if (filters.length > 0) {
      let globalFilters: string = "";
      for (let filter of filters) {
        globalFilters = globalFilters + filter + ",";
      }
      globalFilters = globalFilters.substring(0, globalFilters.length - 1);
      return globalFilters;
    } else {
      return undefined;
    }
  }

  private getAllItems(): void {
    const filters: string | undefined = this.buildFilters();
    this.itemService.getAllItems(this.page, this.size, this.sort, filters).subscribe({
      next: (data: any) => {
        this.items = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
      },
      error: (err) => { this.handleError(err); }
    })
  }

  private handleError(error: any): void {

  }
}
