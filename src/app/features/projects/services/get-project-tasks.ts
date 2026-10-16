import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class GetProjectTasks {

    private readonly http = inject(HttpClient);

    private readonly apiUrl =
        'https://ewryvwlqqqvwbgmacgau.supabase.co';

    private readonly apiKey =
        'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

    getProjectAllTasks(project_id: string, status: string) {
        return this.http.get<unknown[]>(this.apiUrl + `/rest/v1/project_tasks?project_id=eq.${project_id}&status=eq.${encodeURIComponent(status)}`
        )
    }
}
