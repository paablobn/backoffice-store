import { Injectable } from '@angular/core';
import { Item } from '../../item/model/item.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favorites: Item[] = [];

  public isFavorite(item: Item): boolean {
    return this.favorites.some((i) => i.id === item.id);
  }

  public newFavorite(item: Item): void {
    if (!this.isFavorite(item)) {
      this.favorites.push(item);
    }
  }

  public deleteFavorite(item: Item): void {
    this.favorites = this.favorites.filter((i) => i.id !== item.id);
  }

  public getFavorites(): Item[] {
    return this.favorites;
  }
}
