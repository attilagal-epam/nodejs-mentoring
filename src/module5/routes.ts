import { Route } from "./models";
import { CreateUserController, DeleteUserController, GetUserHobbiesController, GetUsersController, UpdateUserHobbiesController } from "./users-api";

/*
POST /api/users - creates new user (id = uuid)
GET /api/users - returns a list of users stored
DELETE /api/users/:userId - deletes a specific user by id
GET /api/users/:userId/hobbies - returns list of hobbies added for user
PATCH /api/users/:userId/hobbies - updates user hobbies:
*/
export const routes: Route[] = [
    {
        path: '/api/users',
        canActivate: (req) => !!req.url?.match(/\/api\/users/),
        controllers: {
            post: CreateUserController,
            get: GetUsersController,
        }
    },
    {
        path: '/api/users/:userId',
        canActivate: (req) => {
            return !!req.url?.match(/\/api\/users\/[a-zA-Z0-9]+/);
        },
        controllers: {
            delete: DeleteUserController,
        }
    },
    {
        path: '/api/users/:userId/hobbies',
        canActivate: (req) => {
            return !!req.url?.match(/\/api\/users\/[a-zA-Z0-9]+\/hobbies/);
        },
        controllers: {
            get: GetUserHobbiesController,
            patch: UpdateUserHobbiesController,
        }
    },
];