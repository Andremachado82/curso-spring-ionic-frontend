import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {
    }

    findAllEstados(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}