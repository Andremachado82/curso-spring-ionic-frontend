import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';
import { STORAGE_KEYS } from '../config/storage-keys.config';
import { Cart } from '../models/cart';

@Injectable()
export class StorageService {

    constructor() { }

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUserStorage);
        if (user == null) return null;

        return JSON.parse(user);
    }

    setLocalUser(obj: LocalUser){
        if (obj == null) localStorage.removeItem(STORAGE_KEYS.localUserStorage);

        localStorage.setItem(STORAGE_KEYS.localUserStorage, JSON.stringify(obj));
    }

    getLocalCart() : Cart{
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        if (cart == null) return null;

        return JSON.parse(cart);
    }

    setLocalCart(obj: Cart){
        if (obj == null) localStorage.removeItem(STORAGE_KEYS.cart);

        localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }

}
