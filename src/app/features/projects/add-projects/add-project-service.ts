import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AddProjectsModules } from './modules/add-projects';

@Service()
export class AddProjectService {
    private http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';
    token = localStorage.getItem("access_token")

    addProject(title: string, description: string) {
        return this.http.post<AddProjectsModules>(
            `${this.apiUrl}/rest/v1/projects`,
            {
                name,
                description
            },
            {
                headers: {
                    apikey: this.apiKey,
                    Authorization: `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
    }

}

