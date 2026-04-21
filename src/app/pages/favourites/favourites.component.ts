import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Card } from "src/app/core/models/card";
import { FavouritesService } from "src/app/core/services/favourites.service";
import { WalletService } from "src/app/core/services/wallet.service";

@Component({
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss']
})
export class Favourites2 {

  //search and filter 
  Search: string = ''
  Sort: string = 'most new'
  Energy: string = 'all'
  Rarity: string = 'all'

  constructor(public favService: FavouritesService, private router: Router, public wallet: WalletService) { }

 // adding filter method

  filteredCards() {
    let filtered = this.favService.favourites

    // filter by the pokemon name
    if (this.Search != '') {
      filtered = filtered.filter(card => card.name.toLocaleLowerCase().includes(this.Search.toLocaleLowerCase()))
    }

    // filter by the type of energy
    if (this.Energy !='all') {
      filtered = filtered.filter(card => card.energy_type == this.Energy)
    }

    // filter by the type of card rarity
    if (this.Rarity != 'all') {
      filtered = filtered.filter(card => card.rarity == this.Rarity)
    }

    // sort csrds by highest and lowest price
    if (this.Sort == 'highest_price') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price))
    }

    if (this.Sort == 'lowest_price') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price))
    }

    return filtered
  }

  // go to card details page
  goToCardDetail(cardClicked: Card) {
    this.wallet.cardDetail = cardClicked;
    this.router.navigate([`/card-detail`]);
  }

  
}