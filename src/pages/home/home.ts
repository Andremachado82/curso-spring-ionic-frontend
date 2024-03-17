import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuController: MenuController) {

  }

  ionViewWillEnter() {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menuController.swipeEnable(true);
  }

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }


}
