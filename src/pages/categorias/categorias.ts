import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public categriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categriaService.finAll()
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
