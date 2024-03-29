import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController,
    public menuController: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successFullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => { });
  }

  login() {
    this.auth.authenticate(this.credenciais)
      .subscribe(response => {
        this.auth.successFullLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => { });
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }


}
