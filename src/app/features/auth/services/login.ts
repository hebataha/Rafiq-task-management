import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class LoginApi {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";

 
    loginData(email: string, password: string) {
    
        return this.http.post(this.apiUrl + "/auth/v1/token?grant_type=password", {
            email,
            password,
            
        },
    {
      headers: {
        apikey: 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U',
        'Content-Type': 'application/json'
      }
    })
    }
}
