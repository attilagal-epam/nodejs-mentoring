import { RouteController } from './models';
import { UserStore } from './userStore';

/*
POST /api/users - creates new user (id = uuid)
GET /api/users - returns a list of users stored
DELETE /api/users/:userId - deletes a specific user by id
GET /api/users/:userId/hobbies - returns list of hobbies added for user
PATCH /api/users/:userId/hobbies - updates user hobbies:
*/

// Create User
export const CreateUserController: RouteController = (req, res, store) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const user = JSON.parse(body);
        const storedUser = store?.addUser({
            ...user,
            hobbies: []
        });
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            data: {
                user: storedUser,
                links: getLinksForUser(storedUser?.id as string)
            },
            error: null
        }));
    });
}

// Get Users
export const GetUsersController: RouteController = (req, res, store) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const users = store?.getUsers();
    res.end(JSON.stringify({
        data: users?.map(user => ({
            user,
            links: getLinksForUser(user.id as string)
        })),
        error: null
    }));
    
}

// Delete User
export const DeleteUserController: RouteController = (req, res, store) => {
    const userId = req.url?.split('/')[3];
    const user = store?.getUser(userId as string);
    if (!user) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            data: null,
            error: `User with id ${userId} doesn't exist`,
        }));
        return;
    }

    store?.deleteUser(userId as string);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        data: {
            sucess: true
        },
        error: null
    }));
    res.end();
}

// Get User Hobbies
export const GetUserHobbiesController: RouteController = (req, res, store) => {
    const userId = req.url?.split('/')[3];
    const user = store?.getUser(userId as string);
    if (!user) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            data: null,
            error: `User with id ${userId} doesn't exist`
        }));
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        data: {
            hobbies: user.hobbies,
            links: getLinksForHobbies(userId as string)
        },
        error: null
    }));
}

// Update User Hobbies
export const UpdateUserHobbiesController: RouteController = (req, res, store) => {
    const userId = req.url?.split('/')[3];
    const user = store?.getUser(userId as string);
    if (!user) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            data: null,
            error: `User with id ${userId} doesn't exist`
        }));
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const hobbies = JSON.parse(body);
        store?.updateHobbiesForUser(userId as string, hobbies);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            data: {
                hobbies,
                links: getLinksForHobbies(userId as string)
            },
            error: null
        }));
    });
}

const getLinksForUser = (userId: string) => {
    return {
        self: `/api/users/${userId}`,
        hobbies: `/api/users/${userId}/hobbies`
    }
}

const getLinksForHobbies = (userId: string) => {
    return {
        self: `/api/users/${userId}/hobbies`,
        user: `/api/users/${userId}`
    }
}