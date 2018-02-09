import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites.component';

const profileRouting: ModuleWithProviders = RouterModule.forChild([{
  path: 'profile/:username',
  component: ProfileComponent,
  resolve: {
    profile: ProfileResolver
  },
  children: [
    {
      path: '',
      component: ProfileArticlesComponent
    },
    {
      path: 'favorites',
      component: ProfileFavoritesComponent
    }
  ]
}]);

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
  ],
  imports: [
    CommonModule,
    profileRouting,
    SharedModule
  ],
  exports: [],
  providers: [
    ProfileResolver
  ],
})
export class ProfileModule {}
