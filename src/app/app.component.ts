import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//Utils
import { AuthUtils } from "src/app/utils/auth-utils";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Project',
      url: '/project-list',
      icon: 'rocket'
    },
    {
      title: 'Companies',
      url: '/company-list',
      icon: 'business'
    },
    // {
    //   title: 'Project - Company',
    //   url: '/project-company',
    //   icon: 'link'
    // },
    {
      title: 'Modules',
      url: '/module-list',
      icon: 'globe'
    },
    {
      title: 'Roles',
      url: '/role-list',
      icon: 'bookmarks'
    },
    // {
    //   title: 'Permissions',
    //   url: '/permission-list',
    //   icon: 'key'
    // },
    {
      title: 'Users',
      url: '/user-list',
      icon: 'people'
    },
    {
      title: 'User Master',
      url: '/user-detail-list',
      icon: 'person'
    },

    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  public labels = ['Close session'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authUtils: AuthUtils
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
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    console.log(this.authUtils.user);
  }

  closeSession(){
    this.authUtils.closeSession();
  }
}
