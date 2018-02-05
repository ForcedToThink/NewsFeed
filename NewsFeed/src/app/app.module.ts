import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';

import {
  SharedModule,
  LayoutHeaderComponent,
  LayoutFooterComponent
} from './shared';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

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
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
