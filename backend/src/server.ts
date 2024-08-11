import { port } from './config';
import app from './app';

app
    .listen(port, () => {
        console.log(`server running on port : ${port}`);
    })
    .on('error', (e: Error) => console.error(e));