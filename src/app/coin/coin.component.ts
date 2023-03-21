import { Component } from '@angular/core';
import { CoinService } from '../services/coin.service';
import { Coin } from './i-coin';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
})
export class CoinComponent {
  coins: Coin[] = [];

  constructor(private coinService: CoinService) {}

  ngOnInit() {
    this.getCoins();
    this.coinService.buttonClicked$.subscribe(() => {
      this.coinService.updateCoinsList();
    });
  }

  getCoins() {
    this.coinService.loadCoins();
    this.coinService.getCoins$().subscribe(
      (result) => {
        this.coins = result;
        // console.log(this.coins);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
