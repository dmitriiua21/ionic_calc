import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CalculatorPage } from '../calculator/calculator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('userName') userName;
  @ViewChild('userPass') userPass;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              private storage: Storage) {

  }

  submitUser(args) {

    // вывод предупреждения, если нет пароля или ника
    if (!this.userName.value || !this.userPass.value) {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Username or password is incorrect!',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    // если прошли проверку, то регестрируемся 
    this.registerUser(this.userName.value, this.userPass.value)
        .then(
          data => this.initCalculator()
        );
  }

  // записывавем пользователя в localstorage
  registerUser(userName, userPass) {
    return Promise.all([
        this.storage.set('userName', userName),
        this.storage.set('userPass', userPass)
      ]);
  }

  // показать страницу калькулятора
  initCalculator() {
    this.navCtrl.push(CalculatorPage);
  }

}
