import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AuthUser } from './auth-user';

@Service()
export class AuthUserService {
    private http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';
 token = localStorage.getItem("access_token")

    getUserData() {
      return this.http.get<AuthUser>(
           this.apiUrl + '/auth/v1/user ', {
            headers: {
                "apikey": this.apiKey,
                "Authorization": 'Bearer ' + this.token,
                "Content-Type": "application/json"

            }
        }
        )
    }
}
