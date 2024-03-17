import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storageService: StorageService) {        
    }

    findByEmail(email: string) : Observable<ClienteDTO> {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers': authHeader});
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketS3BaseUrl}/cp${id}.jpg`
        console.log("getImageFromBucket " + url);
        return this.http.get(url, {responseType: 'blob'});
    }
}