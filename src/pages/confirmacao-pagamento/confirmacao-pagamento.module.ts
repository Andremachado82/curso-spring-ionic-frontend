import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmacaoPagamentoPage } from './confirmacao-pagamento';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  declarations: [
    ConfirmacaoPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmacaoPagamentoPage),
  ],
  providers: [
    PedidoService
  ]
})
export class ConfirmacaoPagamentoPageModule {}
