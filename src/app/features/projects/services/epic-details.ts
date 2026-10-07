import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class EpicDetails {
    private http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';
    token = localStorage.getItem("access_token");

  epicDeatils(projectId: string, epicId: string) {
  return this.http.get(
    this.apiUrl +
    `/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`
  );
}
}
