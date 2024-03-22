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

  listaProdutos: ProdutoDTO[] = [];
  page : number = 0;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();    
  }

  loadData() {
    let idCategoria = this.navParams.get('idCategoria');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(idCategoria, this.page, 10)
    .subscribe(response => {
      let start = this.listaProdutos.length;
      this.listaProdutos = this.listaProdutos.concat(response['content']);
      let end = this.listaProdutos.length -1;
      loader.dismiss();
      console.log(this.page);
        console.log(this.listaProdutos);
      this.getImageIfExistsFromBucket(start, end);
    }, error => {
      loader.dismiss();
    });
  }

  getImageIfExistsFromBucket(start: number, end: number) {
    for (let i = start; i <=end; i++) {
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

  refreshPage(refresher) {
    this.page = 0;
    this.listaProdutos = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  infiniteScrool(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
