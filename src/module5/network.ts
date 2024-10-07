import { App } from './app';

const PORT = process.env.PORT || 8000;

export const run = () => {
    const app = new App(Number(PORT));
}