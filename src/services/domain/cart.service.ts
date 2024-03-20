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
        if (position == -1) { // se não encontrar
            cart.itens.push({quantidade: 1, produto: produto});
        }
        this.storageService.setLocalCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO) {
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);
        if (position != -1) {
            cart.itens.splice(position, 1);
        }
        this.storageService.setLocalCart(cart);
        return cart;

    }

    incrementQuantity(produto: ProdutoDTO) {
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);
        if (position != -1) { // se encontrar
            cart.itens[position].quantidade++;
        }
        this.storageService.setLocalCart(cart);
        return cart;
    }

    decrementQuantity(produto: ProdutoDTO) {
        let cart = this.getCart();
        let position = cart.itens.findIndex(p => p.produto.id == produto.id);
        if (position != -1) { // se encontrar
            cart.itens[position].quantidade--;
            if (cart.itens[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }
        this.storageService.setLocalCart(cart);
        return cart;
    }

    totalCart() {
        let cart = this.getCart();
        let sum = 0;
        for (let i=0; i < cart.itens.length; i++) {
            sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
        }
        return sum;
    }

    
}