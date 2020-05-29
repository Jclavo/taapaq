import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class MessageUtils {

    constructor(private alertController: AlertController,
        private toastController: ToastController) { }

    async showAlert() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async showToastOK(customMessage: string) {

        const toast = await this.toastController.create({
            message: customMessage,
            duration: 1000,
        });
        toast.present();
    }

    async showToastError(customMessage: string) {

        const toast = await this.toastController.create({
            message: customMessage,
            duration: 3000,
            color: "danger",
            keyboardClose: true,
        });
        toast.present();
    }
}