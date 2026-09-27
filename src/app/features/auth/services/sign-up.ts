import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class SignUpService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';


    signUp(email: string,
        password: string,
        data: {
            name: string;
            job_title: string;
        }) {
        return this.http.post(this.apiUrl + "/auth/v1/signup", {

            "email": email,
            "password": password,
            "data": data

        })
    }
}
