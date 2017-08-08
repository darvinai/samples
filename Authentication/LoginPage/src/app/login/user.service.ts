import { User } from './user';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginUrl = `https://api.everlive.com/v1/${environment.backendServices.appId}/oauth/token`;
    private usersUrl = `https://api.everlive.com/v1/${environment.backendServices.appId}/users`;

    private linkAccountUrl = `https://api.everlive.com/v1/${environment.backendServices.appId}/Functions/LinkAccount`;

    constructor(private http: Http) {

    }

    login(username: string, password: string): Promise<LoginInfo> {
        const body = {
            'username': username,
            'password': password,
            'grant_type': 'password'
        };

        return this.http.post(this.loginUrl, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(data => data.json().Result as LoginInfo);
    }

    loginWithFacebook(token: string): Promise<LoginInfo> {
        const body = {
            Identity: {
                Provider: 'Facebook',
                Token: token
            }
        };

        return this.http.post(this.usersUrl, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(data => data.json().Result as LoginInfo);
    }

    linkAccount(state: string, authData: LoginInfo): Promise<LinkAccountResult> {
        if (!authData) {
            return;
        }

        state = encodeURIComponent(state);
        const url = `${this.linkAccountUrl}?state=${state}`;
        const body = {
            accessToken: authData.access_token
        };

        return this.http.post(url, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then((result) => result.json() as LinkAccountResult);
    }
}

export interface LoginInfo {
    access_token: string,
    token_type: string,
    principal_id: string
};

export interface LinkAccountResult {
    channel: string;
    verificationToken: string;
}
