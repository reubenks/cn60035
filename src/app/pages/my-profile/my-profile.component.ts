import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Card } from 'src/app/core/models/card';
import { UtilsService } from 'src/app/core/services/utils.service';
import { WalletService } from 'src/app/core/services/wallet.service';

@Component({
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  // tracks new price and card
  price2: string = ""
  card2:  Card | null = null

  totalValueEur: string = "";
  constructor(private router: Router, private utilsService: UtilsService, private spinner: NgxSpinnerService, public wallet: WalletService) { }

  updatePrice(card: Card) {
    const price = this.wallet.web3Instance.utils.toWei(this.price2.toString(), 'ether')
    this.wallet.nftContract.methods.updatePrice(card.tokenId, price).send({from: this.wallet.walletAddress}).then((response: any) => {
      this.card2=null
      this.price2=""
      this.refreshMyNfts()

    })
  }

  ngOnInit(): void {
    if (this.wallet.myNfts.length == 0) {
      this.getMyNfts();
    } else {
      // Subscribe to the isConnected Observable
      this.wallet.isConnected$.subscribe(isConnected => {
        if (isConnected === true && this.wallet.myNfts.length == 0) {
          this.getMyNfts();
        }
      });
      this.parseTotalValueToEur();
    }
  }
  getMyNfts() {
    this.spinner.show();
    this.wallet.getMyNFTs();
    this.parseTotalValueToEur();

  }
  refreshMyNfts() {
    this.wallet.myNfts = [];
    this.wallet.myNftsValue = 0;
    this.wallet.getMyNFTs();
  }

  parseTotalValueToEur() {
    this.utilsService.getEurFromEth().subscribe((data: any) => {
      this.totalValueEur = (data.EUR * this.wallet.myNftsValue).toString();
    });
  }
  goToCardDetail(cardClicked: Card) {
    this.wallet.cardDetail = cardClicked;
    this.router.navigate([`/card-detail`]);
  }

  // removes the nft from the market
  delistCard(card: Card) {
    this.wallet.nftContract.methods.delistToken(card.tokenId).send({from: this.wallet.walletAddress}).then((response: any) => {this.refreshMyNfts()})
  }

}
