interface ExplicitContentI {
    filter_enabled: boolean;
    filter_locked: boolean;
}

interface ExternalUrls {
    spotify: string;
}

interface FollowersI {
    href?: string;
    total: number;
}

interface ImageObjectI {
    url: string;
    height: number;
    width: number;
}

export interface UserProfileI {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContentI;
    external_urls: ExternalUrls;
    followers: FollowersI;
    href: string;
    id: string;
    images: ImageObjectI;
    product: string;
    type: string;
    uri: string;
}