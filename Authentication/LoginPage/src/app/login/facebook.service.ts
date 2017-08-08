import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

// This is the FB SDK
declare var FB: any;

const facebookParams = {
    appId: environment.facebook.appId,
    version: environment.facebook.apiVersion,
    cookie: true,
    xfbml: true
};

@Injectable()
export class FacebookService {
    constructor() {
        FB.init(facebookParams);
    }

    getLoginStatus(): Promise<LoginStatusResult> {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus(response => {
                if (!response) {
                    reject();
                } else {
                    resolve(response);
                }
            });
        });
    }

    login(): Promise<LoginResult> {
        return new Promise((resolve, reject) => {
            FB.login((response) => {
                if (!response) {
                    reject();
                } else {
                    resolve(response);
                }
            });
        });
    }
}

export interface AuthResponse {
    accessToken: string;
    expiresIn: number;
    signenRequest: string;
    userID: string;
    grantedScopes?: string;
}

export interface LoginStatusResult {
    status: string;
    authResponse: AuthResponse;
}

export interface LoginResult {
    status: string;
    authResponse: AuthResponse;
}
