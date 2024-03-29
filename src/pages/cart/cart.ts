import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.getImageIfExistsFromBucket();
  }

  getImageIfExistsFromBucket() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
          item.produto.imageUrl = `${API_CONFIG.bucketS3BaseUrl}/prod${item.produto.id}-small.jpg`;
        }, error => { })
    }
  }

  removeProduto(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).itens;
  }

  incrementQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.incrementQuantity(produto).itens;
  }

  decrementQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decrementQuantity(produto).itens;
  }

  totalCart(): number {
    return this.cartService.totalCart();
  }

  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.navCtrl.push('EscolherEnderecoPage');
  }

}
