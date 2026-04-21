import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/core/models/card';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit {

  //search and filter 
  Search: string = ''
  Sort: string = 'most new'
  Energy: string = 'all'
  Rarity: string = 'all'

  constructor(private router: Router, public wallet: WalletService, private spinner: NgxSpinnerService,) { }

  // adding filter method

  filteredCards() {
    let filtered = this.wallet.allNfts

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

  ngOnInit(): void {
    if (this.wallet.allNfts.length == 0) {
      this.spinner.show();
      this.wallet.getAllNFTs();
    }
  }

  refreshAllNfts() {
    this.spinner.show();
    this.wallet.allNfts = [];
    this.wallet.getAllNFTs();
  }

  goToCardDetail(cardClicked: Card) {
    this.wallet.cardDetail = cardClicked;
    this.router.navigate([`/card-detail`]);
  }

}
