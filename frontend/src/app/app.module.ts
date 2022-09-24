import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/+user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
