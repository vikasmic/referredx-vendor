import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {
    }

    getFormatedUrl(baseUrl: any) {
        return environment.apiBaseUrl + baseUrl;

    }

    performSave(baseUrl: any, object: Object) {
        return this.http.post(this.getFormatedUrl(baseUrl), object);
    }

    getInfo(baseUrl: any) {
        return this.http.get(this.getFormatedUrl(baseUrl));
    }

    isLoggedIn(): boolean {
        let authToken = localStorage.getItem('access_token');
        return authToken !== null ? true : false;
    }

    logout() {
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
    }

    getById(baseUrl: any, id: any) {
        return this.http.get(`${this.getFormatedUrl(baseUrl)}/${id}`);
    }

    getByQueryParam(baseUrl: any, page: number, limit: number, languages?: string[], jobTypes?: string[], locationTypes?: string[]) {
        const params = {
            page: page.toString(),
            limit: limit.toString(),
            ...(languages && { skills: languages.join(',') }),
            ...(jobTypes && { jobType: jobTypes.join(',') }),
            ...(locationTypes && { locationType: locationTypes.join(',') }),
        };

        return this.http.get<any>(this.getFormatedUrl(baseUrl), { params });
    }

    getUserQueryParam(baseUrl: any, username: string) {
        const params = {
            username: username,
        };

        return this.http.get<any>(this.getFormatedUrl(baseUrl), { params });
    }

    getQueryParam(baseUrl: any, term: string) {
        const params = {
            term: term,
        };
        return this.http.get<any>(this.getFormatedUrl(baseUrl), { params });
    }

}
