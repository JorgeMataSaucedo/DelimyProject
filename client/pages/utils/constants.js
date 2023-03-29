const SERVER_IP = 'localhost:3977';

export const ENV = {
    BASE_URL: `http://${SERVER_IP}`,
    API_URL: `http://${SERVER_IP}/api/v1`,
    API_ROUTES: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
    }
};

