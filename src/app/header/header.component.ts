import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchText!: string;
  searchResults!: any[];

  private searchTextChanged = new Subject<string>();

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.searchTextChanged.pipe(debounceTime(500)).subscribe((searchText) => {
      this.search(searchText);
    });
  }

  onSearchTextChange(): void {
    this.searchTextChanged.next(this.searchText);
  }

  private search(searchText: string): void {
    if (searchText.trim().length > 0) {
      this.coinService.search(searchText).subscribe((results) => {
        this.searchResults = results.slice(0, 5);
      });
    } else {
      this.searchResults = [];
    }
  }

  canviar() {
    this.coinService.onButtonClicked();
    this.searchText = '';
    this.searchResults = [];
  }
}
