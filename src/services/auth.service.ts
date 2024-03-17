import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local-user";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService {

    jwtHelpr: JwtHelper  = new JwtHelper();

    constructor(public http: HttpClient, 
        public storage: StorageService) {

    }

    authenticate(credenciais: CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`,
            credenciais,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    successFullLogin(autrhorizationValue: string) {
        let token = autrhorizationValue.substring(7);
        let user: LocalUser = {
            token: token,
            email: this.jwtHelpr.decodeToken(token).sub
        };
        this.storage.setLocalUser(user);
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}