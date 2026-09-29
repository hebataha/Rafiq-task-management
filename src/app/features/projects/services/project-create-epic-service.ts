import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ProjectCreateEpicService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

    createEpicCation(title: string, description: string, assignee_id: string | null, project_id: string , deadline: string | null) {
        return this.http.post(this.apiUrl + '/rest/v1/epics', {
            "title": title,
            "description": description,
            "assignee_id": assignee_id,
            "project_id": project_id,
            "deadline": deadline
        })
    }
}
