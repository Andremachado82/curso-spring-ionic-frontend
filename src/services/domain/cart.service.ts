import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

    constructor(public storageService: StorageService, public http: HttpClient) {        
    }

    createOrClearCart(): Cart {
        let cart: Cart = {itens: []};
        this.storageService.setLocalCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storageService.getLocalCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);
        if (position == -1) {
            cart.itens.push({quantidade: 1, produto: produto});
        }
        this.storageService.setLocalCart(cart);
        return cart;
    }

    
}