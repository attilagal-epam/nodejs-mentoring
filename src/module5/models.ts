import http from 'http';
import { UserStore } from './userStore';

export interface User  {
    id?: string;
    name: string;
    email: string;
    hobbies: string[];
}

export interface HypermediaLink {
    self: string;
    hobbies?: string;
    user?: string;
}

export interface oneUserResponse {
    user?: User,
    hobbies?: string[],
    links: HypermediaLink
}

export interface apiResponse {
    data: null | oneUserResponse | oneUserResponse[];
    error: null | string;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export type RouteController = (req: http.IncomingMessage, res: http.ServerResponse, store?: UserStore) => any;

export interface Route {
    path: string;
    canActivate: (req: http.IncomingMessage) => boolean;
    controllers: {
        [key in HttpMethod]?: RouteController;
    }
}