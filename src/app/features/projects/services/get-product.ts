import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetProjectService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://ewryvwlqqqvwbgmacgau.supabase.co';

  private readonly apiKey =
    'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

  getProjectById(id: string) {
    return this.http.get(
      `${this.apiUrl}/rest/v1/projects?id=eq.${id}`,
      {
        headers: {
          apikey: this.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}