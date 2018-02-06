import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';

import {
  SharedModule,
  LayoutHeaderComponent,
  LayoutFooterComponent,
  ApiService,
  UserService,
  AuthGuard
} from './shared';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    SharedModule,
    rootRouting,
    HomeModule,
    AuthModule,
    SettingsModule
  ],
  providers: [
    ApiService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
