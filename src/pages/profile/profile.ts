import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/client.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;
  profileImage;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {
      this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
          this.getImageIfExistsFromBucket();
        }, error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          } else {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
  }

  getImageIfExistsFromBucket() {
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketS3BaseUrl}/cp${this.cliente.id}.jpg`;
        this.convertBlobToBase64(response).then(dataUrl => {
          let string: string = dataUrl as string
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(string);
        });
      }, error => {
        this.profileImage = 'assets/imgs/avatar-blank.png';
      })
  }

  getCameraPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
      console.log(err)
    });
  }

  getGalleryPicture() {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
      console.log(err)
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.getImageIfExistsFromBucket();
      },
        error => { });
  }

  cancel() {
    this.picture = null;
  }

  convertBlobToBase64(blob) {
    return new Promise((fullfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fullfill(reader.result);
      reader.readAsDataURL(blob);
    })
  }
}
