import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-escolher-endereco',
  templateUrl: 'escolher-endereco.html',
})
export class EscolherEnderecoPage {

  items: EnderecoDTO[];

  pedido: PedidoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.itens.map(i => {
              return {
                quantidade: i.quantidade, produto: { id: i.produto.id }
              }
            })
          }
        }, error => {

        });
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    this.navCtrl.push('PagamentoPage', { pedido: this.pedido });
  }

}
