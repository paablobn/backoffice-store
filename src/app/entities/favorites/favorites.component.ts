import { Component, OnInit } from '@angular/core';
import { Item } from '../item/model/item.model';
import { FavoriteService } from './service/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: Item[] = [];

  constructor(private favoritesService: FavoriteService, private router: Router) {}

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  public deleteFavorite(item: Item): void {
    this.favoritesService.deleteFavorite(item);
    this.favorites = this.favoritesService.getFavorites();
  }
}
