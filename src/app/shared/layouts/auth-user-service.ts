import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { AuthUser } from './auth-user';
import { AuthState } from '../../features/auth/services/auth-state';

@Service()
export class AuthUserService {
    private _AuthState = inject(AuthState)
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

    logout() {
        return this.http.post<AuthUser>(
            this.apiUrl + '/auth/v1/logout ',

            {
                body: {
                    "password": this._AuthState.password
                }
            },

            {
                headers: {
                    "apikey": this.apiKey,
                    "Authorization": 'Bearer ' + this.token,
                    "Content-Type": "application/json"

                },

            }
        )
    }
}
