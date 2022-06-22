import bunyan from 'bunyan';
const logger = bunyan.createLogger({
    name: 'todo-App',
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'error',
            stream: process.stdout
        }
    ]
});

export default logger;