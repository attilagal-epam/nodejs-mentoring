import { User } from "./models";

export class UserStore {
    private users: User[] = [];

    public addUser(user: User) {
        const id = this.generateId();
        const addedUser = {
            id,
            ...user
        };
        
        this.users.push(addedUser);
        return addedUser;
    }

    public getUser(id: string) {
        return this.users.find(user => user.id === id);
    }

    public getUsers() {
        return this.users;
    }

    public deleteUser(id: string) {
        this.users = this.users.filter(user => user.id !== id);
    }

    public addHobbyToUser(userId: string, hobby: string) {
        const user = this.getUser(userId);

        if (user) {
            // add hobbies that are not already in the list
            if (!user.hobbies.includes(hobby)) {
                user.hobbies.push(hobby);
            }
        }
    }

    public updateHobbiesForUser(userId: string, hobbies: string[]) {
        const user = this.getUser(userId);

        if (user) {
            hobbies.forEach(hobby => {
                this.addHobbyToUser(userId, hobby);
            });
        }
    }

    public removeHobbyFromUser(userId: string, hobby: string) {
        const user = this.getUser(userId);

        if (user) {
            user.hobbies = user.hobbies.filter(h => h !== hobby);
        }
    }

    public getHobbiesForUser(userId: string) {
        const user = this.getUser(userId);

        if (user) {
            return user.hobbies;
        }
    }

    private generateId(length = 16) {
        // generate a random string that has a length of length
        return Math.random().toString(36).substring(2, length);
    }
}