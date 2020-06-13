import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Models
import { Response } from "src/app/models/response.model";

//Services
import { UserService } from "src/app/services/user.service";

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";
import { MessageUtils } from "src/app/utils/message-utils";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  // public appPages = [
  //   {
  //     title: 'Project',
  //     url: '/project-list',
  //     icon: 'rocket'
  //   }
  // ];
  public labels = ['Close session'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authUtils: AuthUtils,
    private userService: UserService,
    private messageUtils: MessageUtils,
  ) {
    //Validate Session
    !this.authUtils.isAuthenticated() ? this.authUtils.closeSession() : null;
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }

  closeSession(){
    this.logout();
  }

  async logout(){
    const loading = await this.messageUtils.createLoader();
    loading.present();// start loading

    this.userService.logout().subscribe((response: Response) => {     
      if (response.status) {
        this.messageUtils.showToastOK(response.message);
        this.authUtils.closeSession();
      }
      else{
        this.messageUtils.showToastError(response.message);
      }
      loading.dismiss();// close loading
    },
      error => { 
        this.messageUtils.showToastError(error.message);
        loading.dismiss();// close loading
      }
    );
  }
}
