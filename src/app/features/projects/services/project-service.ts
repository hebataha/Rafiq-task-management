import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ProjectService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

    getProjects() {
        return this.http.get(this.apiUrl + "/rest/v1/rpc/get_projects", {
            headers: {
                apikey: this.apiKey,
            }
        });
    }
}
