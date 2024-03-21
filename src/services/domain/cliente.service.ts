import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storageService: StorageService) {        
    }

    create(clienteDTO: ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
            clienteDTO,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    findByEmail(email: string) {
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketS3BaseUrl}/cp${id}.jpg`
        console.log("getImageFromBucket " + url);
        return this.http.get(url, {responseType: 'blob'});
    }
}