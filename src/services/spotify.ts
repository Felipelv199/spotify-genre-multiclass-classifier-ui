import querystring, { ParsedUrlQueryInput } from 'querystring'

interface AuthorizeQueryParamsI extends ParsedUrlQueryInput {
    client_id: string,
    redirect_uri: string,
    response_type: string,
    scope?: string,
    state?: string
}

export const authorizeUrl = (queryParams: AuthorizeQueryParamsI): string => `https://accounts.spotify.com/authorize?${querystring.stringify(queryParams)}`;

export const tokenSpotify = () => console.log("Token");
