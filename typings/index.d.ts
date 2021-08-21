declare module 'oauth-discord' {
    export type ChannelTypes = 0| 1 | 2 | 3 | 4 | 5 | 6 | 10 | 11 | 12 | 13
    export type PresenceStatus =  'idle' | 'dnd' | 'online' | 'offline'
    export type ActivityType = 0 | 1 | 2 | 3 | 4 | 5
    export type PremiumType = 0 | 1 | 2

    export interface EmptyResponse {}

    export interface OauthOption {
        version?: string
        client_secret: string
        client_id: string
        redirect_uri: string
    }

    export interface AccessTokenOption {
        grant_type: 'authorization_code'
        code: string
    }

    export interface RefreshTokenOption {
        grant_type: 'refresh_token'
        refresh_token: string
    }

    export interface Token {
        access_token: string
        expires_in: number
        refresh_token: string
        scope: string[]
        token_type: string
    }

    export interface User {
        id: string
        username: string
        discriminator: string
        avatar?: string
        bot?: boolean
        system?: boolean
        mfa_enabled?: boolean	
        banner?: string
        accent_color?: number
        locale?: string
        verified?: boolean
        email?: string
        flags?: number	
        premium_type?: PremiumType
        public_flags?: number
    }

    export interface PartialGuild {
        id: string
        name: string
        icon: string | null | undefined
        owner?: boolean
        permissions?: number
        features: string[]
        permissions_new?: string
    }

    export interface Role {
        id: string
        name: string
        color: number
        hoist: boolean
        position: number
        permissions: string
        managed: boolean
        mentionable: boolean
        tags?: RoleTags
    }

    export interface RoleTags {
        bot_id?: string
        integration_id?: string
        premium_subscriber?: null
    }

    export interface Emoji {
        id: string
        name: string
        roles?: string[]
        user?: User
        require_colons?: boolean
        managed?: boolean
        animated?: boolean
        available?: boolean
    }

    export interface PartialVoiceState {
        guild_id?:	string
        channel_id?: string
        user_id?: string
        member?: GuildMember
        session_id: string
        deaf: boolean
        mute: boolean
        self_deaf: boolean
        self_mute: boolean
        self_stream?: boolean
        self_video: boolean
        suppress: boolean
        request_to_speak_timestamp: string
    }

    export interface GuildMember {
        user?: User
        nick?: string
        roles: string[]
        joined_at: string
        premium_since?: string
        deaf: boolean
        mute: boolean
        pending?: boolean
        permissions?: string
    }

    export interface Overwrite {
        id: string
        type: number
        allow: string
        deny: string
    }

    export interface Channel {
        id: string
        type: ChannelTypes
        guild_id?: string
        position?: number
        permission_overwrites?: Overwrite[]
        name?: string
        topic?: string
        nsfw?: boolean
        last_message_id?: string
        bitrate?: number
        user_limit?: number
        rate_limit_per_user?: number
        recipients?: User[]
        icon?: string
        owner_id?: string
        application_id?: string
        parent_id?: string
        last_pin_timestamp?: string
        rtc_region?: string
        video_quality_mode?: number
        message_count?: number
        member_count?: number
        thread_metadata?: ThreadMetadata
        member?: ThreadMember
    }

    export interface ThreadMetadata {
        archived: boolean
        archiver_id?: string
        auto_archive_duration: number
        archive_timestamp: string
        locked?: boolean
    }

    export interface ThreadMember {
        id: string
        user_id: string
        join_timestamp: string
        flags: number
    }

    export interface ClientStatus {
        desktop?: string
        mobile?: string
        web?: string
    }

    export interface PartialPresenceUpdate {
        user: User
        guild_id: string
        status: PresenceStatus
        activities: Activity[]
        client_status: ClientStatus
    }

    export interface ActivityTimestamp {
        start?: number
        end?: number
    }

    export interface ActivityEmoji {
        name: string
        id?: string
        animated?: boolean
    }

    export interface ActivityParty {
        id?: string
        size?: [number, number]
    }

    export interface ActivityAssets {
        large_image?: string
        large_text?: string
        small_image?: string
        small_text?: string
    }

    export interface ActivitySecret {
        join?: string
        spectate?: string
        match?: string
    }

    export interface ActivityButton {
        label: string
        url: string
    }

    export interface Activity {
        name: string
        type: number
        url?: string
        created_at: number
        timestamps?: ActivityTimestamp
        application_id?: string
        details?: string
        state?: string
        emoji?: ActivityEmoji
        party?: ActivityParty
        assets?: ActivityAssets
        secrets?: ActivitySecret
        instance?: boolean
        flags?: number
        buttons?: ActivityButton[]
    }

    export interface WelcomeScreen {
        description?: string
        welcome_channels: WelcomeScreenChannel[]
    }

    export interface WelcomeScreenChannel {
        channel_id: string
        description: string
        emoji_id?: string
        emoji_name?: string
    }

    export interface Guild {
        id: string
        name: string
        icon?: string
        icon_hash?: string
        splash?: string
        discovery_splash?: string
        owner?:	boolean
        owner_id: string
        permissions?: string
        region:	string
        afk_channel_id?: string
        afk_timeout: number
        widget_enabled?: boolean
        widget_channel_id?: string
        verification_level: number
        default_message_notifications: number
        explicit_content_filter: number
        roles: Role[]
        emojis: Emoji[]
        features: string[]
        mfa_level: number
        application_id?: string
        system_channel_id?: string
        system_channel_flags: number
        rules_channel_id: string
        joined_at?: string
        large?: boolean
        unavailable?: boolean
        member_count?: number
        voice_states?: PartialVoiceState[]
        members?: GuildMember[]
        channels?: Channel[]
        threads?: Channel[]
        presences?: PartialPresenceUpdate[]
        max_presences?: number
        max_members?: number
        vanity_url_code?: string
        description?: string
        banner?: string
        premium_tier: number
        premium_subscription_count?: number
        preferred_locale: string
        public_updates_channel_id: string
        max_video_channel_users?: string
        approximate_member_count?: string
        approximate_presence_count?: number
        welcome_screen?: WelcomeScreen
        nsfw: boolean
    }

    class Oauth {
        constructor(option: OauthOption)

        public getToken(option: AccessTokenOption | RefreshTokenOption): Promise<Token>
        public revokeToken(token: string): Promise<any>
        public user(access_token: string): Promise<User>
        public userGuilds(access_token: string): Promise<PartialGuild[]>

        private _urlEncode(e: any): string
    }
    export = Oauth

    export interface BotOption {
        version?: string
        token: string
    }

    export class Bot {
        constructor(option: BotOption)

        private readonly _token: string
        private readonly _version: string

        public guild(guild_id: string): Promise<Guild>
        public guildChannels(guild_id: string): Promise<Channel[]>
        public searchGuildMember(guild_id: string, query: string, limit?: number): Promise<GuildMember[]>
        public kickGuildMember(guild_id: string, user_id: string): Promise<EmptyResponse>
        public banGuildMember(guild_id: string, user_id: string, reason?: string, delete_message_daya?: number): Promise<EmptyResponse>
    }
}