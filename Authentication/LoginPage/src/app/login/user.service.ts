import { User } from './user';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from 'environments/environment';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/json', Authorization: `Basic ${btoa(environment.kinvey.appKey + ':' + environment.kinvey.appSecret)}` });
    private loginUrl = `https://baas.kinvey.com/user/${environment.kinvey.appKey}/login`;
    private usersUrl = `https://baas.kinvey.com/user/${environment.kinvey.appKey}`;

    private linkAccountUrl = `https://baas.kinvey.com/rpc/${environment.kinvey.appKey}/custom/LinkAccount`;

    constructor(private http: Http) {

    }

    login(username: string, password: string): Promise<LoginInfo> {
        const body = {
            username,
            password
        };

        return this.http.post(this.loginUrl, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(data => data.json()._kmd as LoginInfo);
    }

    loginWithFacebook(token: string): Promise<LoginInfo> {
        const body = {
            _socialIdentity: {
                facebook: {
                    access_token: token,
                    expires: '5105388'
                }
            }
        };

        return this.http.post(this.usersUrl, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then(data => data.json()._kmd as LoginInfo);
    }

    linkAccount(state: string, authData: LoginInfo): Promise<LinkAccountResult> {
        if (!authData) {
            return;
        }

        state = encodeURIComponent(state);

        const url = `${this.linkAccountUrl}?state=${state}`;
        const body = {
            accessToken: authData.authtoken
        };

        return this.http.post(url, JSON.stringify(body), { headers: this.headers })
            .toPromise()
            .then((result) => result.json() as LinkAccountResult);
    }
}

export interface LoginInfo {
    lmt: string,
    ect: string,
    authtoken: string
};

export interface LinkAccountResult {
    channel: string;
    verificationToken: string;
}
