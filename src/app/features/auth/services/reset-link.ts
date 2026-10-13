import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ResetLink {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';
    sendReset(email: string) {
        return this.http.post(this.apiUrl + '/auth/v1/recover', {
            "email": email
        })
    }
}
