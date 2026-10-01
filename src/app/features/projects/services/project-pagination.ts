import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ProjectPagination {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "https://ewryvwlqqqvwbgmacgau.supabase.co";
    private readonly apiKey = 'sb_publishable_MUL_oO1sCf-c5NKi1as6Sg_42ECtX8U';

    paginationData(limit:number,offset:number) {

        return this.http.get(
            this.apiUrl + `/rest/v1/rpc/get_projects?limit=${limit}&offset=${offset}`,
            {
                headers: {
                    Prefer: 'count=exact',

                }
                , observe: 'response'
            }

        );
    }
}
