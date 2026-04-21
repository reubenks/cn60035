import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/core/services/utils.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  ethPrice: string = "";
  eurPrice: string = "";
  constructor(public wallet: WalletService, private utilsService: UtilsService, private location: Location) { }

  // add back functionality
  Back() {
    this.location.back()
  }

  ngOnInit(): void {
    this.parsePriceToEther(this.wallet.cardDetail.price);
    this.utilsService.getEurFromEth().subscribe((data: any) => {
      this.eurPrice = (data.EUR * parseFloat(this.ethPrice)).toString();
    });
  }

  buyCard() {
    this.wallet.buyNFT(this.wallet.cardDetail);
  }
  parsePriceToEther(weiPrice: string): void {
    this.ethPrice = this.wallet.web3Instance.utils.fromWei(weiPrice, 'ether');
  }

}
