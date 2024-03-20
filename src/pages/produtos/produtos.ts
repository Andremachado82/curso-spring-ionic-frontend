import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let idCategoria = this.navParams.get('idCategoria');
    this.produtoService.findByCategoria(idCategoria)
    .subscribe(response => {
      this.listaProdutos = response['content'];
      this.getImageIfExistsFromBucket();
    }, error => {});
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

  showDetail() {
    this.navCtrl.push('ProdutoDetailPage');
  }

}
