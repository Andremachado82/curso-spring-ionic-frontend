import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/domain/cart.service';
import { CartItem } from '../../models/cart-item';
import { PedidoDTO } from '../../models/pedido.dto';
import { ClienteDTO } from '../../models/client.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

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
  codigoPedido: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

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

  backCart() {
    this.navCtrl.setRoot('CartPage');
  }

  backCategorias() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codigoPedido = this.extrairId(response.headers.get('location'));
      }, error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });

  }

  private extrairId(location: string) {
    let posicao = location.lastIndexOf('/');
    return location.substring(posicao + 1, location.length);
  }

}
