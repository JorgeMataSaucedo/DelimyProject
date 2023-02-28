import {ENV} from "../utils";

export class Auth {
    baseApi = ENV.API_URL;

    async login(data) {
        try{
            const url = `${this.baseApi}${ENV.API_ROUTES.LOGIN}`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw new Error(result.message);
            return result;

        } catch (e) {
            throw e;
        }
    }

    async register(data) {
        try{
            const url = `${this.baseApi}${ENV.API_ROUTES.REGISTER}`;
            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch(url, params);
            const result = await response.json();
            if(response.status !== 200) throw new Error(result.message);
            return result;

        } catch (e) {
            throw e;
        }
    }




}

