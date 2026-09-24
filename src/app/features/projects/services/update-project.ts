import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectService {

  private http = inject(HttpClient);

  private apiUrl =
    'https://ewryvwlqqqvwbgmacgau.supabase.co';

  private apiKey =
    'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

  updateProject(
    id: string,
    name: string,
    description: string
  ) {

    return this.http.patch(
      `${this.apiUrl}/rest/v1/projects?id=eq.${id}`,
      {
        name: name,
        description: description
      },
      {
        headers: {
          apikey: this.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
  }
}