import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  listaProdutos: ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let idCategoria = this.navParams.get('idCategoria');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(idCategoria)
    .subscribe(response => {
      this.listaProdutos = response['content'];
      loader.dismiss();
      this.getImageIfExistsFromBucket();
    }, error => {
      loader.dismiss();
    });
  }

  getImageIfExistsFromBucket() {
    for (let i = 0; i < this.listaProdutos.length; i++) {
      let item = this.listaProdutos[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketS3BaseUrl}/prod${item.id}-small.jpg`;
      }, error => {})      
    }
  }

  showDetail(idProduto: string) {
    this.navCtrl.push('ProdutoDetailPage', {idProduto: idProduto});
  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: "Carregando..."
    });
    loader.present();
    return loader;
  }
}
