import { Injectable } from "@angular/core";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {        
    }

    findAllCidades(idEstado: string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(
            `${API_CONFIG.baseUrl}/estados/${idEstado}/cidades`);
    }
}