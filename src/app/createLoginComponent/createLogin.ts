import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../layer/authenticationService";

@Component({
    selector: 'create-login',
    templateUrl: './createLogin.html',
    styleUrls: ['../style/login.scss']
})

export class CreateLogin {
    private username: string;
    private password: string;

    constructor(private router: Router, private authenticationService: AuthenticationService) {
    }

    navigateLogin(): void {
        this.router.navigate(['/login']);
    }

    createUser(): void {
        this.authenticationService.createUser(this.username, this.password);
        this.router.navigate(['/library']);
    }
}