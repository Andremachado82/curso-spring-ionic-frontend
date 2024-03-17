import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';
import { STORAGE_KEYS } from '../config/storage-keys.config';

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

}
