import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];

  bucketUrl: string = API_CONFIG.bucketS3BaseUrl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public categriaService: CategoriaService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.categriaService.finAll()
    .subscribe(response => {
      this.items = response;
      loader.dismiss();
    }, error => {
      loader.dismiss();
    });
  }

  showProdutos(idCategoria: string) {
    this.navCtrl.push('ProdutosPage', {idCategoria: idCategoria});
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }

}
