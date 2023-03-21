import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../coin/i-coin';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private baseUrl = 'https://api.coingecko.com/api/v3/';
  private endUrl: string =
    '&order=market_cap_desc&per_page=100&page=1&sparkline=false';

  private coinsList: Coin[] = [];

  private listaObservableCoins$ = new Subject<Coin[]>();
  private urlGetCoinPaginator =
    this.baseUrl + 'coins/markets?vs_currency=usd' + this.endUrl;

  private coinsListSearch: Coin[] = [];
  private listaObservableCoinsSearch$ = new Subject<Coin[]>();
  private urlGetCoinSearch = this.baseUrl + 'search?query=';

  private buttonClickedSource = new Subject<void>();
  public buttonClicked$ = this.buttonClickedSource.asObservable();
  private urlGetCoinsName = this.baseUrl + 'coins/markets?vs_currency=usd&ids=';

  constructor(private http: HttpClient) {}

  // FIRST 100

  loadCoins(): Coin[] {
    this.http.get<any>(this.urlGetCoinPaginator).subscribe(
      (result) => {
        this.setCoins(result);
      },
      (error) => {
        console.log(error);
      }
    );
    return this.coinsList;
  }

  setCoins(coinsList: Coin[]) {
    this.coinsList = coinsList;
    this.listaObservableCoins$.next(coinsList);
  }

  getCoins$(): Observable<any> {
    return this.listaObservableCoins$.asObservable();
  }

  // SEARCH

  loadCoinsSearch(name: string): Coin[] {
    this.http.get<any>(this.urlGetCoinSearch + name).subscribe(
      (result) => {
        this.setCoinsSearch(result.coins);
      },
      (error) => {
        console.log(error);
      }
    );
    return this.coinsListSearch;
  }

  setCoinsSearch(coinsListSearch: Coin[]) {
    this.coinsListSearch = coinsListSearch;
    this.listaObservableCoinsSearch$.next(coinsListSearch);
  }

  getCoinsName$(): Observable<any> {
    return this.listaObservableCoinsSearch$.asObservable();
  }

  search(searchText: string): Observable<any[]> {
    this.loadCoinsSearch(searchText);
    return this.getCoinsName$();
  }

  public onButtonClicked() {
    this.buttonClickedSource.next();
  }

  updateCoinsList() {
    if (this.coinsListSearch != null && this.coinsListSearch.length > 0) {
      this.parseCoinNameToCoin(this.coinsListSearch);
    }
  }

  private parseCoinNameToCoin(coins: Coin[]): Coin[] {
    return this.loadCoinsName(coins.map((coin) => coin.name));
  }

  // GET BY NAME

  loadCoinsName(names: string[]): Coin[] {
    let nombres: string = '';
    for (let i = 0; i < names.length; i++) {
      nombres += names[i].replace(/\s+/g, '-').toLowerCase() + ',';
    }
    this.http.get<any>(this.urlGetCoinsName + nombres + this.endUrl).subscribe(
      (result) => {
        this.setCoins(result);
      },
      (error) => {
        console.log(error);
      }
    );
    return this.coinsList;
  }
}
