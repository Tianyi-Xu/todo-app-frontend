import axios from "axios";
import { API_URL } from "../../Constants";
export const USERNAME_SESSION_ARRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    excuteBasicAuthentication(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
        {
            headers : {
                authorization : this.createBasicAuthToken(username, password)
            } 
        }
        )
    }
  
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password);
    }

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem(USERNAME_SESSION_ARRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    excuteJwtAuthentication(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createJwtAuthToken(token) {
        return 'Bearer ' + token;
    }

    registerSuccessfulLoginForJwt(username, token){
        sessionStorage.setItem(USERNAME_SESSION_ARRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtAuthToken(token));
    }

    logout() {
        sessionStorage.removeItem(USERNAME_SESSION_ARRIBUTE_NAME);
    }

    isLoggedIn() {
        let user = sessionStorage.getItem(USERNAME_SESSION_ARRIBUTE_NAME);
        if (user == null) { return false;}
        return true;
    }

    getLoggedInUser() {
        let user = sessionStorage.getItem(USERNAME_SESSION_ARRIBUTE_NAME);
        if (user == null) { return "";}
        return user;
    }

    setupAxiosInterceptors(authHeader) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isLoggedIn()) {
                    config.headers.authorization = authHeader;
                }
                return config;
            }
        )
    }





}

export default new AuthenticationService();