import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CoreModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '@app/graphql/graphql.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/+account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./views/+account/account.module').then((m) => m.AccountModule),
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
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
