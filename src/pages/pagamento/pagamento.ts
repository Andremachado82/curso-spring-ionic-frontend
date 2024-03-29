import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.pedido = this.navParams.get('pedido'); // pega o pedido que veio da pagina de endereco

    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      '@type': ['pagamentoComCartao', Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    this.navCtrl.setRoot('ConfirmacaoPagamentoPage', { pedido: this.pedido });
  }

}
