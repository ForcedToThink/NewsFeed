import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';

import {
  SharedModule,
  LayoutHeaderComponent,
  LayoutFooterComponent,
  HeaderNavAuthenticatedComponent,
  HeaderNavPublicComponent,
  ApiService,
  UserService,
  AuthGuard,
  SessionService,
  ProfileService,
  ArticleService
} from './shared';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { ProfileModule } from './profile/profile.module';
import { EditorModule } from './editor/editor.module';
import { ArticleModule } from './article/article.module';
import { APP_INITIALIZER } from '@angular/core';
import { MarkdownModule } from 'angular2-markdown';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}], { useHash: true });

function populateService(userService: UserService) {
  return () => userService.populate();
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    LayoutFooterComponent,
    HeaderNavAuthenticatedComponent,
    HeaderNavPublicComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    SharedModule,
    rootRouting,
    HomeModule,
    AuthModule,
    SettingsModule,
    ProfileModule,
    EditorModule,
    ArticleModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    ApiService,
    UserService,
    AuthGuard,
    SessionService,
    {
      provide: APP_INITIALIZER,
      useFactory: populateService,
      deps: [UserService],
      multi: true
    },
    ProfileService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
