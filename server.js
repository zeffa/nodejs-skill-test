import App from './app'
import AppRouter from './routes'

const PORT = 8000;
const appRouter = new AppRouter();
const app = new App(appRouter, PORT);

app.listen();