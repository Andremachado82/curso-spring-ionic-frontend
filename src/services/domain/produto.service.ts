import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {        
    }

    findByCategoria(idCategoria: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${idCategoria}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketS3BaseUrl}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }
}