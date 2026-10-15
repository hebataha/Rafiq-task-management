import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class EditEpicDetails {
    private http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';
    token = localStorage.getItem("access_token");
editEpicDtailsData(
  epicId: string,
  data: {
    title?: string;
    description?: string | null;
  }
) {
  return this.http.patch(
    `${this.apiUrl}/rest/v1/epics?id=eq.${epicId}`,
    data
  );
}
}
