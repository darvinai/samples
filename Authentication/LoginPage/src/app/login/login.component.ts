import { FacebookService } from './facebook.service';
import { LinkAccountResult, LoginInfo, UserService } from './user.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { environment } from 'environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    private loginForm: FormGroup;
    private error: string;
    private formErrors = {
        'username': '',
        'password': ''
    };

    private validationMessages = {
        'username': {
            'required': 'Email is required.',
        },
        'password': {
            'required': 'Password is required.'
        }
    };

    private params: ParamMap;
    private routeParamsSubscription: Subscription;

    constructor(
        private userService: UserService,
        private facebookService: FacebookService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.routeParamsSubscription = this.route.queryParamMap.subscribe(params => {
            this.params = params;
        });

        this.error = null;
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
    }

    ngOnDestroy() {
        this.routeParamsSubscription.unsubscribe();
    }

    onLogin() {
        this.error = null;
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        return this.userService.login(username, password)
            .then(loginInfo => this.linkAccount(loginInfo));
    }

    onFacebookLogin() {
        this.error = null;
        this.facebookService.login()
            .then(result => {
                if (result.status === 'connected') {
                    return this.userService.loginWithFacebook(result.authResponse.accessToken)
                        .then(loginInfo => this.linkAccount(loginInfo));
                } else {
                    this.error = 'The user is not connected.';
                }
            })
    }

    private linkAccount(loginInfo: LoginInfo) {
        return this.userService.linkAccount(this.params.get('state'), loginInfo)
            .then(data => {
                if (data.channel === 'darvin') {
                    parent.postMessage({ type: 'authentication', token: data.verificationToken }, environment.webchatOrigin);
                } else {
                    const url = this.resolveUrl(data);
                    window.location.replace(url);
                }
            })
            .catch(err => this.error = err);
    }

    private resolveUrl(data: LinkAccountResult) {
        if (data.channel === 'facebook') {
            return `https://m.me/${environment.channels.facebook}?ref=${data.verificationToken}`;
        } else if (data.channel === 'viber') {
            return `viber://pa?chatURI=${environment.channels.viber}&context=${data.verificationToken}`;
        }
    }

    private onValueChanged(data?: any): void {
        Object.keys(this.formErrors).map(field => {
            this.formErrors[field] = '';

            const control = this.loginForm.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                Object.keys(control.errors).map(key => {
                    this.formErrors[field] += messages[key] + ' ';
                });
            };
        });
    }
}
