import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
  listaCidades: CidadeDTO[];
  listaEstados: EstadoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertController: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['André', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['andre@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['74228816070',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Maria Betina', [Validators.required]],
        numero: ['12', [Validators.required]],
        complemento: ['apt 1', []],
        bairro: ['Copacabana', []],
        cep: ['88745000', [Validators.required]],
        telefone1: ['991856789', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]
      });
  }

  ionViewDidLoad() {
    this.estadoService.findAllEstados()
      .subscribe(response => {
        this.listaEstados = response;
        this.formGroup.controls.estadoId.setValue(this.listaEstados[0].id);
        this.updateCidades();
      }, error => {
       
      });
  }

  signupUser() {
    this.clienteService.create(this.formGroup.value)
    .subscribe(response => {
      this.createSuccess();
    }, error => {});
  }

  updateCidades() {
    let idEstado = this.formGroup.value.estadoId;
    this.cidadeService.findAllCidades(idEstado)
    .subscribe(response => {
      this.listaCidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {
     
    });
  }

  createSuccess() {
    let alert = this.alertController.create({
      title: 'Sucesso',
      message: 'Cadastro efeutado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  
}
