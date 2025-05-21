import { afterNextRender, Component, inject } from '@angular/core';
import { ProductStore } from '../stores/product.store';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { FormsModule } from '@angular/forms'
import {  debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import untilDestroyed from '../utils/untilDestroyed';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  searchTerm = '';
  productStore = inject(ProductStore)
  searchSubject = new Subject<string>();
  destroyed = untilDestroyed();

  constructor() {
    afterNextRender(() => {
      this.productStore.loadProducts() ;
      this.searchSubject.pipe(  
        debounceTime(500),
        distinctUntilChanged(),
        this.destroyed()
      ).subscribe((term) => {
        console.log({term})
        this.productStore.searchProducts(term)
      })
    });
  }

  onSearch(term: string) {
    this.searchSubject.next(term)
  }
}
