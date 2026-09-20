import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private readonly http = inject(HttpClient);

    private readonly apiUrl =
        'https://ewryvwlqqqvwbgmacgau.supabase.co';

    private readonly apiKey =
        'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';
    access_token = localStorage.getItem("access_token")


    getProjects() {
        return this.http.get(this.apiUrl + '/rest/v1/projects');
    }
}