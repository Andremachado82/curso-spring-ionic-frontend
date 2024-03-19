import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

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

  signupUser() {
    console.log("envio o form")
  }

  updateCidades() {
    console.log("atualizou a cidade")
  }
}
