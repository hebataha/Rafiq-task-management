import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginResponse } from '../models/login';

@Service()
export class LoginApi {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

    loginData(email: string, password: string) {

        return this.http.post<LoginResponse>(this.apiUrl + "/auth/v1/token?grant_type=password", {
            email,
            password,

        },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }



    refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token');

        return this.http.post(this.apiUrl + '/auth/v1/token?grant_type=refresh_token',
            {
                refresh_token: refreshToken
            }, {

            headers: {
                'Content-Type': 'application/json'
            }

        })

    }


}



