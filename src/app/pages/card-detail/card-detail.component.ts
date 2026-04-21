import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Location } from '@angular/common';
import { FavouritesService } from 'src/app/core/services/favourites.service';

@Component({
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  ethPrice: string = "";
  eurPrice: string = "";
  // saves minted date
  dateMinted: string =""

  constructor(public wallet: WalletService, private utilsService: UtilsService, private location: Location, private favService: FavouritesService) { }

  // add back functionality
  Back() {
    this.location.back()
  }

  favouritesToggle() {
    this.favService.FavouritesToggle(this.wallet.cardDetail)
  }

  favourited() {
    return this.favService.favourited(this.wallet.cardDetail)
  }

  ngOnInit(): void {
    this.parsePriceToEther(this.wallet.cardDetail.price);
    this.utilsService.getEurFromEth().subscribe((data: any) => {
      this.eurPrice = (data.EUR * parseFloat(this.ethPrice)).toString();
    });
    // grab when it was minted and convert the time
    this.wallet.nftContract.methods.dateMinted(this.wallet.cardDetail.tokenId).call().then((timestamp: any) => {
            this.dateMinted = new Date(timestamp * 1000).toLocaleDateString()
    })

  }

  buyCard() {
    this.wallet.buyNFT(this.wallet.cardDetail);
  }
  parsePriceToEther(weiPrice: string): void {
    this.ethPrice = this.wallet.web3Instance.utils.fromWei(weiPrice, 'ether');
  }

}
