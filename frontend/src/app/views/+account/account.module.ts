import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';
import { UploadComponent } from './upload/upload.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    title: 'Accounts',
  },
  {
    path: 'account/:id/update',
    component: UpdateComponent,
    title: 'Update account',
  },
  {
    path: 'account/upload',
    component: UploadComponent,
    title: 'Upload excel',
  },
];

@NgModule({
  declarations: [ListComponent, UpdateComponent, UploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot(),
  ],
})
export class AccountModule {}
