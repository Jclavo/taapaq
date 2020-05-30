import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class MessageUtils {

    constructor(
        private alertController: AlertController,
        private toastController: ToastController,
        private loadingController: LoadingController
    ) { }

    async showAlert() {
        const alert = await this.alertController.create({
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async showAlertOption(_message: string, _value: string = null) {

        let resolveFunction: (confirm: boolean) => void;
        const promise = new Promise<boolean>(resolve => {
            resolveFunction = resolve;
        });
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: _value == null ? _message : _message + ' <strong>' + _value + '</strong>',
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => resolveFunction(false)
                },
                {
                    text: 'Okay',
                    handler: () => resolveFunction(true)
                }
            ]
        });
        await alert.present();
        return promise;
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

    createLoader(): Promise<HTMLIonLoadingElement> {
        const loading = this.loadingController.create({
            message: 'Loading'
            //duration: 2000
        });

        return loading;
    }
}