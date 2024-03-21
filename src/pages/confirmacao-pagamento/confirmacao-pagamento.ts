import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/domain/cart.service';
import { CartItem } from '../../models/cart-item';
import { PedidoDTO } from '../../models/pedido.dto';
import { ClienteDTO } from '../../models/client.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-confirmacao-pagamento',
  templateUrl: 'confirmacao-pagamento.html',
})
export class ConfirmacaoPagamentoPage {

  pedido: PedidoDTO;
  cartItens: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService) {

      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItens = this.cartService.getCart().itens;

    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, 
      response['enderecos']);
    }, error => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findEndereco(id: string, lista: EnderecoDTO[]): EnderecoDTO {
    let position = lista.findIndex(x => x.id == id);
    return lista[position];
  }

  total(): number {
    return this.cartService.totalCart();
  }

}
