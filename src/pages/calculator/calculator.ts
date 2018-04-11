import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html'
})
export class CalculatorPage {
  
  inputField = '';
  userName = '';

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              private storage: Storage) {

    this.storage.get('userName').then((val) => {
      this.userName = val;
    });
    
  }

  // обновляем значение на дисплее
  clickFunc(btn) {
    this.inputField += btn;
  }

  // вычислить результат
  calculate() {
    try {
      this.inputField = eval(this.inputField).toFixed(2);
    } catch (error) {
      this.alertFunc();
      this.inputField = '';
    }
  }

  // очищаем поле ввода
  displayClear() {
    this.inputField = '';
  }

  // сообщение о ошибке
  alertFunc() {
      let alert = this.alertCtrl.create({
        title: 'Alert!',
        subTitle: 'Incorrect operation!',
        buttons: ['OK']
      });
      alert.present()
  }

}
