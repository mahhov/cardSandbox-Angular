import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthenticationRepostiory {
    constructor(private http: HttpClient) {
    }

    public createUser(username: string, password: string): Promise<string> {
        let body: AuthenticationBody = {
            'name': username,
            'password': password
        };

        let options = {responseType: 'text' as 'text'};
        return this.http.post(environment.nodeUrl + 'user', body, options).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }

    public getToken(username: string, password: string): Promise<string> {
        let body: AuthenticationBody = {
            'name': username,
            'password': password
        };

        let options = {responseType: 'text' as 'text'};
        return this.http.post(environment.nodeUrl + 'token', body, options).toPromise()
            .catch((error: any): void => {
                console.log(error);
            });
    }
}

interface AuthenticationBody {
    name: string;
    password: string;
}