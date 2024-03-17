import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/client.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        this.getImageIfExistsFromBucket();
      }, error => {});
    }
  }

  getImageIfExistsFromBucket() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketS3BaseUrl}/cp${this.cliente.id}.jpg`;
      console.log("getImageIfExistsFromBucket " + this.cliente.imageUrl);
    }, error => {})
  }

}
