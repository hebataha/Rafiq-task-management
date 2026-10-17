import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class RestPassword {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

    sendResetPass(password: string, accessToken: string) {
        return this.http.put(
            this.apiUrl + '/auth/v1/user',
            {
                password: password
            },
            {
                headers: {
                    apikey: this.apiKey,
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
    }

}
