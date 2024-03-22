import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/client.dto";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "./image-util.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient,
        public storageService: StorageService,
        public imageUtilService: ImageUtilService) {
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

    findById(id: string) {
        return this.http.get(
            `${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketS3BaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });
    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}