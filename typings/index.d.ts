declare module 'oauth-discord' {
    export interface OauthOption {
        version?: string;
        client_secret: string;
        client_id: number | string;
        redirect_uri: string;
    }

    export interface AccessTokenOption {
        grant_type: 'authorization_code'
        code: string;
    }

    export interface RefreshTokenOption {
        grant_type: 'refresh_token'
        refresh_token: string;
    }

    export interface Token {
        access_token: string;
        refresh_token: string;
        exprese_in: number;
    }

    declare class Oauth {
        constructor(option: OauthOption): void;
        
        public token(option: AccessTokenOption): Promise<Token>;
        public token(option: RefreshTokenOption): Promise<Token>;
        
    }
}