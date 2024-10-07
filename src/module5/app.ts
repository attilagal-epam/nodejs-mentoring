import { Route, HttpMethod, User } from "./models";
import http from 'http';

import { routes } from './routes';
import { UserStore } from "./userStore";

const PORT = Number(process.env.PORT) || 8000;


export class App {
    private routes: Route[] = [];
    private server: http.Server;
    private userStore: UserStore;
    
    constructor(port: number = PORT) {
        this.userStore = new UserStore();
        this.addRoutes(routes);
        this.server = this.createServer(port);
    }

    public getServer() {
        return this.server;
    }
    
    public addRoute(route: Route) {
        this.routes.push(route);
    }

    public addRoutes(routes: Route[]) {
        this.routes.push(...routes);
    }
    
    private createServer(port: number = PORT) {
        const server = http.createServer((req, res) => {
            const route: Route = this.getRoute(req);
            const controller = this.getController(route, req);
            if (controller) {
                controller(req, res, this.userStore);
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end({
                    error: 'Endpoint Not Found'
                });
            }
        });

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });

        return server;
    }

    private getRoute(req: http.IncomingMessage): Route {
        return this.routes.find(route => route.canActivate(req)) as Route;
    }

    private getController(route: Route, req: http.IncomingMessage) {
        const method: HttpMethod = req?.method?.toLowerCase() as HttpMethod;
        if (route) {
            return route?.controllers[(method as HttpMethod)];
        }
    }
}
