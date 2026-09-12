import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class LoginApi {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";

 
    loginData() {
    
        return this.http.post(this.apiUrl + "/auth/v1/token?grant_type=password", {
            "email": "",
            "password":"",
            
        })
    }
}
