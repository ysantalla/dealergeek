import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadExcelFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${env.apiRestUrl}/upload/excel`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
