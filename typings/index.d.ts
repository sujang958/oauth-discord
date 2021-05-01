declare module 'oauth-discord' {
    export interface OauthOption {
        version?: string;
        client_secret: string;
        client_id: string;
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
        expires_in: number;
        refresh_token: string;
        scope: array;
        token_type: string;
    }

    export interface User {
        id: string;
        username: string;
        discriminator: string;
        avatar: string | null | undefined;
        mfa_enabled?: true;
        locale?: string;
        verified?: boolean;
        email?: string | null | undefined;
        flags?: number;
        premium_type?: number;
        public_flags?: number;
    }

    export interface Guild {
        id: string;
        name: string;
        icon: string | null | undefined;
        owner?: boolean;
        permissions?: number;
        features: string[];
        permissions_new?: string;
    }

    declare class Oauth {
        constructor(option: OauthOption): void;
        
        public getToken(option: AccessTokenOption | RefreshTokenOption): Promise<Token>;
        public revokeToken(token: string): Promise<object>;
        public user(access_token: string): Promise<User>;
        public userGuilds(access_token: string): Promise<Guild[]>;

        private _urlEncode(obj: object): string;
    }

    export = Oauth;
}